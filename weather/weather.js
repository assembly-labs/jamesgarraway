(function () {
  'use strict';

  var LOCATIONS = {
    wayne:  { name: 'Wayne, PA',         lat: 40.0440,  lon: -75.3897  },
    philly: { name: 'Philadelphia',      lat: 39.9526,  lon: -75.1652  },
    la:     { name: 'Los Angeles',       lat: 34.0522,  lon: -118.2437 },
    sp:     { name: 'Stevens Point, WI', lat: 44.5236,  lon: -89.5746  }
  };

  var LOADING_PHRASES = {
    wayne:  'Scanning Wayne skies...',
    philly: 'Checking Philly weather...',
    la:     'Checking LA vibes...',
    sp:     'Scanning Stevens Point...'
  };

  // Activities by JS day-of-week (0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat)
  var ACTIVITIES = {
    0: 'Flag Football',
    1: 'Jiu Jitsu',
    3: 'Jiu Jitsu',
    6: 'Flag Football'
  };

  var DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  var currentKey = 'wayne';

  function wmoInfo(code) {
    if (code === 0)  return { label: 'Clear',         emoji: '\u2600\uFE0F',       isRain: false, isSnow: false };
    if (code <= 3)   return { label: 'Partly Cloudy', emoji: '\u26C5',             isRain: false, isSnow: false };
    if (code <= 48)  return { label: 'Foggy',         emoji: '\uD83C\uDF2B\uFE0F', isRain: false, isSnow: false };
    if (code <= 55)  return { label: 'Drizzle',       emoji: '\uD83C\uDF26\uFE0F', isRain: true,  isSnow: false };
    if (code <= 65)  return { label: 'Rain',          emoji: '\uD83C\uDF27\uFE0F', isRain: true,  isSnow: false };
    if (code <= 77)  return { label: 'Snow',          emoji: '\u2744\uFE0F',       isRain: false, isSnow: true  };
    if (code <= 82)  return { label: 'Rain Showers',  emoji: '\uD83C\uDF27\uFE0F', isRain: true,  isSnow: false };
    if (code <= 86)  return { label: 'Snow Showers',  emoji: '\uD83C\uDF28\uFE0F', isRain: false, isSnow: true  };
    return             { label: 'Thunderstorm',       emoji: '\u26C8\uFE0F',       isRain: true,  isSnow: false };
  }

  function getOutfit(tempF, isRain, isSnow) {
    var outfit;
    if (tempF < 32)       outfit = '🧤 Heavy coat, gloves, and hat.';
    else if (tempF <= 45) outfit = '🧥 Coat and layers.';
    else if (tempF <= 60) outfit = '🏃 Hoodie or light jacket.';
    else if (tempF <= 75) outfit = '👕 T-shirt. Maybe bring a hoodie just in case.';
    else                  outfit = '🩳 Shorts and t-shirt.';
    if (isRain) outfit += ' ☔ Rain jacket or umbrella.';
    if (isSnow) outfit += ' 🥾 Snow boots.';
    return outfit;
  }

  function buildNowHTML(data) {
    var cur    = data.current;
    var info   = wmoInfo(cur.weathercode);
    var temp   = Math.round(cur.temperature_2m);
    var feels  = Math.round(cur.apparent_temperature);
    var outfit = getOutfit(temp, info.isRain, info.isSnow);
    var locName = LOCATIONS[currentKey].name;

    return '<div class="weather-now">'
      + '<div class="weather-location">' + locName + '</div>'
      + '<div class="weather-icon">'     + info.emoji + '</div>'
      + '<div class="weather-temp">'     + temp + '\u00B0F</div>'
      + '<div class="weather-condition">' + info.label + '</div>'
      + '<div class="weather-feels">Feels like ' + feels + '\u00B0F</div>'
      + '<div class="outfit-box">'
      +   '<div class="outfit-label">What to wear</div>'
      +   outfit
      + '</div>'
      + '</div>';
  }

  function buildForecastHTML(data) {
    var daily = data.daily;
    var days  = daily.time.slice(0, 5);

    var cards = days.map(function (dateStr, i) {
      var date     = new Date(dateStr + 'T12:00:00');
      var dow      = date.getDay();
      var dayName  = (i === 0) ? 'Today' : DAY_NAMES[dow];
      var info     = wmoInfo(daily.weathercode[i]);
      var high     = Math.round(daily.temperature_2m_max[i]);
      var low      = Math.round(daily.temperature_2m_min[i]);
      var activity = ACTIVITIES[dow] || null;
      var outfit   = getOutfit(high, info.isRain, info.isSnow);

      var badgeHTML = activity
        ? '<div class="activity-badge">' + activity + '</div>'
        : '';

      return '<div class="forecast-day' + (activity ? ' has-activity' : '') + '"'
        + ' role="button" tabindex="0" aria-expanded="false">'
        + '<div class="forecast-day-name">'  + dayName + '</div>'
        + '<div class="forecast-day-icon">'  + info.emoji + '</div>'
        + '<div class="forecast-temps">'
        +   '<span class="forecast-high">'   + high + '\u00B0</span>'
        +   '<span class="forecast-low"> / ' + low  + '\u00B0</span>'
        + '</div>'
        + badgeHTML
        + '<div class="forecast-outfit-tip" hidden>' + outfit + '</div>'
        + '</div>';
    }).join('');

    return '<p class="forecast-hint">Tap a day for outfit tips</p>'
      + '<div class="forecast-strip">' + cards + '</div>';
  }

  function initForecastTaps() {
    var container = document.getElementById('weather-forecast-content');

    container.addEventListener('click', function (e) {
      var card = e.target.closest('.forecast-day');
      if (!card) return;
      var isOpen = card.getAttribute('aria-expanded') === 'true';

      // Close all cards first
      container.querySelectorAll('.forecast-day').forEach(function (c) {
        c.setAttribute('aria-expanded', 'false');
        var tip = c.querySelector('.forecast-outfit-tip');
        if (tip) tip.hidden = true;
      });

      // Open the tapped card if it was closed
      if (!isOpen) {
        card.setAttribute('aria-expanded', 'true');
        var tip = card.querySelector('.forecast-outfit-tip');
        if (tip) tip.hidden = false;
      }
    });

    container.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        var card = e.target.closest('.forecast-day');
        if (card) {
          e.preventDefault();
          card.click();
        }
      }
    });
  }

  function setLoading() {
    var phrase = LOADING_PHRASES[currentKey] || 'Loading weather...';
    document.getElementById('weather-now-content').innerHTML =
      '<div class="weather-loading">' + phrase + '</div>';
    document.getElementById('weather-forecast-content').innerHTML =
      '<div class="weather-loading">Loading forecast...</div>';
  }

  function setError() {
    document.getElementById('weather-now-content').innerHTML =
      '<div class="weather-error">'
      + 'Weather unavailable. Check your connection.'
      + '<button class="retry-btn" id="weatherRetryBtn">Try again</button>'
      + '</div>';
    document.getElementById('weather-forecast-content').innerHTML =
      '<div class="weather-error">Forecast unavailable.</div>';

    var btn = document.getElementById('weatherRetryBtn');
    if (btn) {
      btn.addEventListener('click', function () {
        fetchWeather(currentKey);
      });
    }
  }

  function fetchWeather(key) {
    var loc = LOCATIONS[key];
    var url = 'https://api.open-meteo.com/v1/forecast'
      + '?latitude='   + loc.lat
      + '&longitude='  + loc.lon
      + '&current=temperature_2m,apparent_temperature,weathercode,precipitation'
      + '&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum'
      + '&temperature_unit=fahrenheit'
      + '&timezone=auto'
      + '&forecast_days=5';

    setLoading();

    fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (data) {
        document.getElementById('weather-now-content').innerHTML      = buildNowHTML(data);
        document.getElementById('weather-forecast-content').innerHTML = buildForecastHTML(data);
        initForecastTaps();
      })
      .catch(function () {
        setError();
      });
  }

  function init() {
    document.querySelectorAll('.loc-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.loc-btn').forEach(function (b) {
          b.classList.remove('active');
        });
        btn.classList.add('active');
        currentKey = btn.getAttribute('data-key');
        fetchWeather(currentKey);
      });
    });

    fetchWeather(currentKey);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
