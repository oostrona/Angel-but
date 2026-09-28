(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // ---------- sample book: tabs swap one card in place ----------
  const tabs = Array.from(document.querySelectorAll('.tab[role="tab"]'));
  // the spine is vertical beside the card on wide screens and a horizontal strip on narrow ones
  const spine = document.querySelector('.spine[role="tablist"]');
  const wide = window.matchMedia('(min-width: 1024px)');
  const syncOrientation = () => spine && spine.setAttribute('aria-orientation', wide.matches ? 'vertical' : 'horizontal');
  syncOrientation();
  wide.addEventListener('change', syncOrientation);
  const cards = new Map(Array.from(document.querySelectorAll('.card[role="tabpanel"]')).map((c) => [c.dataset.trade, c]));
  let current = tabs.find((t) => t.getAttribute('aria-selected') === 'true') || tabs[0];

  function show(tab, { animate = true, focus = false, updateHash = true } = {}) {
    if (!tab || tab === current) { if (focus && tab) tab.focus(); return; }
    const prevCard = cards.get(current.dataset.trade);
    const nextCard = cards.get(tab.dataset.trade);

    current.setAttribute('aria-selected', 'false');
    current.tabIndex = -1;
    tab.setAttribute('aria-selected', 'true');
    tab.tabIndex = 0;
    current = tab;
    if (focus) tab.focus();

    prevCard.classList.remove('is-active');
    nextCard.classList.add('is-active');

    if (animate && !reduceMotion.matches && nextCard.animate) {
      // a new sample card is laid over the old one, sliding in from the spine side
      prevCard.classList.add('is-leaving');
      const a = nextCard.animate(
        [
          { transform: 'translateX(-18px)', clipPath: 'inset(0 100% 0 0)' },
          { transform: 'translateX(0)', clipPath: 'inset(0 0 0 0)' },
        ],
        { duration: 260, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' },
      );
      const done = () => prevCard.classList.remove('is-leaving');
      a.onfinish = done;
      a.oncancel = done;
    }

    if (updateHash) history.replaceState(null, '', `#card-${tab.dataset.trade}`);
    // on narrow screens keep the chosen tab visible in the scrolling strip
    tab.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: animate && !reduceMotion.matches ? 'smooth' : 'auto' });
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      // event.detail is 0 for keyboard-activated clicks: keyboard switches instantly
      show(tab, { animate: e.detail !== 0 });
    });
    tab.addEventListener('keydown', (e) => {
      const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
      let next = null;
      if (e.key in keys) next = tabs[(i + keys[e.key] + tabs.length) % tabs.length];
      else if (e.key === 'Home') next = tabs[0];
      else if (e.key === 'End') next = tabs[tabs.length - 1];
      if (!next) return;
      e.preventDefault();
      show(next, { animate: false, focus: true });
    });
  });

  // open the trade named in the address (e.g. #card-buty), without animation
  const fromHash = () => {
    const id = decodeURIComponent(location.hash.replace('#card-', ''));
    const tab = tabs.find((t) => t.dataset.trade === id);
    if (tab) show(tab, { animate: false, updateHash: false });
  };
  fromHash();
  window.addEventListener('hashchange', fromHash);

  // ---------- opening hours: live status in Europe/Warsaw time ----------
  // Mon-Fri 9:00-17:00, weekends closed (Google Maps, 2026-09). 1 = Monday ... 7 = Sunday.
  const HOURS = { 1: [9, 17], 2: [9, 17], 3: [9, 17], 4: [9, 17], 5: [9, 17], 6: null, 7: null };
  const WEEKDAYS = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7 };
  const statusEl = document.querySelector('[data-status]');
  const statusText = document.querySelector('[data-status-text]');
  const i18nEl = document.getElementById('status-i18n');
  const L = i18nEl ? JSON.parse(i18nEl.textContent) : null;
  const hourRows = document.querySelectorAll('[data-hours] tr[data-days]');

  function warsawNow() {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Warsaw', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
    }).formatToParts(new Date());
    const get = (type) => parts.find((p) => p.type === type).value;
    return { day: WEEKDAYS[get('weekday')], minutes: Number(get('hour')) * 60 + Number(get('minute')) };
  }

  function renderStatus() {
    const { day, minutes } = warsawNow();
    const today = HOURS[day];
    let state = 'closed';
    let text = L ? L.default : '';
    if (today && minutes >= today[0] * 60 && minutes < today[1] * 60) {
      state = 'open';
      if (L) text = L.open.replace('{close}', today[1]);
    } else if (L) {
      let when = null;
      let open = null;
      if (today && minutes < today[0] * 60) { when = L.today; open = today[0]; }
      else {
        for (let k = 1; k <= 7; k++) {
          const d = ((day - 1 + k) % 7) + 1;
          if (HOURS[d]) { when = k === 1 ? L.tomorrow : L.days[d]; open = HOURS[d][0]; break; }
        }
      }
      if (when) text = L.closed.replace('{when}', when).replace('{open}', open);
    }
    if (statusEl && statusText) {
      statusEl.dataset.state = state;
      statusText.textContent = text;
    }
    hourRows.forEach((row) => row.classList.toggle('is-today', row.dataset.days.split(' ').includes(String(day))));
  }
  renderStatus();
  setInterval(renderStatus, 60 * 1000);

  // ---------- mobile action bar: appears once the first call/photo buttons scroll away ----------
  const bar = document.querySelector('[data-callbar]');
  const heroActions = document.querySelector('.actions-hero');
  if (bar && heroActions && 'IntersectionObserver' in window) {
    const links = bar.querySelectorAll('a');
    new IntersectionObserver(([entry]) => {
      const visible = !entry.isIntersecting && entry.boundingClientRect.top < 0;
      bar.classList.toggle('is-visible', visible);
      bar.setAttribute('aria-hidden', String(!visible));
      links.forEach((a) => { a.tabIndex = visible ? 0 : -1; });
    }).observe(heroActions);
  }

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
