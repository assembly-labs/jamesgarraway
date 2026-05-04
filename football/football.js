'use strict';

// ── Video Database ─────────────────────────────────────────────────────────────

var VIDEOS = [

  // CORNERBACK (26)
  { id: 'Ct6uU0JMMqc', category: 'cornerback', featured: true,
    title: '4 Tips: How To Be Better At Cornerback',
    description: 'Four key tips for dominating as a cornerback.' },

  { id: 'T5vTHat1sEU', category: 'cornerback',
    title: '6 Best Corner Drills for Defensive Backs',
    description: 'Six essential drills to sharpen your cornerback skills.' },

  { id: 'saXz9Gi5AVI', category: 'cornerback',
    title: 'Defensive Back Drills | NFL Flag Football',
    description: 'DB drills from the New Orleans Saints NFL Flag series.' },

  { id: '1OVlKIN7FWE', category: 'cornerback',
    title: '10 Cornerback Drills for Lockdown Coverage',
    description: 'Ten cornerback drills to build lockdown skills.' },

  { id: 'Z0R12jKBp08', category: 'cornerback',
    title: 'Simple Drills to Develop Better Defensive Backs',
    description: 'Clean, simple drills to level up your DB game.' },

  { id: 't4I6NYJshAw', category: 'cornerback',
    title: '5 Drills for Defensive Back Skills',
    description: 'Five essential drills every DB needs to know.' },

  { id: '3v-_UfM6lew', category: 'cornerback',
    title: 'Top 3 DB Drills for Cornerbacks and Safeties',
    description: 'Backpedal, footwork, and change-of-direction drills.' },

  { id: '90NYM1nQhzA', category: 'cornerback',
    title: 'Youth Flag Football Cornerback Skills',
    description: 'Wide receiver and cornerback skills for flag football.' },

  { id: 'b9vvlD6K7yo', category: 'cornerback',
    title: 'Defensive Back Drills for Youth Football',
    description: 'DB drills built specifically for youth football players.' },

  { id: 'HVJUhKo1KEc', category: 'cornerback',
    title: 'Ultimate Zone Coverage Tips for Cornerbacks',
    description: 'Alignment, responsibilities, and zone coverage strategies.' },

  { id: 'D4Xm_m3JWMI', category: 'cornerback',
    title: 'Press Man Coverage Technique',
    description: 'Stance, alignment, and technique to lock down receivers.' },

  { id: 'xNgmcdXG9v8', category: 'cornerback',
    title: 'Up Your Zone Coverage in 6 Minutes',
    description: 'Quick and effective zone coverage improvements.' },

  { id: 'W8IobgX5i_g', category: 'cornerback',
    title: 'How To Play Press Man Coverage',
    description: 'Master the fundamentals of press man coverage at the line.' },

  { id: 'ywHi-8F0NOA', category: 'cornerback',
    title: 'How to Use Your Hands in Press Coverage',
    description: 'Hand technique tips from the All Eyes DB Camp.' },

  { id: 'HNNrOLE82Tk', category: 'cornerback',
    title: 'Zone vs Man Coverage Explained',
    description: 'Understand the key differences between zone and man defense.' },

  { id: '3m_qWSa1MyQ', category: 'cornerback',
    title: 'How to Play Man Coverage',
    description: 'Coaching guide for playing man coverage as a cornerback.' },

  { id: 'I-oBJfXET-s', category: 'cornerback',
    title: 'How to Play Cover 2 as a Cornerback',
    description: 'Quick tutorial on Cover 2 cornerback responsibilities.' },

  { id: 'cwS-r1dGTu8', category: 'cornerback',
    title: 'Pass Coverage 101: Basics of Man Coverage',
    description: 'Breaking down the fundamentals of man coverage.' },

  { id: 'RwJYVKqRIH4', category: 'cornerback',
    title: 'Stephon Gilmore Breaks Down Elite DB Technique',
    description: 'A Pro Bowl CB shows exactly how to be an elite defensive back.' },

  { id: 'o8kgye5OnkA', category: 'cornerback',
    title: 'NFL Cornerback Drills Like Stephon Gilmore',
    description: 'Practice the drills that made Gilmore one of the best ever.' },

  { id: 'j7m1Q_lrGj0', category: 'cornerback',
    title: 'DB Stance and Backpedal Technique',
    description: 'Pro footwork trainer breaks down proper CB stance.' },

  { id: '9QsAnW3Y0vg', category: 'cornerback',
    title: 'How to Backpedal (DB Footwork)',
    description: 'Build the backward speed and knee strength all DBs need.' },

  { id: 'quB7W_1-eng', category: 'cornerback',
    title: 'All Eyes DB Camp: Master of the Basics',
    description: 'Footwork drills and backpedal from a top DB camp series.' },

  { id: 'XhFtPqvsiIY', category: 'cornerback',
    title: 'Cornerback Technique: Backpedal Weave',
    description: 'The backpedal weave drill for elite cornerback footwork.' },

  { id: 'dP1bZDDfvyw', category: 'cornerback',
    title: "Stephon Gilmore's Off-Ball Technique",
    description: 'Film breakdown of Gilmore using elite off-man coverage.' },

  { id: 'tA9C_ylQAX4', category: 'cornerback',
    title: 'Covering a Fast Wide Receiver | DB Defense',
    description: 'Techniques for covering speedy wide receivers in flag football.' },


  // FLAG FOOTBALL (42)
  { id: '19BBhP3uRTE', category: 'flag-football',
    title: 'Flag Pulling Essentials | NFL Flag Football Drills',
    description: 'Learn the basics of flag pulling from the Saints series.' },

  { id: 'ugwBXIqM_jU', category: 'flag-football',
    title: 'Running Back Drills | NFL Flag Football Drills',
    description: 'RB fundamentals from the NFL Flag Football Saints series.' },

  { id: 'LsF_PBE7FOY', category: 'flag-football',
    title: 'Wide Receiver Drills | NFL Flag Football Drills',
    description: 'WR route running and catching from the Saints series.' },

  { id: 'yAbzl95xOIk', category: 'flag-football',
    title: 'Agility Drills | NFL Flag Football Drills',
    description: 'Speed and agility fundamentals for flag football.' },

  { id: 'X2YoH15-b44', category: 'flag-football',
    title: 'Defensive Coverage Drills | NFL Flag Football Drills',
    description: 'Coverage techniques from the NFL Flag Football series.' },

  { id: 'oDYmoCXraeE', category: 'flag-football',
    title: 'Ball Carrying Drills | NFL Flag Football Drills',
    description: 'How to carry and protect the ball in flag football.' },

  { id: 'DjKcZrBKTco', category: 'flag-football',
    title: '7-on-7 Drills | NFL Flag Football Drills',
    description: 'Full team drills for 7-on-7 flag football.' },

  { id: '0jfHNJUvu4E', category: 'flag-football',
    title: 'Flag Pulling Drills | NFL Flag Football Drills',
    description: 'More flag pulling drill progressions from the Saints.' },

  { id: '9Af6yj55ALQ', category: 'flag-football',
    title: 'Youth Flag Football Defense Formations',
    description: 'Defensive formations and adjustments for new coaches.' },

  { id: 'mj2ChZPwyDI', category: 'flag-football',
    title: 'Most Popular Defense Formation 5v5/6v6/7v7',
    description: 'Top defense formations for every flag football format.' },

  { id: 'SxS7ciqIIDo', category: 'flag-football',
    title: 'BEST Defense Formation for Youth Flag Football',
    description: 'The go-to defensive formation for youth flag football.' },

  { id: '7Y3Tg3ttz5E', category: 'flag-football',
    title: 'How to Run Cover 2 Zone Defense in Flag Football',
    description: 'Cover 2 basics and zone defense explained for flag football.' },

  { id: 'D-7CAkZacL4', category: 'flag-football',
    title: 'Easy Zone Defences for 6 on 6 Flag Football',
    description: 'Simple zone defense schemes for 6v6 flag football.' },

  { id: '9MXLZiV69DQ', category: 'flag-football',
    title: 'Easy Zone Defences for 5 on 5 Flag Football',
    description: 'Zone defense breakdowns for 5v5 flag football.' },

  { id: 'ARe1M-hcubM', category: 'flag-football',
    title: '7 on 7 Flag Football 2-3-2 Zone Defense',
    description: 'How to run the 2-3-2 zone in 7-on-7 flag football.' },

  { id: 'ZxtBdqERcfc', category: 'flag-football',
    title: 'Quarterback Drills | NFL Flag Football Drills',
    description: 'QB fundamentals from the NFL Flag Football series.' },

  { id: 'TEUaIaS6_C4', category: 'flag-football',
    title: 'How to Play QB | Seahawks Flag Football',
    description: 'Jake Heaps teaches QB fundamentals for flag football.' },

  { id: 'sDyUrbIRbVE', category: 'flag-football',
    title: 'Flag Football QB Drills to Improve Accuracy',
    description: 'Accuracy drills and pocket presence for flag QBs.' },

  { id: 'ZgO4Efmor8U', category: 'flag-football',
    title: 'Quarterback Run Footwork | Flag Football Drills',
    description: 'QB footwork for scrambling and running in flag football.' },

  { id: 'JSvReNSKF84', category: 'flag-football',
    title: 'QB Cadence and Dropbacks | Flag Football Drills',
    description: 'How to run cadence and proper QB dropbacks.' },

  { id: 'bcvXFvswUac', category: 'flag-football',
    title: 'Youth Flag Football QB Throwing Techniques',
    description: 'Teach young quarterbacks to throw with confidence.' },

  { id: 'Cws1QVXtysU', category: 'flag-football',
    title: 'Defensive Rushing Drills | NFL Flag Football',
    description: 'How to rush the QB and read the offense.' },

  { id: 'WVER4fXA24E', category: 'flag-football',
    title: 'Offense Strategies vs the Blitz | Flag Football',
    description: 'Beat the blitz with these QB scramble strategies.' },

  { id: 'dJUbcZit7EQ', category: 'flag-football',
    title: 'How To Throw a Football: QB Drills | NFL Flag',
    description: 'NFL Flag tutorial on throwing mechanics for young QBs.' },

  { id: 'xvjn4knRcFo', category: 'flag-football',
    title: 'Flag Football Positions Explained for Beginners',
    description: 'A quick intro to every flag football position.' },

  { id: '53gBFGt4zTo', category: 'flag-football',
    title: 'Youth Flag Football Tutorial for New Coaches',
    description: 'Where to put players on offense and defense.' },

  { id: 'Ck-VxQObXBI', category: 'flag-football',
    title: 'How to Play Flag Football | NFL Flag Basics',
    description: 'Core rules and fundamentals of NFL Flag Football.' },

  { id: 'TA5iFVWTukU', category: 'flag-football',
    title: 'How to Play Flag Football for Beginners',
    description: 'Complete beginner tutorial: rules, scoring, equipment.' },

  { id: 'NoThD0T4GPs', category: 'flag-football',
    title: 'Offensive Positions in Flag Football',
    description: 'Breakdown of all four offensive positions in flag football.' },

  { id: 'G-916j8b5c0', category: 'flag-football',
    title: 'Flag Football 101: Learn How to Play',
    description: 'Everything you need to know to start playing flag football.' },

  { id: '4zdN0SO_wBI', category: 'flag-football',
    title: 'Flag Football Explained for Beginners',
    description: 'The basics of flag football explained simply.' },

  { id: 'gcL-xjCi6qo', category: 'flag-football',
    title: 'How to Play Wide Receiver | Seahawks Flag Football',
    description: 'Jordan Babineaux teaches WR fundamentals for flag football.' },

  { id: 'UQBexmumJQo', category: 'flag-football',
    title: 'How to Catch a Football | WR Drills and Routes',
    description: 'Hand positioning, catching technique, and route concepts.' },

  { id: 'lTq8HsvOpqA', category: 'flag-football',
    title: 'Wide Receiver Drills | NFL Flag Football Drills',
    description: 'More WR drills from the NFL Flag Football series.' },

  { id: 'pfvAW9gPfsQ', category: 'flag-football',
    title: 'Wide Receiver Drills: Catch and Score | NFL Flag',
    description: 'Catch the ball and get to the end zone in flag football.' },

  { id: 'Wzk2JToruXA', category: 'flag-football',
    title: 'Introduction to NFL Flag Football | Seahawks',
    description: 'Seahawks legends introduce flag football fundamentals.' },

  { id: 'kpkIJ13sTJY', category: 'flag-football',
    title: 'Youth WR Catching and Route Running Tips',
    description: 'Wide receiver tips that actually work in youth flag football.' },

  { id: 'B7Qga7ujCww', category: 'flag-football',
    title: 'Youth Flag Football Rushing Secrets | Blitz the QB',
    description: 'Disrupt the offense with these defensive rushing secrets.' },

  { id: 'DjFI4dO1G0c', category: 'flag-football',
    title: 'Pass Rush Drills | NFL Flag Football Drills',
    description: 'Pass rush techniques from the NFL Flag series.' },

  { id: 'TWMohm49Q5E', category: 'flag-football',
    title: 'Youth Flag Football Offense Plays That Work',
    description: 'Offense strategies and run/pass plays that get results.' },

  { id: '_F_Ur7Gdu1s', category: 'flag-football',
    title: 'Defensive Coverage Drills | NFL Flag Football',
    description: 'More coverage drills from the NFL Flag Football series.' },

  { id: '3KYlmfGrh5A', category: 'flag-football',
    title: 'Wide Receiver Drills | NFL Flag Football Drills',
    description: 'WR fundamentals and catching drills from NFL Flag.' },


  // MOTIVATION (22)
  { id: 'ZOMCyB56Ze4', category: 'motivation',
    title: 'Jason Kelce Retirement Speech | Best Moments',
    description: "Best moments from Kelce's legendary 40-minute retirement speech." },

  { id: '5zNHgkEePtU', category: 'motivation',
    title: 'Jason Kelce Full Retirement Press Conference',
    description: 'The complete press conference where Kelce announced his retirement.' },

  { id: 'G5JG768lU7Y', category: 'motivation',
    title: "Jason Kelce's Emotional Retirement Announcement",
    description: 'An Eagles legend says goodbye after 13 seasons in Philadelphia.' },

  { id: 'Myu5LqQjIOY', category: 'motivation',
    title: "Jason Kelce's Full Retirement Announcement Speech",
    description: "Every word of Kelce's retirement speech for Eagles fans." },

  { id: 'QfD0e8LF1Do', category: 'motivation',
    title: 'Jason and Travis Kelce on the Retirement Speech',
    description: '"I had been writing it for 13 years." The brothers reflect.' },

  { id: 'rWZkAcPPDc4', category: 'motivation',
    title: 'Jason Kelce Retirement | The Pat McAfee Show',
    description: "Pat McAfee's reaction to Kelce's retirement announcement." },

  { id: 'k5m2bR1eZhc', category: 'motivation',
    title: "Jason Kelce's Tearful Retirement Speech",
    description: 'An emotional moment as Kelce says farewell to Eagles football.' },

  { id: 'uab-PkbVRzY', category: 'motivation',
    title: 'Cooper DeJean on His Super Bowl Pick Six of Mahomes',
    description: 'The Eagles rookie DB talks Jalen Hurts and the big interception.' },

  { id: 'ZyNgpgRwNZM', category: 'motivation',
    title: 'Darius Slay: Being a Super Bowl Champ',
    description: 'Slay talks Eagles defense, ranking rookie WRs, and the championship.' },

  { id: 'AjIhoqFUTDc', category: 'motivation',
    title: "Darius Slay on the Eagles' Historically Great Super Bowl Win",
    description: '"We destroyed them...plain and simple." Slay breaks it all down.' },

  { id: '-U6A30ljZcQ', category: 'motivation',
    title: 'Darius Slay: NFL Future and Super Bowl Pregame Message',
    description: 'Slay reflects on his career and pregame words to DeJean and Mitchell.' },

  { id: 'pu_ChQfhPP0', category: 'motivation',
    title: 'Darius Slay on Cooper DeJean and Quinyon Mitchell',
    description: 'The veteran CB talks about mentoring the Eagles young stars.' },

  { id: 'CXgFCSvWgEk', category: 'motivation',
    title: "Patrick Mahomes' Mindset and Mental Toughness",
    description: 'Five mental toughness skills from a Super Bowl champion QB.' },

  { id: 'sCLsHAY5gmA', category: 'motivation',
    title: 'Mindset of Winners: Super Bowl Legends on Success',
    description: 'Brady, Manning, and Mahomes reveal the secret to winning.' },

  { id: '1nv_fCjPcSo', category: 'motivation',
    title: "Eagles HISTORIC Road to Super Bowl LIX | America's Game",
    description: "NFL Films documents the Eagles' full championship journey." },

  { id: 'qEloDhQ6R_U', category: 'motivation',
    title: 'Eagles 2024-25: Redemption Road to the Super Bowl',
    description: "The Eagles' mini movie: the full story of the championship season." },

  { id: 'RFeGrskzt6s', category: 'motivation',
    title: 'How the Eagles Won the Super Bowl | Unscripted',
    description: "Inside the Eagles' Super Bowl LIX preparation vs the Chiefs." },

  { id: '-rOmWIERvzo', category: 'motivation',
    title: 'Super Bowl LIX Game Highlights: Eagles vs Chiefs',
    description: 'Full game highlights from the Eagles championship win.' },

  { id: 'Gvn4GLEqIqg', category: 'motivation',
    title: 'Eagles Super Bowl 59 Championship Season Mini Movie',
    description: 'Full recap of the Super Bowl champion Eagles 2024 season.' },

  { id: 'PwwztJxYFuM', category: 'motivation',
    title: 'How the Eagles Built the Best Defense in Football',
    description: "NFL Films breaks down the Eagles' dominant championship defense." },

  { id: '5RODIchSbpo', category: 'motivation',
    title: 'Eagles Spouses Break Down Super Bowl LIX | NFL Films',
    description: "Inside Super Bowl LIX from the Eagles families' perspective." },

  { id: 'ugjEcjCyIsU', category: 'motivation',
    title: 'Darius Slay Calls Rookie DBs "My Kids"',
    description: 'Slay mentors DeJean and Mitchell like a true veteran leader.' },


  // LEADERSHIP (25)
  { id: 'ymZVYuqB44U', category: 'leadership',
    title: 'Jalen Hurts: Effort Will Never Be Questioned',
    description: 'Hurts on what drives him and why effort is non-negotiable.' },

  { id: 'QHxRohNblls', category: 'leadership',
    title: 'Jalen Hurts: Pursuit of Greatness',
    description: 'One-on-one with Hurts on his mentality and what greatness means.' },

  { id: 'cIossw3kK6U', category: 'leadership',
    title: "Jalen Hurts Mic'd Up at Eagles Practice",
    description: "Hear Hurts lead the huddle during an intense Eagles practice day." },

  { id: 'xbMsB3iFbbE', category: 'leadership',
    title: 'Jalen Hurts on His Leadership Style',
    description: 'Hurts breaks down how he leads the Eagles locker room.' },

  { id: 'AWmb6MjNBQk', category: 'leadership',
    title: 'Jalen Hurts Has Kobe and Jordan Work Ethic',
    description: "QB coach explains what makes Hurts' offseason work elite." },

  { id: 'VQeB3OzUi9A', category: 'leadership',
    title: 'Kobe Bryant: Mamba Mentality at Its Best',
    description: '"We are up here because of 4 a.m." Kobe on relentless work.' },

  { id: 'et89uaUaugw', category: 'leadership',
    title: 'Kobe Bryant: Never Rest in the Middle',
    description: 'Kobe on the difference between good and great.' },

  { id: 'UhBstqd-u5g', category: 'leadership',
    title: 'THE MAMBA MENTALITY | Kobe Bryant Speech Compilation',
    description: '"Trying to be the best version of yourself." Kobe in his own words.' },

  { id: 'uYft11qaBEU', category: 'leadership',
    title: 'Better Every Day | Kobe Bryant',
    description: 'Kobe Bryant lived by one rule: get better every single day.' },

  { id: 'VSceuiPBpxY', category: 'leadership',
    title: 'The Mindset of a Winner | Kobe Bryant',
    description: "Kobe's advice to champions on how to think and compete." },

  { id: 'Pscbwh9iKv0', category: 'leadership',
    title: 'Fail to Succeed | Michael Jordan',
    description: 'Jordan on why failure is part of becoming great.' },

  { id: 't6BUesJlJNg', category: 'leadership',
    title: 'Michael Jordan: Cut From the Team to Basketball Legend',
    description: 'How being cut from varsity launched the greatest career ever.' },

  { id: 'EqLu3lkp1tc', category: 'leadership',
    title: "Michael Jordan's Coach on Getting Cut in High School",
    description: "The coach who cut Jordan tells the story from his side." },

  { id: 'MOSVozqyxKI', category: 'leadership',
    title: 'Michael Jordan: I Failed Over and Over Again',
    description: '"That is why I succeeded." Jordan on failure as fuel.' },

  { id: 'FbCP4WMwu_M', category: 'leadership',
    title: 'Michael Jordan: Beating Rejection and Becoming the Best',
    description: 'The full motivational story of how Jordan turned rejection into greatness.' },

  { id: 'Gg8kTVKkqvw', category: 'leadership',
    title: 'Tony Dungy on Leadership Style and Character First Teams',
    description: 'Dungy explains why character wins championships, not just talent.' },

  { id: 'XBWt-XUv6cY', category: 'leadership',
    title: 'How Tony Dungy Led Without Raising His Voice',
    description: 'The Hall of Fame coach who proved calm leadership wins.' },

  { id: 'LkvsN6cgXMg', category: 'leadership',
    title: 'Tony Dungy: Leadership, Pressure & Staying True to Yourself',
    description: 'Dungy on how to lead under pressure without losing who you are.' },

  { id: 'DEchrYkjERc', category: 'leadership',
    title: 'The Power of Helping Others | Tony Dungy',
    description: 'Dungy on why putting others first is the foundation of great leadership.' },

  { id: '9yz4Uzq3DKs', category: 'leadership',
    title: 'Tony Dungy: The Key to Leading Winning Teams',
    description: "Dungy's core principles for building a team that wins together." },

  { id: 'RHlDB97mwg4', category: 'leadership',
    title: 'The Game of Life | Most Motivational Football Speech',
    description: 'William Hollis delivers a speech that goes way beyond the field.' },

  { id: 'c_u2wA9tn9s', category: 'leadership',
    title: 'I Am a Champion | Motivational Football Speech',
    description: "A coach's pregame speech that every young athlete should hear." },

  { id: 'yX39J_YyKbs', category: 'leadership',
    title: 'I Am a Champion: The Greatest Speech Ever',
    description: 'Coach Johnathan Flowers fires up his team with a speech for the ages.' },

  { id: 'QSOVQ9y4Xfw', category: 'leadership',
    title: 'You Owe It to You | Tom Brady Motivational Speech',
    description: 'Brady on accountability: the only person you truly owe greatness to.' },

  { id: '88_GYO22pTk', category: 'leadership',
    title: 'A Week in the Life of an NFL Player',
    description: 'What does a real NFL player week look like? Practice, recovery, prep.' }

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
  if (cat === 'cornerback')   return 'CORNERBACK';
  if (cat === 'flag-football') return 'FLAG FOOTBALL';
  if (cat === 'motivation')   return 'MOTIVATION';
  if (cat === 'leadership')   return 'LEADERSHIP';
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
  img.onerror = function() { this.src = '/football/thumb-fallback.svg'; };
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

  document.getElementById('count-all').textContent           = '(' + countFor('all') + ')';
  document.getElementById('count-cornerback').textContent    = '(' + countFor('cornerback') + ')';
  document.getElementById('count-flag-football').textContent  = '(' + countFor('flag-football') + ')';
  document.getElementById('count-motivation').textContent    = '(' + countFor('motivation') + ')';
  document.getElementById('count-leadership').textContent    = '(' + countFor('leadership') + ')';
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

// Close video modal — also stops the video
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
