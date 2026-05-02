#!/usr/bin/env bash
# upload-photos.sh — Add photos to jamesgarraway.com/photos/
#
# Usage:
#   ./upload-photos.sh                    # import from ~/Desktop/james-photos/
#   ./upload-photos.sh /path/to/folder   # import from a specific folder
#   ./upload-photos.sh --redeploy        # redeploy existing photos (no new imports)
#
# What it does:
#   1. Copies + resizes photos from source into photos/images/
#   2. Rebuilds manifest.json from all photos in photos/images/
#   3. Deploys the full site (including photos) to jamesgarraway.com
#
# Supported formats: jpg, jpeg, png, webp, heic
# Resize target: 1200px max dimension (preserves aspect ratio), sips is macOS built-in

set -euo pipefail

ACCOUNT_ID="bc063c8eb5b4dc8176ff0d6fa12053b7"
PROJECT="jamesgarraway"
REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
IMAGES_DIR="$REPO_DIR/photos/images"
DEFAULT_SOURCE="$HOME/Desktop/james-photos"

# Colors
GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; NC='\033[0m'
ok()   { echo -e "${GREEN}✓${NC} $*"; }
warn() { echo -e "${YELLOW}!${NC} $*"; }
err()  { echo -e "${RED}✗${NC} $*"; exit 1; }

echo ""
echo -e "${GREEN}jamesgarraway.com — Photo Upload${NC}"
echo "─────────────────────────────────"

# ── Parse args ────────────────────────────────────────────────────────────────
REDEPLOY_ONLY=false
SOURCE_DIR="$DEFAULT_SOURCE"

for arg in "$@"; do
  case "$arg" in
    --redeploy) REDEPLOY_ONLY=true ;;
    *)          SOURCE_DIR="$arg" ;;
  esac
done

mkdir -p "$IMAGES_DIR"

# ── Import new photos ─────────────────────────────────────────────────────────
if [ "$REDEPLOY_ONLY" = false ]; then
  if [ ! -d "$SOURCE_DIR" ]; then
    warn "Source folder not found: $SOURCE_DIR"
    warn "Create ~/Desktop/james-photos/, drop photos in, then run again."
    warn "Or run:  ./upload-photos.sh --redeploy  to redeploy current photos."
    echo ""
    exit 1
  fi

  shopt -s nullglob nocaseglob
  incoming=("$SOURCE_DIR"/*.{jpg,jpeg,png,webp,heic})
  shopt -u nullglob nocaseglob

  if [ ${#incoming[@]} -eq 0 ]; then
    err "No photos found in $SOURCE_DIR (jpg, jpeg, png, webp, heic)"
  fi

  echo "Importing ${#incoming[@]} photo(s) from $(basename "$SOURCE_DIR")..."
  echo ""

  for photo in "${incoming[@]}"; do
    filename=$(basename "$photo")
    name="${filename%.*}"
    ext="${filename##*.}"
    ext_lower=$(echo "$ext" | tr '[:upper:]' '[:lower:]')

    # Convert HEIC to JPEG (sips supports this on macOS)
    if [[ "$ext_lower" == "heic" ]]; then
      out="${name}.jpg"
      sips -s format jpeg -Z 1200 "$photo" --out "$IMAGES_DIR/$out" &>/dev/null \
        && ok "$filename → $out (converted + resized)" \
        || { warn "Failed to convert $filename, skipping"; continue; }
    else
      out="${name}.${ext_lower}"
      sips -Z 1200 "$photo" --out "$IMAGES_DIR/$out" &>/dev/null \
        && ok "$out (resized)" \
        || { cp "$photo" "$IMAGES_DIR/$out" && ok "$out (copied)"; }
    fi
  done
  echo ""
fi

# ── Rebuild manifest.json ─────────────────────────────────────────────────────
shopt -s nullglob nocaseglob
all_photos=("$IMAGES_DIR"/*.{jpg,jpeg,png,webp})
shopt -u nullglob nocaseglob

if [ ${#all_photos[@]} -eq 0 ]; then
  err "photos/images/ is empty — nothing to deploy."
fi

echo "Building manifest.json (${#all_photos[@]} photos)..."
manifest="$IMAGES_DIR/manifest.json"

printf "[\n" > "$manifest"
for i in "${!all_photos[@]}"; do
  f=$(basename "${all_photos[$i]}")
  name="${f%.*}"
  # Caption: filename → title case, dashes/underscores → spaces
  caption=$(echo "$name" | tr '-_' ' ' | sed 's/\b\(.\)/\u\1/g')
  entry="  {\"src\": \"$f\", \"caption\": \"$caption\"}"
  if [ $i -lt $(( ${#all_photos[@]} - 1 )) ]; then
    printf "%s,\n" "$entry" >> "$manifest"
  else
    printf "%s\n"  "$entry" >> "$manifest"
  fi
done
printf "]\n" >> "$manifest"
ok "manifest.json written"
echo ""

# ── Deploy ────────────────────────────────────────────────────────────────────
echo "Deploying to jamesgarraway.com..."
echo ""

CLOUDFLARE_ACCOUNT_ID="$ACCOUNT_ID" \
  wrangler pages deploy "$REPO_DIR" \
  --project-name="$PROJECT" \
  --commit-message="Photo upload: ${#all_photos[@]} photos via upload-photos.sh" \
  2>&1

echo ""
ok "Live at jamesgarraway.com/photos/"
echo ""
echo -e "${YELLOW}Reminder:${NC} git pushes (code updates) will overwrite this deploy."
echo "          Run ./upload-photos.sh --redeploy after any code push."
echo ""
