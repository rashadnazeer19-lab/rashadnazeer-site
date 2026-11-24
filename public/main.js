// rashadnazeer.lk — interactions
(() => {
  const d = document;
  d.documentElement.classList.add('js');
  const WA = d.body.dataset.wa || '';
  const waUrl = (text) => `https://wa.me/${WA}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // WhatsApp links
  d.querySelectorAll('[data-wa]').forEach((a) => {
    a.href = waUrl(a.getAttribute('data-wa'));
    a.target = '_blank';
    a.rel = 'noopener';
  });

  // Header shadow + mobile menu
  const header = d.querySelector('.site-header');
  const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  const menuBtn = d.querySelector('.menu-btn');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      const open = d.body.classList.toggle('menu-open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    d.querySelectorAll('.nav-links a').forEach((a) => a.addEventListener('click', () => {
      d.body.classList.remove('menu-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }));
  }

  // Scroll reveal
  const reveals = d.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  // Rotating words
  d.querySelectorAll('[data-rotate]').forEach((el) => {
    const words = JSON.parse(el.getAttribute('data-rotate'));
    const span = el.querySelector('.word');
    if (!span || reduce || words.length < 2) return;
    let i = 0;
    setInterval(() => {
      span.classList.add('out');
      setTimeout(() => { i = (i + 1) % words.length; span.textContent = words[i]; span.classList.remove('out'); }, 450);
    }, 2800);
  });

  // Count-up numbers
  const counters = d.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target; const end = +el.dataset.count; co.unobserve(el);
        if (reduce) { el.textContent = end; return; }
        const t0 = performance.now();
        const step = (t) => { const p = Math.min(1, (t - t0) / 1400); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    counters.forEach((c) => co.observe(c));
  }

  // Lead forms -> WhatsApp
  d.querySelectorAll('form[data-lead]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const lines = [form.getAttribute('data-lead')];
      form.querySelectorAll('input, select, textarea').forEach((el) => {
        const label = el.closest('label')?.firstChild?.textContent.trim() || el.name;
        if (el.value) lines.push(`${label}: ${el.value}`);
      });
      window.open(waUrl(lines.join('\n')), '_blank', 'noopener');
      form.parentElement.classList.add('sent');
    });
  });
  d.querySelectorAll('[data-reset]').forEach((btn) => btn.addEventListener('click', () => {
    const card = btn.closest('.sent');
    card.querySelector('form').reset();
    card.classList.remove('sent');
  }));

  // Listing filters
  const filterBar = d.querySelector('[data-filters]');
  if (filterBar) {
    const cards = d.querySelectorAll('[data-type]');
    const empty = d.querySelector('.empty');
    filterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter'); if (!btn) return;
      filterBar.querySelectorAll('.filter').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      const f = btn.dataset.filter; let shown = 0;
      cards.forEach((c) => { const ok = f === 'all' || c.dataset.type === f || c.dataset.status === f; c.hidden = !ok; if (ok) shown++; });
      if (empty) empty.classList.toggle('show', shown === 0);
    });
  }

  // Gallery lightbox
  const gallery = d.querySelector('[data-gallery]');
  if (gallery) {
    const srcs = JSON.parse(gallery.getAttribute('data-gallery'));
    const alt = gallery.getAttribute('data-alt') || '';
    const lb = d.createElement('div');
    lb.className = 'lightbox'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Photo viewer');
    const icon = (p) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
    lb.innerHTML = `<img alt=""><button class="lb-close" aria-label="Close">${icon('<path d="M18 6 6 18M6 6l12 12"/>')}</button><button class="lb-prev" aria-label="Previous photo">${icon('<path d="m15 18-6-6 6-6"/>')}</button><button class="lb-next" aria-label="Next photo">${icon('<path d="m9 18 6-6-6-6"/>')}</button><div class="lb-count"></div>`;
    d.body.appendChild(lb);
    const img = lb.querySelector('img'); const count = lb.querySelector('.lb-count');
    let i = 0; let last = null;
    const show = (n) => { i = (n + srcs.length) % srcs.length; img.src = srcs[i]; img.alt = `${alt} — photo ${i + 1}`; count.textContent = `${i + 1} / ${srcs.length}`; };
    const open = (n) => { last = d.activeElement; show(n); lb.classList.add('open'); d.body.style.overflow = 'hidden'; lb.querySelector('.lb-close').focus(); };
    const close = () => { lb.classList.remove('open'); d.body.style.overflow = ''; if (last) last.focus(); };
    gallery.querySelectorAll('button[data-i]').forEach((b) => b.addEventListener('click', () => open(+b.dataset.i)));
    d.querySelectorAll('[data-open-gallery]').forEach((b) => b.addEventListener('click', () => open(0)));
    lb.querySelector('.lb-close').addEventListener('click', close);
    lb.querySelector('.lb-prev').addEventListener('click', () => show(i - 1));
    lb.querySelector('.lb-next').addEventListener('click', () => show(i + 1));
    lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
    d.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(i - 1);
      if (e.key === 'ArrowRight') show(i + 1);
    });
    let x0 = null;
    lb.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', (e) => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) show(i + (dx < 0 ? 1 : -1)); x0 = null; });
  }

  // Share listing
  d.querySelectorAll('[data-share]').forEach((btn) => btn.addEventListener('click', async () => {
    const data = { title: d.title, url: location.href };
    if (navigator.share) { try { await navigator.share(data); } catch (_) { /* cancelled */ } return; }
    window.open(`https://wa.me/?text=${encodeURIComponent(`${d.title} ${location.href}`)}`, '_blank', 'noopener');
  }));

  d.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
