# Bot Blocking Configuration

This website has been configured to prevent bots and crawlers from indexing the content.

## Features Implemented

### 1. robots.txt
Located at `/public/robots.txt`, this file tells all web crawlers to stay away from the site.
- Blocks all user agents (*)
- Disallows access to entire site (/)
- Specifically blocks major search engines and bots

### 2. Meta Tags
All HTML pages include anti-bot meta tags:
- `robots` meta tag with "noindex, nofollow, noarchive, nosnippet"
- `googlebot` specific noindex directive
- `bingbot` specific noindex directive
- Security headers (X-Frame-Options, X-Content-Type-Options)

## Files Modified
- `/index.html` - Added bot blocking meta tags
- `/minecraft.html` - Added bot blocking meta tags
- `/day/index.html` - Added bot blocking meta tags
- `/magic8ball/index.html` - Added bot blocking meta tags
- `/public/robots.txt` - Created to block all crawlers

## Note
These measures will prevent search engines from:
- Indexing your pages
- Following links on your pages
- Caching your content
- Showing snippets in search results
- Displaying images from your site in image search