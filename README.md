# ATS Scan AI Static SEO Website

Public information site: https://learn.atsscanai.com  
Resume analysis application: https://atsscanai.com

This is a plain HTML/CSS/JavaScript site and does not modify the Azure application.

## Deploy settings already configured in Cloudflare

Build command:

```bash
rm -rf dist && mkdir dist && find . -maxdepth 1 -type f \( -name '*.html' -o -name '*.css' -o -name '*.js' -o -name '*.xml' -o -name '*.txt' -o -name '*.svg' -o -name '*.png' -o -name '*.ico' \) -exec cp {} dist/ \; && if [ -d assets ]; then cp -R assets dist/assets; fi
```

Deploy command:

```bash
npx wrangler deploy --assets ./dist --name ats-scan-ai-website --compatibility-date 2026-08-01
```

## Publish

Copy all files into `rubesh-code/ats-scan-ai-website`, then:

```bash
git add .
git commit -m "Launch complete ATS Scan AI SEO website"
git pull --rebase origin main
git push origin main
```

Cloudflare will deploy automatically.

## Review before publication

- Confirm product statements still match the live application.
- Confirm `support@atsscanai.com` is the correct support address.
- Have the Privacy Policy and Terms reviewed for the correct legal entity, registered address, governing law, refunds, taxes, and target countries.
- Submit `https://learn.atsscanai.com/sitemap.xml` in Google Search Console after deployment.
