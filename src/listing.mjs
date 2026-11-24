// Template for one property listing page: /listings/<slug>
export default ({ SITE, listings, listingCard, icon, waIcon, md, fmtLKR, ld, crumbsLd, esc }, l) => {
  const photos = l.photos;
  const url = `${SITE}${l.url}`;
  const n = Math.min(photos.length, 5);
  const sold = /sold/i.test(l.status || '');
  const facts = [
    ['Type', l.type], ['Status', l.status], ['Land', l.land_size], ['Floor area', l.floor_area],
    ['Bedrooms', l.bedrooms], ['Bathrooms', l.bathrooms], ['District', l.district],
  ].filter(([, v]) => v || v === 0);
  const ask = `Hi Rashad, I'm interested in "${l.title}" (${url})`;
  const view = `Hi Rashad, I'd like a video viewing of "${l.title}" (${url})`;
  const others = listings.filter((x) => x.slug !== l.slug).slice(0, 3);
  const desc = l.summary || `${l.type ? `${l.type} ` : ''}${l.status ? `${l.status.toLowerCase()} ` : ''}in ${l.location || 'Sri Lanka'}. ${l.price ? fmtLKR(l.price) + '. ' : ''}Video viewings for buyers in the Gulf.`;
  const mapLink = /^https?:\/\//.test(l.map_url || '') ? l.map_url : '';
  const video = /^https?:\/\//.test(l.video_url || '') ? l.video_url : '';

  const schema = ld({
    '@type': 'RealEstateListing', name: l.title, url, description: desc,
    ...(l.date ? { datePosted: String(l.date).slice(0, 10) } : {}),
    ...(photos.length ? { image: photos.map((p) => `${SITE}${p}`) } : {}),
    contentLocation: { '@type': 'Place', name: l.location || 'Sri Lanka', address: { '@type': 'PostalAddress', addressLocality: l.location || '', addressRegion: l.district || '', addressCountry: 'LK' } },
    ...(l.price ? { offers: { '@type': 'Offer', price: l.price, priceCurrency: 'LKR', availability: sold ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock', seller: { '@id': `${SITE}/#rashad` } } } : {}),
  }) + crumbsLd([['Home', '/'], ['Real Estate', '/real-estate'], [l.title, l.url]]);

  const gallery = photos.length ? `<div class="gallery n${n} reveal" data-gallery='${esc(JSON.stringify(photos))}' data-alt="${esc(l.title)}">
    ${photos.slice(0, 5).map((p, i) => `<button type="button" data-i="${i}" aria-label="Open photo ${i + 1} of ${photos.length}"><img src="${esc(p)}" alt="${esc(l.title)} — photo ${i + 1}" ${i ? 'loading="lazy"' : 'fetchpriority="high"'} decoding="async">${i === 4 && photos.length > 5 ? `<span class="more-photos">+${photos.length - 5} photos</span>` : ''}</button>`).join('')}
  </div>` : `<div class="gallery n1"><div class="placeholder-media" style="border-radius:24px">${icon('home')}</div></div>`;

  return {
    title: `${l.title}${l.price ? ` — ${fmtLKR(l.price)}` : ''} | Rashad Nazeer`,
    description: desc.slice(0, 160),
    path: l.url,
    active: 'real-estate',
    type: 'article',
    image: photos[0] || '/images/brand/og-default.jpg',
    imageAlt: l.title,
    schema,
    body: `
<section class="section" style="padding-top:48px">
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/real-estate#listings">Real Estate</a> / ${esc(l.title)}</nav>
    <div class="detail-head">
      <div>
        <span class="pill">${esc([l.type, l.status].filter(Boolean).join(' · '))}</span>
        <h1 class="h1" style="font-size:clamp(32px,4.4vw,52px);max-width:860px">${esc(l.title)}</h1>
        ${l.location ? `<p class="loc">${icon('pin')} ${esc(l.location)}</p>` : ''}
      </div>
      <div class="btns">
        ${photos.length > 1 ? `<button class="btn btn-outline btn-sm" type="button" data-open-gallery>${icon('camera')} ${photos.length} photos</button>` : ''}
        <button class="btn btn-outline btn-sm" type="button" data-share>${icon('share')} Share</button>
      </div>
    </div>
    ${gallery}
    <div class="detail">
      <div>
        ${facts.length ? `<div class="keyfacts">${facts.map(([k, v]) => `<div class="keyfact"><span>${k}</span><b>${esc(v)}</b></div>`).join('')}</div>` : ''}
        ${l.highlights.length ? `<h2 class="h3" style="margin-bottom:16px">Highlights</h2><ul class="checks" style="margin-bottom:36px">${l.highlights.map((h) => `<li>${icon('check')}<span>${esc(h)}</span></li>`).join('')}</ul>` : ''}
        ${l.description ? `<h2 class="h3" style="margin-bottom:12px">About this property</h2><div class="md">${md(l.description)}</div>` : ''}
        ${video ? `<p style="margin-top:18px"><a class="link-arrow" href="${esc(video)}" target="_blank" rel="noopener">${icon('video')} Watch the video tour <span>→</span></a></p>` : ''}
        ${mapLink ? `<p style="margin-top:12px"><a class="link-arrow" href="${esc(mapLink)}" target="_blank" rel="noopener">${icon('map')} Open location in Google Maps <span>→</span></a></p>` : ''}
      </div>
      <aside class="sticky-card" aria-label="Price and enquiry">
        <span class="muted" style="font-size:14px">${sold ? 'Sold' : 'Asking price'}</span>
        <span class="price">${fmtLKR(l.price)}</span>
        ${l.price_label ? `<span class="muted">${esc(l.price_label)}</span>` : ''}
        <a class="btn btn-primary" data-wa="${esc(ask)}" href="#">${waIcon} Ask on WhatsApp</a>
        <a class="btn btn-outline" data-wa="${esc(view)}" href="#">${icon('video')} Book a video viewing</a>
        <div class="agent"><img src="/images/brand/rashad-headshot-480.webp" alt="" width="56" height="56" loading="lazy"><div><b>Rashad Nazeer</b><span>Kandy · replies on WhatsApp</span></div></div>
      </aside>
    </div>
  </div>
</section>
${others.length ? `<section class="section ivory" aria-labelledby="more-h">
  <div class="wrap">
    <div class="section-head"><h2 id="more-h" class="h2">More properties</h2><a class="link-arrow" href="/real-estate#listings">View all <span>→</span></a></div>
    <div class="listings">${others.map(listingCard).join('\n')}</div>
  </div>
</section>` : ''}`,
  };
};
