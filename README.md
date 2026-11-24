# rashadnazeer.lk

Personal site of Rashad Nazeer. Hosted on Cloudflare Pages.

- **Edit pages:** `src/pages/*.mjs` (one file per page), styles in `public/styles.css`, interactions in `public/main.js`.
- **Add a property:** go to https://rashadnazeer.lk/admin/, sign in with GitHub, Property listings → New Listing → Publish.
- **Change WhatsApp number, links, webinar date, cohort price:** /admin/ → Site settings.
- **Build:** `node build.mjs` → `dist/`. Cloudflare runs this on every push.

Cloudflare Pages settings: build command `node build.mjs`, output directory `dist`.
Environment variables (for /admin sign-in): `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`.
