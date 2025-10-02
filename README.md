# Embeddable HTML Widgets & Micro-apps

One-file, zero-backend widgets you can **embed anywhere** via `<iframe>`.  
This repo is published on **GitHub Pages** and serves the widgets over HTTPS.

> **Live site:** `https://brianiselin.github.io/widgets-public/`  
> (If you fork/rename the repo, replace the username/repo in the URLs below.)

---

## What’s in here

Each widget is a single, self-contained `.html` file (HTML/CSS/JS). No build step, no tracking, no external libs by default.

| File                           | Live URL                                                                                         | What it does                                                             |
|--------------------------------|-------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------|
| `Buy-or-Lease-Calculator.html` | `https://brianiselin.github.io/widgets-public/Buy-or-Lease-Calculator.html`                      | Lease vs Purchase comparison calculator with detailed cost breakdowns.   |
| `car-purchase-calculator.html` | `https://brianiselin.github.io/widgets-public/car-purchase-calculator.html`                      | Transparent car purchase cost calculator with financing and currency toggle. |
| `lease-calculator-universal.html` | `https://brianiselin.github.io/widgets-public/lease-calculator-universal.html`            | Universal lease calculator for any vehicle, with money factor & residual math. |
| `Russian-War-Economy-Scorecard.html` | `https://brianiselin.github.io/widgets-public/Russian-War-Economy-Scorecard.html`         | Interactive dashboard on Russian war economy metrics.                     |
| `UN-Peace-&-Security-Council-Sandbox.html` | `https://brianiselin.github.io/widgets-public/UN-Peace-&-Security-Council-Sandbox.html`| UN Security Council decision modeling sandbox.                           |
| `eu-china-dashboard.html`       | `https://brianiselin.github.io/widgets-public/eu-china-dashboard.html`                          | Dashboard for tracking EU-China geopolitical data.                        |
| `eu-taiwan-dashboard.html`      | `https://brianiselin.github.io/widgets-public/eu-taiwan-dashboard.html`                         | Dashboard for tracking EU-Taiwan geopolitical data.                       |
| `gripen-bvr-sandbox.html`       | `https://brianiselin.github.io/widgets-public/gripen-bvr-sandbox.html`                          | Sandbox tool related to Gripen BVR exercises and scenarios.               |
| `medium-feed.html`              | `https://brianiselin.github.io/widgets-public/medium-feed.html`                                 | Embedded Medium publication feed.                                         |
| `russia-war-economy-scorecard.html` | `https://brianiselin.github.io/widgets-public/russia-war-economy-scorecard.html`            | Scorecard widget tracking Russian war economy data.                       |
| `taiwan-china-war-barometer.html` | `https://brianiselin.github.io/widgets-public/taiwan-china-war-barometer.html`               | Barometer dashboard tracking Taiwan-China situation.                      |

---

## How to embed (WordPress, Webflow, etc.)

Use a **Custom HTML** block and paste an `<iframe>` pointing at the live URL. For example, to embed the lease vs buy calculator:

