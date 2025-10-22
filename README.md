# Embeddable HTML Widgets & Micro-apps

One-file, zero-backend widgets you can **embed anywhere** via `<iframe>`.  
This repo is published on **GitHub Pages** and serves the widgets securely over HTTPS.

> **Live site:** `https://brianiselin.github.io/widgets-public/`  
> (If you fork or rename this repo, remember to update the username/repo in all URLs below.)

---

## What’s Included

Each widget is a single, self-contained `.html` file (HTML/CSS/JS), with no build step required. By default, no tracking or external dependencies except for minimal web fonts or chart libraries loaded via CDN.

| File                             | Live URL                                                                                           | Description                                                                  |
|---------------------------------|---------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------|
| `Buy-or-Lease-Calculator.html`   | `https://brianiselin.github.io/widgets-public/Buy-or-Lease-Calculator.html`                        | Lease vs Purchase comparison calculator with detailed cost breakdowns.       |
| `car-purchase-calculator.html`   | `https://brianiselin.github.io/widgets-public/car-purchase-calculator.html`                       | Transparent car purchase cost calculator including finance and currency toggle. |
| `lease-calculator-universal.html`| `https://brianiselin.github.io/widgets-public/lease-calculator-universal.html`                    | Universal lease calculator for any vehicle with money factor & residual math. |
| `Russian-War-Economy-Scorecard.html` | `https://brianiselin.github.io/widgets-public/Russian-War-Economy-Scorecard.html`             | Interactive dashboard on Russian war economy metrics.                         |
| ...                             | ...                                                                                               | ...                                                                          |

---

## How to Embed (WordPress, Webflow, etc.)

Use a **Custom HTML** or **Embed** block in your CMS or builder, and paste an `<iframe>` pointing to your chosen widget’s live URL.

For example, embedding the lease vs buy calculator:

