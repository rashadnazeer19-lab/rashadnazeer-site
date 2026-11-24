export default ({ SITE, icon, ld, crumbsLd, PERSON, settings, webinar, esc }) => {
  const weeks = [
    ['AI foundations', 'How today\'s AI tools work, and where they help or hurt.', ['ChatGPT, Claude and Gemini: what each is good at', 'Writing prompts that get usable answers first time', 'Privacy, accuracy and when not to trust the output']],
    ['Writing and communication', 'Hand off the writing that eats your day.', ['Emails, proposals and reports in your own voice', 'CVs, cover letters and LinkedIn posts', 'Translating and adjusting tone for different readers']],
    ['Research and analysis', 'Go from a pile of information to a decision.', ['Summarising long documents and PDFs', 'Working with spreadsheets and data without formulas', 'Fact-checking and citing sources']],
    ['Marketing and content', 'Plan, write and design content for your brand.', ['A month of social posts in one sitting', 'Ad copy and offers that convert', 'Generating images and simple visuals']],
    ['Automate the boring stuff', 'Let AI handle repeat tasks for you.', ['AI chat agents for WhatsApp customer questions', 'Connecting your apps with no-code automations', 'Reusable templates and checklists']],
    ['Build your AI toolkit', 'Put it together on a problem from your own work.', ['Custom assistants and projects for recurring work', 'Capstone: solve your real problem, live', 'Your 30-day plan after the course']],
  ];
  const title = settings.webinar_title || 'AI for your daily work: save 5 hours a week';
  const schema = ld({ '@type': 'Course', name: 'AI Academy: practical AI for work and business', description: 'A 6-week live course on using ChatGPT, Claude and Gemini to solve real problems at work and in business. No coding needed.', url: `${SITE}/ai-academy`, provider: PERSON, inLanguage: 'en', hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online', courseWorkload: 'PT6H' } })
    + (webinar.set ? ld({ '@type': 'Event', name: title, startDate: webinar.iso, eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode', eventStatus: 'https://schema.org/EventScheduled', location: { '@type': 'VirtualLocation', url: `${SITE}/ai-academy` }, organizer: PERSON, isAccessibleForFree: true, offers: { '@type': 'Offer', price: 0, priceCurrency: 'LKR', url: `${SITE}/ai-academy#register`, availability: 'https://schema.org/InStock' } }) : '')
    + crumbsLd([['Home', '/'], ['AI Academy', '/ai-academy']]);
  return {
    title: 'AI Training & Webinars in Sri Lanka — AI Academy | Rashad Nazeer',
    description: 'Free live AI webinars and a 6-week course on using ChatGPT, Claude and Gemini at work and in business. Practical, no coding, for professionals in Sri Lanka and the Gulf.',
    path: '/ai-academy',
    active: 'ai-academy',
    schema,
    body: `
<section class="page-hero dark">
  <div class="wrap split" style="align-items:start">
    <div>
      <nav class="crumbs reveal" aria-label="Breadcrumb"><a href="/">Home</a> / AI Academy</nav>
      <p class="eyebrow reveal">AI Academy · Live, practical, no coding</p>
      <h1 class="h1 reveal">Learn to use AI on your <em class="accent">actual</em> work.</h1>
      <p class="lead reveal">Live webinars and a 6-week cohort for professionals and business owners. Bring a real problem from your job or business, and we solve it on screen with ChatGPT, Claude and Gemini.</p>
      <ul class="checks reveal" style="margin-top:30px">
        <li>${icon('calendar')}<span>Next session: <strong style="color:#fff">${esc(webinar.label)}</strong></span></li>
        <li>${icon('clock')}<span>${esc(webinar.time)}</span></li>
        <li>${icon('video')}<span>Live on Zoom, with recordings for registered learners</span></li>
      </ul>
    </div>
    <div id="register" class="form-card reveal" style="--d:.1s">
      <form data-lead="AI Academy webinar registration (rashadnazeer.lk)">
        <div style="display:grid;gap:8px"><span class="badge">Free · 60 minutes</span><h2>${esc(title)}</h2></div>
        <label class="field">Name<input name="name" type="text" required autocomplete="name"></label>
        <label class="field">Email<input name="email" type="email" required autocomplete="email"></label>
        <label class="field">What best describes you?<select name="role" required><option value="">Select</option><option>Business owner</option><option>Marketing or sales</option><option>Office professional</option><option>Student or job seeker</option><option>Other</option></select></label>
        <button class="btn btn-primary" type="submit">Save my seat</button>
        <p class="form-note">Opens WhatsApp to confirm your seat. Just press send.</p>
      </form>
      <div class="thanks" role="status">
        <span style="width:56px;height:56px;border-radius:50%;background:#E4F1EB;color:var(--emerald);display:grid;place-items:center">${icon('check')}</span>
        <h2>Almost in.</h2>
        <p class="muted">Press send in WhatsApp and I'll send you the joining link. Bring one task you'd love AI to take off your plate.</p>
        <button class="btn btn-outline btn-sm" type="button" data-reset>Register someone else</button>
      </div>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="who-h">
  <div class="wrap">
    <div class="section-head"><div><p class="eyebrow reveal">Who it's for</p><h2 id="who-h" class="h2 reveal">Built for people with real work to do</h2></div></div>
    <div class="grid-4">
      <div class="card reveal"><span class="icon">${icon('briefcase')}</span><h3 style="font-size:21px">Business owners</h3><p>Answer customers, write offers and run marketing without hiring yet.</p></div>
      <div class="card reveal" style="--d:.06s"><span class="icon">${icon('chart')}</span><h3 style="font-size:21px">Marketers &amp; sales</h3><p>Ad copy, reports, research and proposals in a fraction of the time.</p></div>
      <div class="card reveal" style="--d:.12s"><span class="icon">${icon('mail')}</span><h3 style="font-size:21px">Office professionals</h3><p>Emails, spreadsheets, summaries and meeting notes, handled.</p></div>
      <div class="card reveal" style="--d:.18s"><span class="icon">${icon('book')}</span><h3 style="font-size:21px">Students &amp; job seekers</h3><p>CVs, interview prep and the AI skills employers now expect.</p></div>
    </div>
  </div>
</section>

<section class="section ivory" id="syllabus" aria-labelledby="syl-h">
  <div class="wrap split" style="align-items:start">
    <div><p class="eyebrow reveal">Syllabus</p><h2 id="syl-h" class="h2 reveal">Six weeks, one live session each</h2><p class="lead reveal" style="margin-top:18px">Recordings, templates, and a capstone on a problem from your own work.</p></div>
    <div class="acc reveal">${weeks.map(([t, s, ls], i) => `<details${i === 0 ? ' open' : ''}><summary><span class="wk">Week ${i + 1}</span><span class="t">${t}</span><span class="i" aria-hidden="true"></span></summary><div class="panel"><p>${s}</p><ul>${ls.map((l) => `<li>${l}</li>`).join('')}</ul></div></details>`).join('')}</div>
  </div>
</section>

<section class="section" aria-labelledby="price-h">
  <div class="wrap">
    <div class="section-head"><div><p class="eyebrow reveal">Ways to learn</p><h2 id="price-h" class="h2 reveal">Start free, go deeper when you're ready</h2></div></div>
    <div class="grid-3" style="align-items:stretch">
      <div class="plan reveal"><h3>Live webinar</h3><span class="amt">Free</span><p class="muted">60 minutes, monthly. A taste of the method and live Q&amp;A.</p><a class="btn btn-outline" href="#register">Save a seat</a></div>
      <div class="plan featured reveal" style="--d:.08s"><h3>6-week cohort</h3><span class="amt">${esc(settings.cohort_price || 'Launching soon')}</span><ul><li>6 live sessions plus recordings</li><li>Prompt and workflow template pack</li><li>Private WhatsApp group for the cohort</li><li>Capstone review on your own problem</li></ul>${settings.cohort_start ? `<p>Next cohort: ${esc(settings.cohort_start)}</p>` : ''}<a class="btn btn-gold" data-wa="Hi Rashad, please add me to the AI Academy cohort waitlist" href="#">Join the waitlist</a></div>
      <div class="plan reveal" style="--d:.16s"><h3>Team workshop</h3><span class="amt">On request</span><p class="muted">Half-day or full-day training for your company, built around your team's workflows.</p><a class="btn btn-outline" data-wa="Hi Rashad, I'd like to discuss an AI workshop for my team" href="#">Enquire on WhatsApp</a></div>
    </div>
  </div>
</section>`,
  };
};
