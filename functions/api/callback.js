// Step 2 of "Sign in with GitHub" for /admin: swap the code for a token and hand it to the CMS window.
export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const saved = ((request.headers.get('Cookie') || '').match(/cms_oauth_state=([^;]+)/) || [])[1];
  if (!code || !state || state !== saved) return reply('error', { message: 'Sign-in expired or was tampered with. Please try again.' });
  try {
    const res = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'User-Agent': 'rashadnazeer-cms' },
      body: JSON.stringify({ client_id: env.GITHUB_CLIENT_ID, client_secret: env.GITHUB_CLIENT_SECRET, code, redirect_uri: `${url.origin}/api/callback` }),
    });
    const data = await res.json();
    if (!data.access_token) return reply('error', { message: data.error_description || 'GitHub did not return a token.' });
    return reply('success', { token: data.access_token, provider: 'github' });
  } catch (e) {
    return reply('error', { message: 'Could not reach GitHub.' });
  }
}

function reply(status, content) {
  const message = `authorization:github:${status}:${JSON.stringify(content)}`;
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>Signing in…</title></head><body><p>Signing you in…</p><script>
(function () {
  var msg = ${JSON.stringify(message)};
  function receive(e) { window.opener.postMessage(msg, e.origin); window.removeEventListener('message', receive, false); setTimeout(function () { window.close(); }, 500); }
  window.addEventListener('message', receive, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script></body></html>`;
  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'Set-Cookie': 'cms_oauth_state=; Path=/api; Max-Age=0; HttpOnly; Secure; SameSite=Lax' },
  });
}
