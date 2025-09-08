# Embeddable HTML Widgets & Micro-apps

One-file, zero-backend widgets you can **embed anywhere** via `<iframe>`.  
This repo is published on **GitHub Pages** and serves the widgets over HTTPS.

> **Live site:** `https://brianiselin.github.io/widgets-public/`  
> (If you fork/rename the repo, replace the username/repo in the URLs below.)

---

## What’s in here

Each widget is a single, self-contained `.html` file (HTML/CSS/JS). No build step, no tracking, no external libs by default.

| File | Live URL | What it does |
|---|---|---|
| `evlc-embed.html` | `https://brianiselin.github.io/widgets-public/evlc-embed.html` | Lease calculator (any vehicle) — MF/residual math, base vs after-tax monthly. |
| `lease-calculator-universal.html` | `https://brianiselin.github.io/widgets-public/lease-calculator-universal.html` | Universal lease calculator (same as above; alternative skin). |
| `affordability-slider_v2.html` | `https://brianiselin.github.io/widgets-public/affordability-slider_v2.html` | Income + DTI → price caps and monthly at 36/48/60 months. |
| `mini-tco-buy-vs-lease.html` | `https://brianiselin.github.io/widgets-public/mini-tco-buy-vs-lease.html` | Buy vs. Lease + 3-year mini-TCO (payments, equity @36 mo, fuel/energy, insurance). |
| `otd-otr-estimator.html` | `https://brianiselin.github.io/widgets-public/otd-otr-estimator.html` | Out-the-Door (US) / On-the-Road (UK) price estimator with hints. |

> Don’t see all of these yet? No problem—this table is a template. Remove rows you’re not using or add your own files.

---

## How to embed (WordPress, Webflow, etc.)

Use a **Custom HTML** block and paste an `<iframe>` pointing at the live URL:

```html
<iframe
  src="https://brianiselin.github.io/widgets-public/evlc-embed.html"
  title="Lease Calculator"
  loading="lazy"
  style="width:100%;max-width:900px;height:780px;border:0;border-radius:16px;box-shadow:0 6px 24px rgba(0,0,0,.06)">
</iframe>
