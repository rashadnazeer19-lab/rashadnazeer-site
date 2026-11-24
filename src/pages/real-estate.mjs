export default ({ SITE, listings, listingCard, icon, ld, crumbsLd, PERSON, esc }) => {
  const types = [...new Set(listings.map((l) => l.type).filter(Boolean))];
  const faqs = [
    ['Do I need to be in Sri Lanka to buy?', 'Most of the search, viewings and checks can happen while you are abroad. For signing, many buyers use a trusted family member or a power of attorney. Your lawyer will confirm the right option for your situation.'],
    ['How do video viewings work?', 'I visit the property and walk you through it live on WhatsApp video, at a time that suits Gulf working hours. You can ask me to check anything: the road, the neighbours, water, light, the view.'],
    ['How do you make sure a property is genuine?', 'Before you pay anything, the deed, survey plan and approvals are checked by an independent lawyer. I also visit in person and confirm the seller and boundaries on the ground.'],
    ['Which areas do you cover?', 'Kandy and the Central Province first-hand, including Katugastota, Peradeniya, Gampola, Digana and Gelioya, plus Colombo and other districts through trusted partners.'],
    ['How do you charge?', 'It depends on the property and the work involved. I will tell you upfront, in writing, before you commit to anything.'],
  ];
  const areas = ['Kandy city', 'Katugastota', 'Peradeniya', 'Gampola', 'Digana', 'Gelioya', 'Kurunegala', 'Colombo'];
  return {
    title: 'Buy Property in Kandy & Sri Lanka from the Gulf | Rashad Nazeer',
    description: 'Land, houses and commercial property for sale in Kandy and across Sri Lanka, for Sri Lankans living in the UAE, Qatar, Saudi Arabia, Kuwait and Oman. Video viewings and checks.',
    path: '/real-estate',
    active: 'real-estate',
    schema: ld({ '@type': 'RealEstateAgent', '@id': `${SITE}/real-estate#agent`, name: 'Rashad Nazeer — Sri Lanka property for families abroad', url: `${SITE}/real-estate`, image: `${SITE}/images/brand/og-default.jpg`, founder: PERSON, address: { '@type': 'PostalAddress', addressLocality: 'Kandy', addressRegion: 'Central Province', addressCountry: 'LK' }, areaServed: areas.map((a) => ({ '@type': 'Place', name: `${a}, Sri Lanka` })) })
      + ld({ '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) })
      + ld({ '@type': 'ItemList', name: 'Properties for sale', itemListElement: listings.map((l, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}${l.url}`, name: l.title })) })
      + crumbsLd([['Home', '/'], ['Real Estate', '/real-estate']]),
    body: `
<section class="page-hero ivory">
  <div class="wrap split" style="align-items:start">
    <div>
      <nav class="crumbs reveal" aria-label="Breadcrumb"><a href="/">Home</a> / Real Estate</nav>
      <p class="eyebrow reveal">For Sri Lankans in the UAE · Qatar · Saudi · Kuwait · Oman · Bahrain</p>
      <h1 class="h1 reveal">Buying property back home? I'll be your <em class="accent">feet on the ground</em>.</h1>
      <p class="lead reveal">Land, houses, apartments and commercial buildings in Kandy and across Sri Lanka. I shortlist, visit, walk you through every viewing on video, and make sure the paperwork is checked before you pay.</p>
      <ul class="checks reveal" style="margin-top:30px">
        <li>${icon('video')}<span>Live WhatsApp video viewings, on Gulf time</span></li>
        <li>${icon('shield')}<span>Deeds and plans checked by an independent lawyer</span></li>
        <li>${icon('pin')}<span>Based in Kandy, so local and off-market deals reach me first</span></li>
      </ul>
    </div>
    <div id="enquire" class="form-card reveal" style="--d:.1s">
      <form data-lead="New property enquiry (rashadnazeer.lk)">
        <div style="display:grid;gap:6px"><h2>Tell me what you're looking for</h2><p class="muted" style="font-size:15px">Takes two minutes. I'll reply on WhatsApp with options.</p></div>
        <label class="field">Full name<input name="name" type="text" required autocomplete="name"></label>
        <div class="fields">
          <label class="field">Where you live<select name="country" required><option value="">Select</option><option>UAE</option><option>Qatar</option><option>Saudi Arabia</option><option>Kuwait</option><option>Oman</option><option>Bahrain</option><option>Sri Lanka</option><option>Other</option></select></label>
          <label class="field">WhatsApp number<input name="whatsapp" type="tel" required autocomplete="tel" placeholder="+971 5X XXX XXXX"></label>
        </div>
        <div class="fields">
          <label class="field">Looking for<select name="type" required><option value="">Select</option><option>Land</option><option>House</option><option>Apartment</option><option>Commercial building</option><option>Rental investment</option></select></label>
          <label class="field">Preferred area<input name="area" type="text" placeholder="e.g. Kandy, Colombo"></label>
        </div>
        <div class="fields">
          <label class="field">Budget (LKR)<select name="budget" required><option value="">Select</option><option>Under 15 Mn</option><option>15 – 30 Mn</option><option>30 – 60 Mn</option><option>60 – 100 Mn</option><option>100 Mn+</option></select></label>
          <label class="field">When are you buying?<select name="timeline" required><option value="">Select</option><option>Within 3 months</option><option>3 – 6 months</option><option>6 – 12 months</option><option>Just researching</option></select></label>
        </div>
        <button class="btn btn-primary" type="submit">Send my requirements</button>
        <p class="form-note">Opens WhatsApp with your details filled in. Just press send.</p>
      </form>
      <div class="thanks" role="status">
        <span class="icon" style="width:56px;height:56px;border-radius:50%;background:#E4F1EB;color:var(--emerald);display:grid;place-items:center">${icon('check')}</span>
        <h2>Almost done.</h2>
        <p class="muted">Press send in WhatsApp and I'll reply within 24 hours with a first shortlist.</p>
        <button class="btn btn-outline btn-sm" type="button" data-reset>Send another brief</button>
      </div>
    </div>
  </div>
</section>

<section class="section" id="listings" aria-labelledby="list-h">
  <div class="wrap">
    <div class="section-head">
      <div><p class="eyebrow reveal">Properties for sale</p><h2 id="list-h" class="h2 reveal">Available now</h2></div>
      <p class="lead reveal">Every listing is visited in person. Ask for a live video viewing on any of them.</p>
    </div>
    ${listings.length ? `
    ${types.length > 1 ? `<div class="filters reveal" data-filters role="group" aria-label="Filter properties">
      <button class="filter" type="button" data-filter="all" aria-pressed="true">All</button>
      ${types.map((t) => `<button class="filter" type="button" data-filter="${esc(t)}" aria-pressed="false">${esc(t)}</button>`).join('')}
    </div>` : ''}
    <div class="listings">${listings.map(listingCard).join('\n')}</div>
    <div class="empty">Nothing in this category right now. <a href="#enquire">Send me your brief</a> and I'll find options.</div>`
    : `<div class="empty show">New properties are being added. <a href="#enquire">Send me your brief</a> and I'll message you with options.</div>`}
  </div>
</section>

<section class="section dark" aria-labelledby="how-h">
  <div class="wrap">
    <div class="section-head"><div><p class="eyebrow reveal">How it works</p><h2 id="how-h" class="h2 reveal">From the Gulf to the keys, in five steps</h2></div></div>
    <ol class="steps reveal" style="--n:5">
      <li><strong>Share your brief</strong><span>Budget, area, type and timeline, in the form above.</span></li>
      <li><strong>Get a shortlist</strong><span>Checked options on WhatsApp with photos, maps and prices.</span></li>
      <li><strong>View it live</strong><span>I walk the property on video while you ask the questions.</span></li>
      <li><strong>Verify</strong><span>Deeds, plans and approvals checked by a lawyer.</span></li>
      <li><strong>Close</strong><span>Signing, transfer and handover coordinated for you.</span></li>
    </ol>
  </div>
</section>

<section class="section" aria-labelledby="why-h">
  <div class="wrap">
    <div class="section-head"><div><p class="eyebrow reveal">Why families abroad work with me</p><h2 id="why-h" class="h2 reveal">Someone you can trust on this side</h2></div></div>
    <div class="grid-3">
      <div class="card reveal"><span class="icon">${icon('globe')}</span><h3>I've been where you are</h3><p>I worked in Qatar before moving home, so I know how hard it is to judge a property, a seller or a price from overseas.</p></div>
      <div class="card reveal" style="--d:.08s"><span class="icon">${icon('clock')}</span><h3>On your hours</h3><p>Viewings, calls and updates fit around Gulf working days and weekends. Everything happens on WhatsApp, in writing.</p></div>
      <div class="card reveal" style="--d:.16s"><span class="icon">${icon('shield')}</span><h3>Checked before you pay</h3><p>Independent legal checks on the deed and plan, and an in-person visit, before any money moves.</p></div>
    </div>
    <div class="reveal" style="margin-top:56px">
      <h3 class="h3" style="margin-bottom:16px">Areas I cover</h3>
      <div class="chips">${areas.map((a) => `<span class="chip">${a}</span>`).join('')}</div>
    </div>
  </div>
</section>

<section class="section ivory" aria-labelledby="faq-h">
  <div class="wrap split" style="align-items:start">
    <div><p class="eyebrow reveal">FAQ</p><h2 id="faq-h" class="h2 reveal">Common questions</h2><p class="lead reveal" style="margin-top:18px">Anything else? Ask on WhatsApp and I'll answer the same day.</p></div>
    <div class="acc faq reveal">${faqs.map(([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary><span class="t">${q}</span><span class="i" aria-hidden="true"></span></summary><div class="panel"><p>${a}</p></div></details>`).join('')}</div>
  </div>
</section>

<section class="section-sm" style="padding-top:88px">
  <div class="wrap">
    <div class="cta-band reveal">
      <div><h2>Selling a property in Kandy?</h2><p>I market properties to Sri Lankan buyers in the Gulf. Send me the details and photos on WhatsApp.</p></div>
      <div class="btns"><a class="btn btn-light" data-wa="Hi Rashad, I'd like to sell a property" href="#">List your property</a></div>
    </div>
  </div>
</section>`,
  };
};
