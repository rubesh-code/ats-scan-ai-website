# ATS Scan AI Static Website — Clean Rebuild

This project is a clean static website for **https://learn.atsscanai.com**.

## Structure

- `site/` — every public website file
- `site/blog/` — blog hub and eight separate article pages
- `scripts/build.mjs` — recursively copies the complete `site/` folder to `dist/`
- `scripts/validate.mjs` — checks SEO tags, analytics IDs, local links, and sitemap coverage
- `wrangler.jsonc` — Cloudflare Workers Static Assets configuration

## Local checks

```powershell
npm run validate
npm run build
```

After building, confirm:

```powershell
Test-Path .\dist\blog\index.html
Test-Path .\dist\blog\how-to-improve-ats-score.html
```

Both should return `True`.

## Cloudflare build settings

Build command:

```text
npm run build
```

Deploy command:

```text
npm run deploy
```

Root directory:

```text
/
```

The build script copies the complete directory recursively, so blog folders cannot be skipped.

## Main application links

All primary CTA buttons open:

```text
https://atsscanai.com/
```

## Blog URLs

- `https://learn.atsscanai.com/blog/`
- `https://learn.atsscanai.com/blog/how-to-improve-ats-score`
- `https://learn.atsscanai.com/blog/ats-friendly-resume-format`
- `https://learn.atsscanai.com/blog/resume-keywords-from-job-description`
- `https://learn.atsscanai.com/blog/ats-score-for-freshers`
- `https://learn.atsscanai.com/blog/pdf-vs-docx-for-ats`
- `https://learn.atsscanai.com/blog/ats-resume-for-software-engineers`
- `https://learn.atsscanai.com/blog/ats-resume-for-data-analysts`
- `https://learn.atsscanai.com/blog/is-80-ats-score-good`
