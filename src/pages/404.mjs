export default () => ({
  title: 'Page not found | Rashad Nazeer',
  description: 'This page does not exist.',
  path: '/404',
  noindex: true,
  body: `
<section class="page-hero ivory" style="min-height:60vh;display:grid;align-items:center">
  <div class="wrap">
    <p class="eyebrow">404</p>
    <h1 class="h1">This page has moved or never existed.</h1>
    <p class="lead">Try one of these instead.</p>
    <div class="btns" style="margin-top:32px">
      <a class="btn btn-primary" href="/">Home</a>
      <a class="btn btn-outline" href="/real-estate#listings">Properties</a>
      <a class="btn btn-outline" href="/ai-academy">AI Academy</a>
    </div>
  </div>
</section>`,
});
