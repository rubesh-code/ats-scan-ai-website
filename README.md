# ATS Scan AI SEO Website

Static information and SEO website for `https://learn.atsscanai.com`.

## Content cluster

The main pillar page is `ats-resume-checker.html`. The `blog/` folder contains eight supporting ATS resume guides and a guide index. Every guide links back to the pillar page and to related articles.

## Cloudflare build command

Because the site now contains a nested `blog/` folder, use this build command in Cloudflare Workers Builds:

```bash
rm -rf dist && mkdir dist && find . -maxdepth 1 -type f \( -name '*.html' -o -name '*.css' -o -name '*.js' -o -name '*.xml' -o -name '*.txt' -o -name '*.svg' -o -name '*.png' -o -name '*.ico' \) -exec cp {} dist/ \; && for dir in assets blog; do [ -d "$dir" ] && cp -R "$dir" "dist/$dir"; done
```

Keep the deploy command:

```bash
npx wrangler deploy --assets ./dist --name ats-scan-ai-website --compatibility-date 2026-08-01
```

Push changes to `main`; Cloudflare builds and deploys automatically.

## Main application

Resume analysis, login, credits, and Razorpay payments remain at `https://atsscanai.com`.

## Main files

- `index.html` — learning center homepage with guide previews
- `ats-resume-checker.html` — primary pillar page
- `blog/index.html` — content cluster hub
- `blog/*.html` — eight focused ATS resume guides
- `pricing.html` — ₹99 / 10 credits
- `sitemap.xml` — root pages and all guide URLs
- `styles.css`, `script.js`, `robots.txt`
