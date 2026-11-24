export default ({ SITE, listings, listingCard, icon, ld, PERSON, settings, esc }) => {
  const networks = ['Walmart Connect', 'Roundel · Target', 'Instacart', 'Amazon Ads', 'DoorDash', 'Kroger Precision Marketing', "Sam's Club MAP", 'Criteo · Albertsons'];
  const latest = listings.slice(0, 3);
  return {
    title: 'Rashad Nazeer — Retail Media, Sri Lanka Property & AI Training',
    description: 'Rashad Nazeer is a Kandy-based retail media manager for US brands, a property partner for Sri Lankans in the Gulf, and a practical AI trainer.',
    path: '/',
    active: '',
    schema: ld({ '@graph': [PERSON, { '@type': 'WebSite', '@id': `${SITE}/#website`, name: 'Rashad Nazeer', url: `${SITE}/`, publisher: { '@id': `${SITE}/#rashad` } }] }),
    body: `
<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="eyebrow reveal">Kandy, Sri Lanka</p>
      <h1 class="h-display reveal" style="--d:.05s">Rashad Nazeer</h1>
      <p class="rotator reveal" style="--d:.1s" data-rotate='["grow US brands with retail media.","help families abroad buy property back home.","teach people to get real work done with AI."]'>I <span class="word">grow US brands with retail media.</span></p>
      <p class="lead reveal" style="--d:.15s">By day I run retail media for US consumer brands across eight networks. Alongside that, I help Sri Lankans in the Gulf buy property at home with confidence, and I teach practical AI to people who want to save hours every week.</p>
      <div class="btns reveal" style="--d:.2s">
        <a class="btn btn-primary" href="#work">See what I do ${icon('arrow')}</a>
        <a class="btn btn-outline" href="/real-estate">Find a property</a>
      </div>
    </div>
    <div class="portrait reveal" style="--d:.1s">
      <div class="arch-line" aria-hidden="true"></div>
      <div class="arch" aria-hidden="true"></div>
      <img src="/images/brand/rashad-portrait-800.webp" srcset="/images/brand/rashad-portrait-480.webp 480w, /images/brand/rashad-portrait-800.webp 800w" sizes="(max-width: 900px) 380px, 460px" width="800" height="1346" alt="Rashad Nazeer in a dark blazer, smiling" fetchpriority="high">
      <div class="chip-float chip-a"><span class="dot">${icon('chart')}</span><span><b data-count="8">8</b>retail media networks</span></div>
      <div class="chip-float chip-b"><span class="dot">${icon('globe')}</span><span><b>Kandy ↔ Gulf</b>property, on the ground</span></div>
    </div>
  </div>
</section>

<div class="marquee" aria-label="Retail media networks I manage">
  <div class="marquee-track">
    <span>${networks.join('</span><span>')}</span>
    <span aria-hidden="true">${networks.join('</span><span aria-hidden="true">')}</span>
  </div>
</div>

<section class="section" id="work" aria-labelledby="work-h">
  <div class="wrap">
    <div class="section-head">
      <div><p class="eyebrow reveal">What I do</p><h2 id="work-h" class="h2 reveal">Three ways I can help</h2></div>
      <p class="lead reveal">Different audiences, same approach: get to the numbers, keep it simple, and stay reachable on WhatsApp.</p>
    </div>
    <div class="grid-3">
      <a class="card reveal" href="/marketing"><span class="num">01</span><span class="icon">${icon('chart')}</span><h3>Performance Marketing</h3><p>Retail media for US CPG brands on Walmart, Target, Instacart, Amazon, DoorDash, Kroger and more. Plans, pacing and reports that explain the why.</p><span class="more">View my work <span>→</span></span></a>
      <a class="card reveal" style="--d:.08s" href="/real-estate"><span class="num">02</span><span class="icon">${icon('home')}</span><h3>Real Estate</h3><p>Land, homes and commercial property in Kandy and across Sri Lanka for families in the UAE, Qatar, Saudi Arabia and beyond. Video viewings and checks before you pay.</p><span class="more">Browse properties <span>→</span></span></a>
      <a class="card reveal" style="--d:.16s" href="/ai-academy"><span class="num">03</span><span class="icon">${icon('spark')}</span><h3>AI Academy</h3><p>Free live webinars and a 6-week course on using ChatGPT, Claude and Gemini to solve real problems at work and in business. No coding needed.</p><span class="more">See the syllabus <span>→</span></span></a>
    </div>
  </div>
</section>

${latest.length ? `<section class="section ivory" aria-labelledby="props-h">
  <div class="wrap">
    <div class="section-head">
      <div><p class="eyebrow reveal">On the market</p><h2 id="props-h" class="h2 reveal">Properties I'm handling now</h2></div>
      <a class="link-arrow reveal" href="/real-estate#listings">All properties <span>→</span></a>
    </div>
    <div class="listings">${latest.map(listingCard).join('\n')}</div>
  </div>
</section>` : ''}

<section class="section" aria-labelledby="about-h">
  <div class="wrap split">
    <div class="headshot reveal"><img src="/images/brand/rashad-headshot-480.webp" width="480" height="480" alt="Portrait of Rashad Nazeer" loading="lazy"></div>
    <div>
      <p class="eyebrow reveal">About</p>
      <h2 id="about-h" class="h2 reveal">Hi, I'm Rashad.</h2>
      <div class="prose reveal" style="margin-top:22px">
        <p>I live in Gelioya, just outside Kandy, and work US hours for American consumer brands. I like turning messy problems into simple systems that make money, whether that's a campaign, a property deal or a workflow someone runs with AI.</p>
      </div>
      <ol class="timeline reveal" style="margin-top:32px">
        <li><strong>Worked in Qatar</strong><span>Before moving back home to Sri Lanka.</span></li>
        <li><strong>Senior Retail Media Account Manager, Good Peeps</strong><span>US CPG brands across eight retail media networks.</span></li>
        <li><strong>Director, Global Axon</strong><span>Connecting Sri Lankan talent with international teams.</span></li>
        <li><strong>Co-founder, Tropik Lanka</strong><span>Travel experiences across Sri Lanka.</span></li>
      </ol>
    </div>
  </div>
</section>

<section class="section-sm">
  <div class="wrap">
    <div class="cta-band reveal">
      <div><h2>Let's talk.</h2><p>Brand, buyer or learner: WhatsApp is the fastest way to reach me. I usually reply the same day.</p></div>
      <div class="btns">
        <a class="btn btn-light" data-wa="Hi Rashad, I found you on rashadnazeer.lk" href="#">WhatsApp me</a>
        ${settings.email ? `<a class="btn btn-ghost-light" href="mailto:${esc(settings.email)}">${esc(settings.email)}</a>` : ''}
      </div>
    </div>
  </div>
</section>`,
  };
};
