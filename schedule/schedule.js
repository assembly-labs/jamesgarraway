// ================================
// SCHEDULE PAGE
// ================================

(function () {
  'use strict';

  const DATA_URL = '/schedule/data.json';
  const DAY_NAMES  = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const MONTH_NAMES = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
                       'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  let scheduleData = null;
  let weekOffset = parseInt(sessionStorage.getItem('scheduleWeekOffset') || '0', 10);

  // ---- Date helpers ----

  function getWeekStart(offset) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var daysToMon = (today.getDay() + 6) % 7; // 0=Mon, ..., 6=Sun
    var monday = new Date(today);
    monday.setDate(today.getDate() - daysToMon + offset * 7);
    return monday;
  }

  function toDateStr(date) {
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var dd = String(date.getDate()).padStart(2, '0');
    return date.getFullYear() + '-' + mm + '-' + dd;
  }

  function displayDate(date) {
    return MONTH_NAMES[date.getMonth()] + ' ' + date.getDate();
  }

  function formatTime(timeStr) {
    if (!timeStr) return '';
    var parts = timeStr.split(':');
    var h = parseInt(parts[0], 10);
    var m = parseInt(parts[1], 10);
    var period = h >= 12 ? 'PM' : 'AM';
    var hour = h % 12 || 12;
    return hour + ':' + String(m).padStart(2, '0') + ' ' + period;
  }

  // ---- Data helpers ----

  function getDayEvents(date) {
    var dateStr = toDateStr(date);
    var jsDay = date.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
    var events = [];

    scheduleData.recurring.forEach(function (r) {
      if (r.days.indexOf(jsDay) !== -1) {
        events.push({ type: 'recurring', id: r.id, emoji: r.emoji, name: r.name, time: r.time, notes: r.notes || '' });
      }
    });

    scheduleData.events.forEach(function (e) {
      if (e.date === dateStr) {
        events.push({ type: 'event', id: e.id, emoji: e.emoji, name: e.name, time: e.time, notes: e.notes || '' });
      }
    });

    scheduleData.assignments.forEach(function (a) {
      if (a.dueDate === dateStr) {
        events.push({ type: 'assignment', id: a.id, emoji: a.emoji, name: a.title, subject: a.subject, dueDate: a.dueDate, notes: a.notes || '' });
      }
    });

    return events;
  }

  function getDueSoon() {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var cutoff = new Date(today);
    cutoff.setDate(today.getDate() + 3);

    return scheduleData.assignments.filter(function (a) {
      var due = new Date(a.dueDate + 'T00:00:00');
      return due >= today && due <= cutoff;
    });
  }

  // ---- Render ----

  function renderDueSoon() {
    var strip = document.getElementById('due-soon-strip');
    var list  = document.getElementById('due-soon-list');
    if (!strip || !list) return;

    var assignments = getDueSoon();

    if (assignments.length === 0) {
      strip.style.display = 'none';
      return;
    }

    strip.style.display = '';
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    list.innerHTML = assignments.map(function (a) {
      var due = new Date(a.dueDate + 'T00:00:00');
      var diff = Math.round((due - today) / 86400000);
      var daysLabel = diff === 0 ? 'today' : diff === 1 ? 'tomorrow' : diff + ' days';
      var dueDay = DAY_NAMES[due.getDay()];
      return '<div class="due-soon-item" data-id="' + a.id + '">' +
        '<span class="due-soon-emoji">' + a.emoji + '</span>' +
        '<span class="due-soon-text">' + a.title + '</span>' +
        '<span class="due-soon-meta">due ' + dueDay + ' \u00B7 ' + daysLabel + '</span>' +
        '</div>';
    }).join('');

    list.querySelectorAll('.due-soon-item').forEach(function (el) {
      el.addEventListener('click', function () {
        var id = el.dataset.id;
        var a = scheduleData.assignments.find(function (x) { return x.id === id; });
        if (a) openModal(a, 'assignment');
      });
    });
  }

  function renderWeek() {
    var weekStart = getWeekStart(weekOffset);
    var weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    var label = document.getElementById('week-label');
    if (label) {
      label.textContent = displayDate(weekStart) + ' \u2013 ' + displayDate(weekEnd) + ', ' + weekEnd.getFullYear();
    }

    var grid = document.getElementById('schedule-grid');
    if (!grid) return;

    var today = new Date();
    today.setHours(0, 0, 0, 0);

    var html = '';
    for (var i = 0; i < 7; i++) {
      var date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      var isToday = date.getTime() === today.getTime();
      var dayName = DAY_NAMES[date.getDay()];
      var dayNum  = date.getDate();
      var dateStr = toDateStr(date);
      var events  = getDayEvents(date);

      html += '<div class="schedule-day' + (isToday ? ' today' : '') + '" data-date="' + dateStr + '">';
      html += '<div class="day-header">';
      html += '<span class="day-name">' + dayName + '</span>';
      html += '<span class="day-num">' + dayNum + '</span>';
      if (isToday) html += '<span class="today-badge">TODAY</span>';
      html += '</div>';
      html += '<div class="day-events">';

      if (events.length === 0) {
        html += '<div class="day-free">(free)</div>';
      } else {
        events.forEach(function (ev) {
          var sub = '';
          if (ev.type === 'assignment') {
            sub = 'due';
          } else if (ev.time) {
            sub = formatTime(ev.time);
          } else if (ev.notes) {
            sub = ev.notes;
          }
          html += '<div class="event-card" data-id="' + ev.id + '" data-type="' + ev.type + '">';
          html += '<span class="event-emoji">' + ev.emoji + '</span>';
          html += '<span class="event-name">'  + ev.name  + '</span>';
          if (sub) html += '<span class="event-time">' + sub + '</span>';
          html += '</div>';
        });
      }

      html += '</div></div>';
    }

    grid.innerHTML = html;

    grid.querySelectorAll('.event-card').forEach(function (card) {
      card.addEventListener('click', function () {
        var id   = card.dataset.id;
        var type = card.dataset.type;
        var item;
        if (type === 'recurring')   item = scheduleData.recurring.find(function (x) { return x.id === id; });
        else if (type === 'event')       item = scheduleData.events.find(function (x) { return x.id === id; });
        else if (type === 'assignment')  item = scheduleData.assignments.find(function (x) { return x.id === id; });
        if (item) openModal(item, type);
      });
    });
  }

  // ---- Modal ----

  function openModal(item, type) {
    var modal = document.getElementById('event-modal');
    var body  = document.getElementById('modal-body');
    if (!modal || !body) return;

    var name  = item.name || item.title || '';
    var html  = '<div class="modal-emoji">' + item.emoji + '</div>';
    html += '<div class="modal-name">' + name + '</div>';

    if (type === 'assignment') {
      var due = new Date(item.dueDate + 'T00:00:00');
      html += '<div class="modal-detail">Due: ' + DAY_NAMES[due.getDay()] + ', ' + displayDate(due) + '</div>';
      if (item.subject) html += '<div class="modal-detail">' + item.subject + '</div>';
    } else {
      if (item.time) html += '<div class="modal-detail">' + formatTime(item.time) + '</div>';
    }

    if (item.notes) html += '<div class="modal-notes">' + item.notes + '</div>';

    body.innerHTML = html;
    modal.classList.add('open');
  }

  function closeModal() {
    var modal = document.getElementById('event-modal');
    if (modal) modal.classList.remove('open');
  }

  // ---- Init ----

  function init() {
    fetch(DATA_URL)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        scheduleData = data;
        renderDueSoon();
        renderWeek();
      })
      .catch(function (err) {
        console.error('Failed to load schedule data:', err);
        var grid = document.getElementById('schedule-grid');
        if (grid) grid.innerHTML = '<div class="schedule-error">Could not load schedule. Try refreshing.</div>';
      });

    var btnPrev = document.getElementById('btn-prev');
    var btnNext = document.getElementById('btn-next');
    if (btnPrev) {
      btnPrev.addEventListener('click', function () {
        weekOffset--;
        sessionStorage.setItem('scheduleWeekOffset', weekOffset);
        renderWeek();
      });
    }
    if (btnNext) {
      btnNext.addEventListener('click', function () {
        weekOffset++;
        sessionStorage.setItem('scheduleWeekOffset', weekOffset);
        renderWeek();
      });
    }

    var backdrop = document.getElementById('modal-backdrop');
    var closeBtn = document.getElementById('modal-close');
    if (backdrop) backdrop.addEventListener('click', closeModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
