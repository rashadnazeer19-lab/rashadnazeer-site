export default ({ SITE, icon, ld, crumbsLd, PERSON, settings, esc }) => {
  const nets = [
    ['Walmart Connect', 'Sponsored Search, Display, onsite and offsite'],
    ['Roundel (Target)', 'Search, display and Target audiences'],
    ['Instacart Ads', 'Sponsored Product, Shoppable Display, promos'],
    ['Amazon Ads', 'Sponsored Products, Brands and Display'],
    ['DoorDash Ads', 'Sponsored listings and offers'],
    ['Kroger Precision Marketing', 'Onsite search and audience media'],
    ['Criteo (Albertsons)', 'Retail media across the Criteo network'],
    ["Sam's Club MAP", 'Member Access Platform'],
  ];
  const book = settings.calendly
    ? `<a class="btn btn-gold" href="${esc(settings.calendly)}" target="_blank" rel="noopener">Book a free audit call</a>`
    : `<a class="btn btn-gold" data-wa="Hi Rashad, I'd like a free retail media audit" href="#">Ask for a free audit</a>`;
  return {
    title: 'Retail Media Manager — Walmart Connect, Instacart & Amazon Ads',
    description: 'Retail media management for US CPG brands across Walmart Connect, Roundel, Instacart, Amazon, DoorDash, Kroger, Criteo and Sam\'s Club MAP. Free audits.',
    path: '/marketing',
    active: 'marketing',
    schema: ld({ '@type': 'Service', serviceType: 'Retail media management', name: 'Retail media management for CPG brands', provider: PERSON, areaServed: { '@type': 'Country', name: 'United States' }, url: `${SITE}/marketing` }) + crumbsLd([['Home', '/'], ['Performance Marketing', '/marketing']]),
    body: `
<section class="page-hero dark">
  <div class="wrap">
    <nav class="crumbs reveal" aria-label="Breadcrumb"><a href="/">Home</a> / Performance Marketing</nav>
    <p class="eyebrow reveal">Performance Marketing · Retail Media</p>
    <h1 class="h1 reveal" style="max-width:860px">Retail media that <em class="accent">earns</em> its budget.</h1>
    <p class="lead reveal">I plan, launch and optimise retail media for US consumer brands, from a first test campaign to always-on programmes across eight networks, with reporting that explains the why, not just the what.</p>
    <div class="btns reveal" style="margin-top:34px">${book}<a class="btn btn-ghost-light" href="#work">See how I work</a></div>
    <div class="stats reveal">
      <div class="stat"><b data-count="8">8</b><span>retail media networks managed every week</span></div>
      <div class="stat"><b>Weekly</b><span>pacing checks so budgets land on plan</span></div>
      <div class="stat"><b>Monthly</b><span>cross-retailer reports with clear next steps</span></div>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="net-h">
  <div class="wrap">
    <div class="section-head">
      <div><p class="eyebrow reveal">Platforms</p><h2 id="net-h" class="h2 reveal">Networks I run hands-on</h2></div>
      <p class="lead reveal">In the platforms every week, not just in the strategy deck.</p>
    </div>
    <div class="grid-4">${nets.map(([n, d], i) => `<div class="tile reveal" style="--d:${(i % 4) * 0.06}s"><strong>${n}</strong><span>${d}</span></div>`).join('')}</div>
  </div>
</section>

<section class="section ivory" aria-labelledby="svc-h">
  <div class="wrap split" style="align-items:start">
    <div><p class="eyebrow reveal">Services</p><h2 id="svc-h" class="h2 reveal">How I help brands</h2><p class="lead reveal" style="margin-top:18px">Whether you're testing your first retailer or scaling across all of them.</p></div>
    <div class="rows reveal">
      <div><span class="k">Retail media audit</span><span class="v">A clear read of where spend is leaking, what's working, and the three moves I'd make first.</span></div>
      <div><span class="k">Strategy &amp; budgets</span><span class="v">Which retailers, how much and which tactics, tied to your sales goals and retailer moments.</span></div>
      <div><span class="k">Launch &amp; optimisation</span><span class="v">Campaign builds, keyword and bid management, and weekly pacing so budgets land on target.</span></div>
      <div><span class="k">Reporting that makes sense</span><span class="v">Monthly cross-retailer reports with ROAS, CPC and new-to-brand, plus what to do next.</span></div>
    </div>
  </div>
</section>

<section class="section" id="work" aria-labelledby="work-h">
  <div class="wrap">
    <div class="section-head"><div><p class="eyebrow reveal">Selected work</p><h2 id="work-h" class="h2 reveal">The kind of problems I solve</h2></div></div>
    <div class="grid-3">
      <article class="case reveal"><span class="tag">Coffee brand · Multi-retailer</span><h3>One monthly view across every retail network</h3><p>Consolidated reporting so the brand team could compare retailers side by side and move budget faster.</p><ul><li>Single report across all networks</li><li>Like-for-like metrics, including CPC everywhere</li><li>Clear recommendations each month</li></ul></article>
      <article class="case reveal" style="--d:.08s"><span class="tag">Breakfast brand · Instacart + Walmart</span><h3>Always-on search with tighter pacing</h3><p>Restructured campaigns and weekly pacing check-ins to keep spend on plan through busy retail seasons.</p><ul><li>Campaign structure cleaned up</li><li>Weekly pacing against budget</li><li>Seasonal moments planned ahead</li></ul></article>
      <article class="case reveal" style="--d:.16s"><span class="tag">Skincare brand · Prospect audit</span><h3>Walmart and Target audit for a new brand</h3><p>A pre-pitch audit of search share and competitor activity, with a 90-day plan to launch on both networks.</p><ul><li>Competitor and category review</li><li>Keyword and share-of-shelf gaps</li><li>90-day launch roadmap</li></ul></article>
    </div>
  </div>
</section>

<section class="section dark" aria-labelledby="proc-h">
  <div class="wrap">
    <div class="section-head"><div><p class="eyebrow reveal">Process</p><h2 id="proc-h" class="h2 reveal">How we'd work together</h2></div></div>
    <ol class="steps reveal">
      <li><strong>Audit</strong><span>Read-only access, a week to dig in, findings on a call.</span></li>
      <li><strong>Plan</strong><span>Retailer mix, budgets and KPIs agreed up front.</span></li>
      <li><strong>Launch</strong><span>Builds, tracking and creative specs checked before go-live.</span></li>
      <li><strong>Optimise &amp; report</strong><span>Weekly pacing, monthly reports, quarterly reviews.</span></li>
    </ol>
  </div>
</section>

<section class="section-sm" style="padding-top:88px">
  <div class="wrap">
    <div class="cta-band reveal">
      <div><h2>Get a free retail media audit</h2><p>30 minutes, your accounts, honest feedback. Open to freelance and consulting work.</p></div>
      <div class="btns">${settings.calendly ? `<a class="btn btn-light" href="${esc(settings.calendly)}" target="_blank" rel="noopener">Book a call</a>` : ''}<a class="btn ${settings.calendly ? 'btn-ghost-light' : 'btn-light'}" data-wa="Hi Rashad, I'd like a retail media audit" href="#">WhatsApp</a>${settings.linkedin ? `<a class="btn btn-ghost-light" href="${esc(settings.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>` : ''}</div>
    </div>
  </div>
</section>`,
  };
};
