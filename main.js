// ---- Site settings: edit these ----
const SITE = {
  whatsapp: '94XXXXXXXXX', // your WhatsApp number, country code first, no + or spaces
};

// Point every WhatsApp link at your number
document.querySelectorAll('a[data-wa]').forEach((a) => {
  const text = a.getAttribute('data-wa');
  a.href = `https://wa.me/${SITE.whatsapp}` + (text ? `?text=${encodeURIComponent(text)}` : '');
  a.target = '_blank';
  a.rel = 'noopener';
});

// Lead forms: send the answers to your WhatsApp as a ready-to-send message
document.querySelectorAll('form[data-lead]').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const lines = [form.getAttribute('data-lead')];
    form.querySelectorAll('input, select').forEach((el) => {
      const label = el.closest('label')?.firstChild?.textContent.trim() || el.name;
      if (el.value) lines.push(`${label}: ${el.value}`);
    });
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
    form.parentElement.classList.add('sent');
  });
});
document.querySelectorAll('[data-reset]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.sent');
    card.querySelector('form').reset();
    card.classList.remove('sent');
  });
});

// Syllabus accordion
document.querySelectorAll('.acc-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.acc-btn').forEach((b) => {
      b.setAttribute('aria-expanded', 'false');
      document.getElementById(b.getAttribute('aria-controls')).hidden = true;
    });
    if (!open) {
      btn.setAttribute('aria-expanded', 'true');
      document.getElementById(btn.getAttribute('aria-controls')).hidden = false;
    }
  });
});

// Footer year
document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
