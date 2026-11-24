// Static site builder for rashadnazeer.lk — no dependencies.
// Run: node build.mjs  → writes the finished site to ./dist
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(ROOT, 'dist');
const SITE = 'https://rashadnazeer.lk';
const VERSION = Date.now().toString(36);

// ---------- helpers ----------
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const write = (rel, html) => { const f = path.join(OUT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, html); };
const copyDir = (src, dst) => {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name); const t = path.join(dst, e.name);
    if (e.isDirectory()) copyDir(s, t); else fs.copyFileSync(s, t);
  }
};
const slugify = (s) => String(s).toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const settings = JSON.parse(read('content/settings.json'));
const wa = String(settings.whatsapp || '').replace(/\D/g, '');
if (!/^\d{9,15}$/.test(wa)) console.warn('⚠  settings.whatsapp is not a valid number yet — WhatsApp buttons will not work until it is set.');

const fmtLKR = (n) => (n || n === 0) ? `LKR ${Number(n).toLocaleString('en-US')}` : 'Price on request';
const fmtShort = (n) => {
  if (!n && n !== 0) return 'Price on request';
  if (n >= 1e6) return `LKR ${(n / 1e6).toLocaleString('en-US', { maximumFractionDigits: 1 })} Mn`;
  return fmtLKR(n);
};
const toArr = (v) => Array.isArray(v) ? v.filter(Boolean).map((x) => (typeof x === 'object' && x ? (x.image || x.src || '') : x)).filter(Boolean) : (v ? [v] : []);

// tiny markdown → html (paragraphs, headings, lists, bold, italic, links)
const md = (src = '') => {
  const inline = (t) => esc(t)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*(?!\s)(.+?)\*/g, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]*)\)/g, '<a href="$2">$1</a>');
  const out = []; let list = null; let para = [];
  const flush = () => { if (para.length) { out.push(`<p>${inline(para.join(' '))}</p>`); para = []; } if (list) { out.push(`<ul>${list.map((li) => `<li>${inline(li)}</li>`).join('')}</ul>`); list = null; } };
  for (const raw of String(src).split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) { flush(); continue; }
    const h = line.match(/^(#{2,4})\s+(.*)$/);
    if (h) { flush(); const lvl = Math.min(h[1].length, 3); out.push(`<h${lvl}>${inline(h[2])}</h${lvl}>`); continue; }
    const li = line.match(/^[-*•]\s+(.*)$/);
    if (li) { if (para.length) { out.push(`<p>${inline(para.join(' '))}</p>`); para = []; } (list ||= []).push(li[1]); continue; }
    if (list) flush();
    para.push(line);
  }
  flush();
  return out.join('\n');
};
const plain = (s = '', n = 155) => { const t = String(s).replace(/[#*_\[\]()>-]/g, ' ').replace(/\s+/g, ' ').trim(); return t.length > n ? `${t.slice(0, n - 1).replace(/\s+\S*$/, '')}…` : t; };

// icons (stroke, 24px)
const P = {
  chart: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 6-6"/>',
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><path d="m6.3 6.3 2.1 2.1M15.6 15.6l2.1 2.1M6.3 17.7l2.1-2.1M15.6 8.4l2.1-2.1"/>',
  pin: '<path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  camera: '<path d="M4 7h3l2-3h6l2 3h3v13H4z"/><circle cx="12" cy="13" r="4"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  shield: '<path d="M12 3 4 6v6c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  video: '<path d="m22 8-6 4 6 4V8z"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a5.5 5.5 0 0 1 3.5 6"/>',
  briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',
  book: '<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 21.5V4.5"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  map: '<path d="m9 4-6 2v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
};
const icon = (n, cls = '') => `<svg${cls ? ` class="${cls}"` : ''} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || ''}</svg>`;
const waIcon = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.41"/></svg>';

const NAV = [
  ['marketing', '/marketing', 'Performance Marketing'],
  ['real-estate', '/real-estate', 'Real Estate'],
  ['ai-academy', '/ai-academy', 'AI Academy'],
];

// ---------- listings ----------
const LISTINGS_DIR = path.join(ROOT, 'content/listings');
const listings = (fs.existsSync(LISTINGS_DIR) ? fs.readdirSync(LISTINGS_DIR) : [])
  .filter((f) => f.endsWith('.json'))
  .map((f) => {
    const data = JSON.parse(fs.readFileSync(path.join(LISTINGS_DIR, f), 'utf8'));
    const slug = slugify(data.slug || f.replace(/\.json$/, ''));
    return { ...data, slug, url: `/listings/${slug}`, photos: toArr(data.photos), highlights: toArr(data.highlights) };
  })
  .filter((l) => l.published !== false && l.title)
  .sort((a, b) => (Number(!!b.featured) - Number(!!a.featured)) || String(b.date || '').localeCompare(String(a.date || '')));

const listingCard = (l, i = 0) => {
  const cover = l.photos[0];
  const facts = [l.land_size && `Land: ${esc(l.land_size)}`, l.floor_area && `Floor: ${esc(l.floor_area)}`, l.bedrooms && `${esc(l.bedrooms)} bed`, l.bathrooms && `${esc(l.bathrooms)} bath`].filter(Boolean);
  const sold = /sold/i.test(l.status || '');
  return `<a class="listing-card reveal" style="--d:${(i % 3) * 0.08}s" href="${l.url}" data-type="${esc(l.type || '')}" data-status="${esc(l.status || '')}">
  <div class="media">${cover ? `<img src="${esc(cover)}" alt="${esc(l.title)}" loading="lazy" decoding="async" width="800" height="600">` : `<div class="placeholder-media">${icon('home')}</div>`}
    ${l.status ? `<span class="status${sold ? ' sold' : ''}">${esc(l.status)}</span>` : ''}
    ${l.photos.length > 1 ? `<span class="count">${icon('camera')} ${l.photos.length}</span>` : ''}
  </div>
  <div class="body">
    ${l.type ? `<span class="type">${esc(l.type)}</span>` : ''}
    <h3>${esc(l.title)}</h3>
    ${l.location ? `<span class="loc">${icon('pin')} ${esc(l.location)}</span>` : ''}
    <span class="price">${fmtShort(l.price)}</span>
    ${facts.length ? `<div class="facts">${facts.map((f) => `<span>${f}</span>`).join('')}</div>` : ''}
  </div>
</a>`;
};

// ---------- webinar date ----------
const webinar = (() => {
  const raw = settings.webinar_datetime;
  const dt = raw ? new Date(raw) : null;
  if (!dt || isNaN(dt) || dt < new Date(Date.now() - 864e5)) return { set: false, label: 'Next date announced soon', time: 'Join the list and I\'ll message you', iso: '' };
  const f = (tz, o) => new Intl.DateTimeFormat('en-GB', { timeZone: tz, ...o }).format(dt);
  return {
    set: true, iso: dt.toISOString(),
    label: f('Asia/Colombo', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }),
    time: `${f('Asia/Colombo', { hour: 'numeric', minute: '2-digit', hour12: true })} Sri Lanka · ${f('Asia/Dubai', { hour: 'numeric', minute: '2-digit', hour12: true })} UAE · ${f('Asia/Riyadh', { hour: 'numeric', minute: '2-digit', hour12: true })} Qatar/KSA`,
  };
})();

// ---------- schema ----------
const sameAs = [settings.linkedin, settings.upwork, settings.instagram, settings.facebook].filter((u) => /^https?:\/\//.test(u || ''));
const PERSON = {
  '@type': 'Person', '@id': `${SITE}/#rashad`, name: 'Rashad Nazeer', url: `${SITE}/`,
  image: `${SITE}/images/brand/rashad-portrait-800.webp`,
  jobTitle: 'Retail Media Manager, Property Consultant and AI Trainer',
  address: { '@type': 'PostalAddress', addressLocality: 'Kandy', addressCountry: 'LK' },
  knowsAbout: ['Retail media', 'Walmart Connect', 'Instacart Ads', 'Amazon Ads', 'Roundel', 'Sri Lanka real estate', 'Artificial intelligence training'],
  ...(sameAs.length ? { sameAs } : {}),
};
const ld = (obj) => `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', ...obj }).replace(/</g, '\\u003c')}</script>`;
const crumbsLd = (items) => ld({ '@type': 'BreadcrumbList', itemListElement: items.map(([name, url], i) => ({ '@type': 'ListItem', position: i + 1, name, item: `${SITE}${url}` })) });

// ---------- layout ----------
const header = (active) => `<header class="site-header">
  <nav class="nav" aria-label="Main">
    <a class="brand" href="/" aria-label="Rashad Nazeer — home"><span class="brand-mark" aria-hidden="true">RN</span><span class="brand-name">Rashad Nazeer</span></a>
    <button class="menu-btn" type="button" aria-label="Menu" aria-expanded="false" aria-controls="nav-links"><span></span></button>
    <div class="nav-links" id="nav-links">
      ${NAV.map(([k, href, label]) => `<a href="${href}"${k === active ? ' aria-current="page"' : ''}>${label}</a>`).join('\n      ')}
      <a class="btn btn-primary btn-sm" data-wa="Hi Rashad, I found you on rashadnazeer.lk" href="#contact">Let's talk</a>
    </div>
  </nav>
</header>`;

const footer = () => `<footer class="site-footer" id="contact">
  <div class="footer-grid">
    <div class="footer-brand">
      <a class="brand" href="/"><span class="brand-mark" aria-hidden="true">RN</span><span class="brand-name">Rashad Nazeer</span></a>
      <p>Retail media for US brands, Sri Lankan property for families abroad, and practical AI training. Based in Kandy, Sri Lanka.</p>
    </div>
    <div><h4>Explore</h4><ul>${NAV.map(([, h, l]) => `<li><a href="${h}">${l}</a></li>`).join('')}<li><a href="/real-estate#listings">Properties for sale</a></li></ul></div>
    <div><h4>Contact</h4><ul>
      <li><a data-wa="Hi Rashad, I found you on rashadnazeer.lk" href="#">WhatsApp</a></li>
      ${settings.email ? `<li><a href="mailto:${esc(settings.email)}">${esc(settings.email)}</a></li>` : ''}
      <li>Kandy, Sri Lanka</li></ul></div>
    <div><h4>Elsewhere</h4><ul>
      ${settings.linkedin ? `<li><a href="${esc(settings.linkedin)}" rel="me noopener" target="_blank">LinkedIn</a></li>` : '<li>LinkedIn</li>'}
      ${settings.upwork ? `<li><a href="${esc(settings.upwork)}" rel="me noopener" target="_blank">Upwork</a></li>` : ''}
      ${settings.instagram ? `<li><a href="${esc(settings.instagram)}" rel="me noopener" target="_blank">Instagram</a></li>` : ''}
      ${settings.facebook ? `<li><a href="${esc(settings.facebook)}" rel="me noopener" target="_blank">Facebook</a></li>` : ''}
    </ul></div>
  </div>
  <div class="footer-bottom"><div class="wrap"><span>© <span data-year>${new Date().getFullYear()}</span> Rashad Nazeer · rashadnazeer.lk</span><span>Made in Kandy</span></div></div>
</footer>
<a class="wa-float" data-wa="Hi Rashad, I found you on rashadnazeer.lk" href="#" aria-label="Chat on WhatsApp">${waIcon}</a>`;

const layout = ({ title, description, path: p, active = '', image = '/images/brand/og-default.jpg', imageAlt = 'Rashad Nazeer', schema = '', body, noindex = false, type = 'website' }) => {
  const url = `${SITE}${p === '/' ? '/' : p}`;
  const img = image.startsWith('http') ? image : `${SITE}${image}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url}">`}
<meta name="author" content="Rashad Nazeer">
<meta name="theme-color" content="#0B5D45">
<meta property="og:type" content="${type}">
<meta property="og:site_name" content="Rashad Nazeer">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${esc(img)}">
<meta property="og:image:alt" content="${esc(imageAlt)}">
<meta property="og:locale" content="en_GB">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(img)}">
<link rel="icon" href="/images/brand/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/images/brand/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/images/brand/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/styles.css?v=${VERSION}">
${schema}
</head>
<body data-wa="${esc(wa)}">
<a class="skip" href="#main">Skip to content</a>
${header(active)}
<main id="main">
${body}
</main>
${footer()}
<script src="/main.js?v=${VERSION}" defer></script>
</body>
</html>
`;
};

// ---------- build ----------
fs.rmSync(OUT, { recursive: true, force: true });
copyDir(path.join(ROOT, 'public'), OUT);

const ctx = { SITE, settings, wa, listings, webinar, esc, icon, waIcon, md, fmtLKR, fmtShort, listingCard, ld, crumbsLd, PERSON };
const pagesDir = path.join(ROOT, 'src/pages');
const sitemap = [];
for (const f of fs.readdirSync(pagesDir).filter((x) => x.endsWith('.mjs')).sort()) {
  const mod = await import(pathToFileURL(path.join(pagesDir, f)).href);
  const page = mod.default(ctx);
  const name = f.replace(/\.mjs$/, '');
  write(name === 'index' ? 'index.html' : `${name}.html`, layout(page));
  if (!page.noindex) sitemap.push({ loc: page.path, priority: name === 'index' ? '1.0' : '0.8' });
}

// listing pages
const { default: listingPage } = await import(pathToFileURL(path.join(ROOT, 'src/listing.mjs')).href);
for (const l of listings) {
  write(`listings/${l.slug}.html`, layout(listingPage(ctx, l)));
  sitemap.push({ loc: l.url, priority: '0.7', lastmod: l.date });
}

// sitemap + robots + manifest
const today = new Date().toISOString().slice(0, 10);
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemap.map((u) => `  <url><loc>${SITE}${u.loc === '/' ? '/' : u.loc}</loc><lastmod>${(u.lastmod || today).slice(0, 10)}</lastmod><priority>${u.priority}</priority></url>`).join('\n')}
</urlset>
`);
write('robots.txt', `User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: ${SITE}/sitemap.xml\n`);
write('site.webmanifest', JSON.stringify({ name: 'Rashad Nazeer', short_name: 'Rashad', start_url: '/', display: 'standalone', background_color: '#FFFFFF', theme_color: '#0B5D45', icons: [{ src: '/images/brand/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/images/brand/icon-512.png', sizes: '512x512', type: 'image/png' }] }, null, 2));

console.log(`✓ Built ${sitemap.length} pages (${listings.length} listings) → dist/`);
