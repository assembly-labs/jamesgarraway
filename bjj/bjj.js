'use strict';

// ── Video Database ─────────────────────────────────────────────────────────────

var VIDEOS = [

  // CHAMPIONS (20) — including 1 featured
  { id: 'kt40zilpP4U', category: 'champions', featured: true,
    title: "You've Never Seen a Grappler Like Mikey Musumeci",
    description: 'The rise of BJJ savant Mikey Musumeci -- small guy, huge heart, massive talent.' },

  { id: 'fLo0_x2YBGo', category: 'champions',
    title: 'Gordon Ryan Analyzes ADCC Submission Finishes',
    description: 'Gordon breaks down his best finishes on the road to ADCC.' },

  { id: 'F5_Yo8vMTSU', category: 'champions',
    title: 'Gordon Ryan Wins Two ADCC Superfights - 2024 Highlight',
    description: 'Back-to-back superfight wins at the 2024 ADCC World Championships.' },

  { id: 'YW1VWCxIKzM', category: 'champions',
    title: 'Gordon Ryan ADCC Highlight',
    description: 'Gordon Ryan became an ADCC Champion in 2017 -- this is how it happened.' },

  { id: '4C15SS-tp6M', category: 'champions',
    title: 'Gordon Ryan & Marcelo Garcia ADCC Butterfly Sweep Breakdown',
    description: 'The moment when the new king met the old king.' },

  { id: 'SHx4akUfJzc', category: 'champions',
    title: 'Gordon Ryan vs Yuri Simoes | Full Match | 2024 ADCC',
    description: 'Full match footage from the most dominant grappler alive.' },

  { id: 'HkwFwGYtqfk', category: 'champions',
    title: 'THE GREATEST GRAPPLING MATCH EVER: Kade Ruotolo vs Andrew Tackett',
    description: 'This is the match everyone points to when they say grappling is exciting.' },

  { id: 'ghf8p1dPnQI', category: 'champions',
    title: 'BJJ Phenom Submits Grappling Legend: Tye Ruotolo vs Garry Tonon',
    description: 'Young Tye Ruotolo takes down veteran legend Garry Tonon at ONE Championship.' },

  { id: 'QUYui-viwwU', category: 'champions',
    title: 'Kade Ruotolo vs Roberto Jimenez | 2022 ADCC',
    description: 'Kade Ruotolo turns it up at the 2022 ADCC World Championships.' },

  { id: 'SNe7pQwcShA', category: 'champions',
    title: 'Kade Ruotolo vs Lachlan Giles | 2022 ADCC',
    description: 'Kade vs the leg lock master Lachlan Giles at ADCC 2022.' },

  { id: 'gLNq_nu3YRg', category: 'champions',
    title: 'Kade Ruotolo vs Mica Galvao | 2022 ADCC Finals',
    description: 'The 2022 ADCC 77kg final -- Kade wins the title.' },

  { id: 'ElHD5L0rWyk', category: 'champions',
    title: 'Tye Ruotolo Chokes Out Garry Tonon',
    description: 'Phenom choked out a legend. Watch the future arrive.' },

  { id: 'wwQ9QexiOps', category: 'champions',
    title: "Mikey Musumeci Breaks Down His INSANE ONE Debut",
    description: 'Five-time world champion Mikey breaks down his debut against Imanari.' },

  { id: 'zcJwrERblTM', category: 'champions',
    title: 'Mikey Musumeci Breaks Down His 12-Second Submission',
    description: 'The fastest finish in submission grappling history, explained by Mikey himself.' },

  { id: 'PkgR767YgFk', category: 'champions',
    title: 'Marcelo Garcia Highlight',
    description: '4x ADCC champion, 5x World Champion. The greatest ever -- watch why.' },

  { id: 'sia_yuGN5qI', category: 'champions',
    title: 'Marcelo Garcia ADCC 2005 Highlight',
    description: 'His ADCC 2005 run is considered one of the greatest performances in grappling history.' },

  { id: 'fPMGlU9ouZM', category: 'champions',
    title: 'Top 10 Marcelo Garcia Submissions',
    description: 'The 10 greatest submissions from the greatest grappler of his generation.' },

  { id: 'BGdj4Bj-JkE', category: 'champions',
    title: 'The Greatest BJJ Performance in History - Roger Gracie ADCC 2005',
    description: 'Roger Gracie submitted everyone at ADCC 2005 -- from closed guard.' },

  { id: 'uNHQZ_xX_fY', category: 'champions',
    title: 'Roger Gracie vs Buchecha: The Greatest Match in Jiu Jitsu History',
    description: 'The GOAT vs the next GOAT. BJJ at its absolute best.' },

  { id: 'VPaiRUkP0o0', category: 'champions',
    title: 'The Ultimate 2022 ADCC World Championship Highlight',
    description: 'All the best moments from the biggest grappling event of 2022.' },


  { id: 'UHqnuV91ZiE', category: 'champions',
    title: '9-Year-Old Wins Pan Kids World Championship',
    description: 'A 9-year-old phenom from Tampa takes gold at the IBJJF Pan Kids in Orlando.' },

  { id: 'z813vin0OTc', category: 'champions',
    title: 'ADCC Youth Championship Official Highlight',
    description: 'The future of jiu jitsu in one reel -- kids division at the ADCC Youth Worlds in Las Vegas.' },

  { id: 'Bix_c4JsCgs', category: 'champions',
    title: 'IBJJF Pan Kids 2021 - Zain\'s Gold Medal Match',
    description: 'Pan Kids 2021 gold medal match at the most prestigious kids BJJ tournament in the world.' },

  { id: 'O0eToZ7ij18', category: 'champions',
    title: 'ADCC Kids Worlds Highlight - Long Beach Open',
    description: 'Kids divisions at a major ADCC event -- the next generation going all out.' },

  { id: '3pDJFhOApC0', category: 'champions',
    title: 'Grey Belts Battle at Fuji BJJ Kids Tournament',
    description: 'Young grapplers competing hard at the Fuji BJJ Championship Series.' },

  { id: 't8idWgKYpn0', category: 'champions',
    title: '10-Year-Old\'s First No-Gi Grappling Match',
    description: 'A 10-year-old competes in his very first no-gi match at the EFG Series. Real and relatable.' },

  // TECHNIQUES (20)
  { id: 'lVcUsBCaPfI', category: 'techniques',
    title: 'BJJ Beginners Tutorial: Hip Escape / Shrimp to Turtle',
    description: 'Guard retention drill using the hip escape shrimping movement.' },

  { id: '06PruX4T3Uc', category: 'techniques',
    title: 'Stuck on Bottom? Shrimp Back to Guard',
    description: 'Why the hip escape is the most important move to learn in BJJ.' },

  { id: 'D0rTw8IfJDE', category: 'techniques',
    title: 'Improve Your Shrimp/Hip Escape - BJJ Fundamentals',
    description: 'Step-by-step breakdown to sharpen one of BJJ\'s most essential moves.' },

  { id: 'yiA-UfMxq8s', category: 'techniques',
    title: 'How to Do the Hip Escape (Shrimping)',
    description: 'Basics of the shrimping movement explained simply.' },

  { id: 'c-uspbddRs0', category: 'techniques',
    title: 'How to Shrimp | Brazilian Jiu Jitsu Warmups 101',
    description: 'One of the most important warm-up movements every BJJ student needs.' },

  { id: 'RnIlw0gQK5k', category: 'techniques',
    title: "BJJ Beginner's Guide: How to Shrimp",
    description: "Part of the ultimate beginner's guide series -- hip escape edition." },

  { id: 'w_-OkELHE9g', category: 'techniques',
    title: 'How to Shrimp in BJJ - Basics for Beginners',
    description: 'Simple, clear shrimping tutorial for brand-new grapplers.' },

  { id: 'k54daRsX3co', category: 'techniques',
    title: 'BJJ for Beginners: Triangle Choke from Guard',
    description: 'Black belt Michael South walks through the triangle choke step by step.' },

  { id: 'YJ9cs85dnBI', category: 'techniques',
    title: 'Triangle to Armbar from Closed Guard: BJJ Basics',
    description: 'The easiest submission transition any beginner can drill.' },

  { id: 'qNJNfA27HlI', category: 'techniques',
    title: 'How to Set Up Triangle Choke & Armbar from Guard',
    description: 'Two submissions in one quick tutorial -- triangle and armbar.' },

  { id: 'Er9fHtsYw9U', category: 'techniques',
    title: 'The Basic BJJ Triangle Choke for Beginners',
    description: 'How to do the basic triangle choke and several ways to set it up.' },

  { id: '3wSaxQP4O9Y', category: 'techniques',
    title: 'Armbar - Triangle - Armbar Sequence',
    description: 'Flow between submissions: armbar to triangle and back.' },

  { id: 'p6QOSXVfsiI', category: 'techniques',
    title: 'The Bridge and Roll: Escape from Mount',
    description: 'Lachlan Giles teaches the bridge and roll mount escape in detail.' },

  { id: 'RStk1znIVOs', category: 'techniques',
    title: 'BJJ Sequence: Scissor Sweep, Mount Escape, Choke & Armbar',
    description: 'A complete series of beginner BJJ moves strung together.' },

  { id: 'pQ43Oy5k9yQ', category: 'techniques',
    title: 'Armbar From Guard - John Danaher',
    description: 'John Danaher, the most famous BJJ coach alive, breaks down the armbar.' },

  { id: 'VRYCMYJOn4g', category: 'techniques',
    title: 'How to Do an Armbar from Closed Guard - Beginners',
    description: 'Clear, step-by-step armbar tutorial for new grapplers.' },

  { id: 'UyxNPnR24hE', category: 'techniques',
    title: 'Bridge & Roll Escape from Mount - Grappling Fundamentals',
    description: 'The bridge and roll: one of the most reliable mount escapes.' },

  { id: 'XUrxSihViJI', category: 'techniques',
    title: 'Fundamental Armbar from Full Guard for Beginners',
    description: 'Essential armbar mechanics every beginner should drill first.' },

  { id: 'lgozvgeHwgI', category: 'techniques',
    title: 'Spider Guard Scissor Sweep to Mount',
    description: 'How to use the scissor sweep to land in mount.' },

  { id: '_Pkeue2N-Gs', category: 'techniques',
    title: 'BJJ Fundamentals: How to Hip Escape (Shrimp)',
    description: 'The hip escape explained -- the foundation of all guard movement.' },

  { id: 'FOrBQw3o1s8', category: 'techniques',
    title: 'Kids/Youth BJJ Fundamentals: Techniques Every Student Should Know',
    description: 'A complete fundamentals overview built specifically for kids and youth grapplers.' },

  { id: 'n2gbiEpHHy4', category: 'techniques',
    title: 'Double Leg Takedown - BJJ for Kids',
    description: 'The double leg takedown: one of the most useful moves you can learn at any age.' },

  { id: 'Z3savbVm28M', category: 'techniques',
    title: 'Simple Submissions for Kids',
    description: 'Clean, simple submission setups taught with young grapplers in mind.' },

  { id: 'o0lCyIPloc0', category: 'techniques',
    title: '5 BJJ Games for Kids from the Mount',
    description: 'Games that teach real BJJ skills -- how to stay on top and work from mount.' },

  { id: 'cnvoirw0xPY', category: 'techniques',
    title: 'How Kids Can Learn Jiu Jitsu Faster',
    description: 'Specific tips for young grapplers to level up their BJJ faster than most adults.' },


  // WACKY (25)
  { id: 'yc1hjl3P8Uc', category: 'wacky',
    title: 'B-Team Visits Eddie Bravo Seminar at 10th Planet',
    description: 'Craig Jones, Nicky Rod, and Ethan Crelinsten visit the man who started it all.' },

  { id: 'ElZXzn6u-iM', category: 'wacky',
    title: 'Craig Jones Pulls Up To 10th Planet',
    description: "What happens when the B-Team's best walks into 10th Planet HQ?" },

  { id: 'NpVszg8MVgo', category: 'wacky',
    title: 'Craig Jones vs 10th Planet Jiu-Jitsu',
    description: 'A clash of styles: Craig Jones takes on the whole 10th Planet crew.' },

  { id: 'iAieGQ3VtsQ', category: 'wacky',
    title: 'Eddie Bravo 10th Planet Jiu-Jitsu Seminar',
    description: 'Eddie Bravo seminar highlights -- rubber guard chaos begins here.' },

  { id: 'pXZptNMpPWA', category: 'wacky',
    title: 'History of Eddie Bravo | 10th Planet | Rubber Guard',
    description: 'The full story of the guy who broke jiu jitsu.' },

  { id: 'LE36ET-rOM0', category: 'wacky',
    title: "10th Planet's Homegrown Squad | On Borrowed Time with Craig Jones",
    description: "Inside 10th Planet's biggest underdogs." },

  { id: 'sQfRyoKNNj0', category: 'wacky',
    title: 'Masterclass with Eddie Bravo at 10th Planet',
    description: 'Full class breakdown with the inventor of the rubber guard system.' },

  { id: 'JIe4qffdG6Y', category: 'wacky',
    title: 'Craig Jones vs B-Team',
    description: "Even the team's founder isn't safe from getting choked out." },

  { id: 'reIoqIz5ews', category: 'wacky',
    title: 'Danaher Death Squad Highlights',
    description: 'Garry Tonon, Eddie Cummings, Gordon Ryan, Nicky Ryan -- pure chaos.' },

  { id: '_SVD7IifLbw', category: 'wacky',
    title: 'Ethan Crelinsten Teaches Nicky Rod a Reverse Triangle',
    description: 'B-Team drill day: reverse triangle sequence at the gym.' },

  { id: 'YPbjsKkHbNA', category: 'wacky',
    title: "B-Team Rules After the Danaher Death Squad Split",
    description: 'Craig Jones explains what the B-Team is actually about.' },

  { id: 'koiUGlb5CXs', category: 'wacky',
    title: 'B-Team on the Danaher Death Squad Split',
    description: "Why the greatest BJJ team in history split up -- their side of the story." },

  { id: 'HEtapldFSCk', category: 'wacky',
    title: 'The REAL Reason Behind the Danaher Death Squad Split',
    description: 'Nicky Rodriguez reveals the full story of the most dramatic split in BJJ.' },

  { id: 'hLZ6PACCBy8', category: 'wacky',
    title: 'B-Team Jiu Jitsu on Lex Fridman Podcast',
    description: 'Craig Jones, Nicky Rod, and Nicky Ryan on grappling, life, and weirdness.' },

  { id: 'S8Ccl5jY9do', category: 'wacky',
    title: 'Eddie Bravo Explains the Rubber Guard to Rickson Gracie',
    description: 'The most legendary awkward moment in BJJ history.' },

  { id: '0088BT-DfeI', category: 'wacky',
    title: 'Metamoris 3: Royler Gracie vs Eddie Bravo',
    description: 'The 10-year rematch. Rubber guard vs the Gracie family.' },

  { id: 'Y4ASonA9t6c', category: 'wacky',
    title: 'Eddie Bravo vs Royler Gracie - Full Match (ADCC 2003)',
    description: 'The match that launched 10th Planet Jiu-Jitsu.' },

  { id: 'ewTGXah4GXE', category: 'wacky',
    title: "Eddie Bravo vs Royler Gracie - Eddie's Own Commentary",
    description: "Eddie narrates the most famous upset in BJJ history himself." },

  { id: 'w_Z8kXXyq0E', category: 'wacky',
    title: 'Eddie Bravo vs Royler Gracie ADCC 2003 - Remastered HD',
    description: 'The original rubber guard moment in full HD.' },

  { id: 'SyiNg4-kc1s', category: 'wacky',
    title: 'Eddie Bravo Breaks Down the Royler Rematch | Joe Rogan',
    description: "Eddie and Joe Rogan recap Metamoris 3's insane draw." },

  { id: 'GHgNtyrWxwY', category: 'wacky',
    title: "Ethan Crelinsten: Danaher's Black Belt | Ep 34",
    description: 'Inside the mind of one of the weirdest and most technical BJJ players alive.' },

  { id: 'gfR3x3YIJhc', category: 'wacky',
    title: "When 3x World Champ Stormed the B-Team's Best",
    description: 'A world champion rolls into B-Team and things get interesting.' },

  { id: '9pCZtC-At_Q', category: 'wacky',
    title: 'BJJ Match Study: Eddie Bravo vs Royler Gracie (ADCC 2003)',
    description: 'Technical breakdown of the match that changed jiu jitsu forever.' },

  { id: 'qvpc-DOXO9A', category: 'wacky',
    title: 'Under Hook Side Body Triangle - Ethan Crelinsten',
    description: "Crelinsten shows a body triangle technique that's pure B-Team chaos." },

  { id: 'RJ7Iutti8cY', category: 'wacky',
    title: 'Mastering the Rubber Guard - Eddie Bravo',
    description: 'A full breakdown of the rubber guard system by its creator.' },


  // LIFESTYLE (15)
  { id: 'n4k3LNWbVLc', category: 'lifestyle',
    title: 'Jiu Jitsu for Life or Death | Jocko Willink',
    description: 'A Navy SEAL explains why jiu jitsu is the most important martial art.' },

  { id: 'WFvMcQuR1lM', category: 'lifestyle',
    title: 'Jocko Willink on Self-Defense and BJJ',
    description: 'What to learn, how to train, and why BJJ works when it counts.' },

  { id: 'njC60TxA1JU', category: 'lifestyle',
    title: 'How to Properly Encourage Kids to Start Jiu Jitsu | Jocko',
    description: "Jocko's advice for parents and kids on starting BJJ the right way." },

  { id: '7XULhEomzU8', category: 'lifestyle',
    title: 'Joe Rogan and Jocko Willink: BJJ, Striking, and Street Defense',
    description: 'Two black belts talk about what actually works in real life.' },

  { id: 'xpZasMHhDDE', category: 'lifestyle',
    title: 'Overcoming Frustrations When Starting Jiu Jitsu | Jocko',
    description: "It's hard. You will get tapped. Here's how to keep going anyway." },

  { id: 'FxMIZVjB5Wk', category: 'lifestyle',
    title: 'What Martial Art Should I Put My Kids In? | Jocko',
    description: "Spoiler: it's jiu jitsu. Jocko explains why." },

  { id: 'GOV-adXFT2k', category: 'lifestyle',
    title: 'BJJ Black Belt Jocko Willink',
    description: 'The man who wakes up at 4:30am to train jiu jitsu. Every. Single. Day.' },

  { id: 'gK1B0XSJIV0', category: 'lifestyle',
    title: 'Has Jocko Ever Used Jiu Jitsu in Combat?',
    description: 'A Navy SEAL answers the question everyone wants to ask.' },

  { id: 'mJ-6ZzMu55s', category: 'lifestyle',
    title: "The Power of BJJ: Jocko Explains Why It's a Must-Learn",
    description: 'Why Jocko thinks every human being should train jiu jitsu.' },

  { id: 'mAyzviXhOdk', category: 'lifestyle',
    title: 'This Is What Jiu Jitsu Can Do for Your Kid',
    description: 'Six-year-old kids showing confidence, technique, and heart gained through BJJ.' },

  { id: 'QPy386CpuQg', category: 'lifestyle',
    title: 'How to Practice Jiu Jitsu with Your Kids',
    description: 'Parent-child BJJ games and drills to make training fun at home.' },

  { id: 'HXFZitvRrnA', category: 'lifestyle',
    title: '5 Years Old Testing for BJJ Grey Belt',
    description: 'Watch a 5-year-old and 7-year-old show incredible jiu jitsu skills and heart.' },

  { id: '9lBOWOgMzgA', category: 'lifestyle',
    title: 'Henry Cavill on Training BJJ with Roger Gracie',
    description: 'Superman talks about learning jiu jitsu from the greatest BJJ player of all time.' },

  { id: '5Y8u1SRSJXU', category: 'lifestyle',
    title: 'THE NEW GUARD: Mikey Musumeci (Full Film)',
    description: "The full origin story of how a kid from New Jersey became the world's most decorated BJJ competitor." },

  { id: 'OkkYsAvHNL8', category: 'lifestyle',
    title: 'How to Learn Jiu Jitsu as a White Belt | Mikey Musumeci',
    description: 'A five-time world champion gives his honest advice to anyone just starting out.' },

  { id: 'W_00W4-hZFY', category: 'lifestyle',
    title: 'BJJ Pre-Tournament Training - No-Gi Kids',
    description: 'What a real pre-competition training week looks like for kids getting ready to compete.' },

  { id: 'MVUHVOn45zo', category: 'lifestyle',
    title: 'Kids Jiu Jitsu Tournament: What It\'s Actually Like to Compete',
    description: 'The nerves, the matches, the lessons -- what competing in BJJ really feels like as a kid.' }

];

// ── Page Logic ─────────────────────────────────────────────────────────────────

var FEATURED = null;
var NON_FEATURED = [];

for (var i = 0; i < VIDEOS.length; i++) {
  if (VIDEOS[i].featured) {
    FEATURED = VIDEOS[i];
  } else {
    NON_FEATURED.push(VIDEOS[i]);
  }
}

var currentFilter = 'all';
var searchDebounce;

// YouTube thumbnail URL
function thumbUrl(id) {
  return 'https://img.youtube.com/vi/' + id + '/mqdefault.jpg';
}

// Badge label map
function badgeLabel(cat) {
  if (cat === 'techniques') return 'TECHNIQUES';
  if (cat === 'wacky')      return 'WACKY';
  if (cat === 'champions')  return 'CHAMPIONS';
  if (cat === 'lifestyle')  return 'LIFESTYLE';
  return cat.toUpperCase();
}

// Build a single video card element
function buildCard(video, isFeatured) {
  var card = document.createElement('div');
  card.className = 'widget video-card' + (isFeatured ? ' featured-card' : '');

  // Thumbnail
  var thumbWrap = document.createElement('div');
  thumbWrap.className = 'video-thumb-wrap';

  var img = document.createElement('img');
  img.src = thumbUrl(video.id);
  img.alt = video.title;
  img.onerror = function() { this.src = '/bjj/thumb-fallback.svg'; };
  thumbWrap.appendChild(img);

  // Category badge
  var badge = document.createElement('span');
  badge.className = 'category-badge ' + video.category;
  badge.textContent = badgeLabel(video.category);
  thumbWrap.appendChild(badge);

  // Play overlay
  var overlay = document.createElement('div');
  overlay.className = 'play-overlay';
  var playBtn = document.createElement('div');
  playBtn.className = 'play-btn';
  overlay.appendChild(playBtn);
  thumbWrap.appendChild(overlay);

  card.appendChild(thumbWrap);

  // Card body
  var body = document.createElement('div');
  body.className = 'video-card-body';

  if (isFeatured) {
    var featuredLabel = document.createElement('div');
    featuredLabel.className = 'featured-label';
    featuredLabel.textContent = 'FEATURED';
    body.appendChild(featuredLabel);
  }

  var title = document.createElement('div');
  title.className = 'video-card-title';
  title.textContent = video.title;
  body.appendChild(title);

  if (video.description) {
    var desc = document.createElement('div');
    desc.className = 'video-card-desc';
    desc.textContent = video.description;
    body.appendChild(desc);
  }

  card.appendChild(body);

  // Click to open modal
  card.addEventListener('click', function() { openModal(video.id, video.title); });

  return card;
}

// Render the featured card section
function renderFeatured(filter, query) {
  var section = document.getElementById('featured-section');
  section.innerHTML = '';
  if (!FEATURED) return;

  var matchesFilter = filter === 'all' || FEATURED.category === filter;
  var matchesQuery  = !query || FEATURED.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;

  if (matchesFilter && matchesQuery) {
    section.appendChild(buildCard(FEATURED, true));
  }
}

// Render non-featured video grid
function renderCards(filter, query) {
  var grid = document.getElementById('video-grid');
  grid.innerHTML = '';

  var filtered = NON_FEATURED.filter(function(v) {
    var matchesFilter = filter === 'all' || v.category === filter;
    var matchesQuery  = !query || v.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    return matchesFilter && matchesQuery;
  });

  if (filtered.length === 0) {
    var empty = document.createElement('div');
    empty.className = 'no-results';
    empty.textContent = 'No videos found.';
    grid.appendChild(empty);
    return;
  }

  filtered.forEach(function(v) {
    grid.appendChild(buildCard(v, false));
  });
}

// Update count badges on filter buttons
function updateCounts(filter, query) {
  var q = query ? query.toLowerCase() : '';

  function countFor(cat) {
    return VIDEOS.filter(function(v) {
      var matchesCat = cat === 'all' || v.category === cat;
      var matchesQ   = !q || v.title.toLowerCase().indexOf(q) !== -1;
      return matchesCat && matchesQ;
    }).length;
  }

  document.getElementById('count-all').textContent        = '(' + countFor('all') + ')';
  document.getElementById('count-techniques').textContent = '(' + countFor('techniques') + ')';
  document.getElementById('count-wacky').textContent      = '(' + countFor('wacky') + ')';
  document.getElementById('count-champions').textContent  = '(' + countFor('champions') + ')';
  document.getElementById('count-lifestyle').textContent  = '(' + countFor('lifestyle') + ')';
}

// Open video modal
function openModal(videoId, title) {
  var modal   = document.getElementById('video-modal');
  var iframe  = document.getElementById('video-iframe');
  var titleEl = document.getElementById('modal-title');

  titleEl.textContent = title;
  iframe.src = 'https://www.youtube-nocookie.com/embed/' + videoId + '?autoplay=1&rel=0';
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

// Close video modal -- also stops the video
function closeModal() {
  var modal  = document.getElementById('video-modal');
  var iframe = document.getElementById('video-iframe');
  iframe.src = '';
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

// ── Init ───────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function() {
  renderFeatured('all', '');
  renderCards('all', '');
  updateCounts('all', '');

  // Filter buttons
  var filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      currentFilter = btn.getAttribute('data-filter');
      filterBtns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var query = document.getElementById('videoSearch').value.trim();
      renderFeatured(currentFilter, query);
      renderCards(currentFilter, query);
      updateCounts(currentFilter, query);
    });
  });

  // Search input (debounced 200ms)
  var searchInput = document.getElementById('videoSearch');
  searchInput.addEventListener('input', function() {
    clearTimeout(searchDebounce);
    var self = this;
    searchDebounce = setTimeout(function() {
      var query = self.value.trim();
      renderFeatured(currentFilter, query);
      renderCards(currentFilter, query);
      updateCounts(currentFilter, query);
    }, 200);
  });

  // Close modal handlers
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-backdrop').addEventListener('click', closeModal);
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
  });
});
