#!/usr/bin/env python3
import json, os, sys, datetime, requests
from pathlib import Path

OUT = Path("data/eu-china.json")
OUT.parent.mkdir(parents=True, exist_ok=True)

# --- Helpers ---------------------------------------------------------------
def safe_get(url, params=None):
    r = requests.get(url, params=params, timeout=60)
    r.raise_for_status()
    return r.json()

def load_last_good():
    if OUT.exists():
        with OUT.open("r", encoding="utf-8") as f:
            return json.load(f)
    # minimal fallback so the dashboard keeps working
    return {
        "meta": {"updatedAt": datetime.date.today().isoformat()},
        "trade2024": {"exportsBn": 213.3, "importsBn": 517.8, "importSharePct": 21.3},
        "highTechSuppliers2024": [
            {"name":"China","share":30},{"name":"United States","share":23},
            {"name":"Switzerland","share":6},{"name":"Taiwan","share":6},
            {"name":"Vietnam","share":5},{"name":"United Kingdom","share":4}
        ],
        "crm": {"magnetsDependencePct": 98, "magnesiumFromChina": 1, "galliumFromChina": 1},
        "policy": {"evDutyMaxPct": 35.3, "screeningIndex": 65},
        "fdi": {"years":[2019,2020,2021,2022,2023,2024], "valuesBn":[11.7,6.5,10.6,7.9,6.8,10.0]}
    }

# --- Eurostat endpoints (public, CORS-enabled) -----------------------------
# Eurostat offers two relevant APIs; both are fine for scheduled server-side use:
# 1) “Statistics API” (JSON-stat 2.0), documented here. :contentReference[oaicite:0]{index=0}
# 2) SDMX 2.1 API, detailed filtering docs here. :contentReference[oaicite:1]{index=1}

# For the headline EU–China goods flows we’ll use dataset ext_lt_intertrd
# (International trade of EU/EA/Member States by SITC product group). :contentReference[oaicite:2]{index=2}
STAT_API = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data"

# Notes:
# - Datasets expose specific dimensions (e.g., geo, partner, flow, unit, time).
# - The exact codes can be inspected by opening the dataset in the Data Browser and checking “Code”/“API” tabs.
# - Below, we query totals (all products) for EU27_2020 with partner CN and unit EUR_M (million euro), then convert to €bn.

def fetch_trade_totals():
    # exports and imports in 2024 (€ million)
    params_base = {
        "geo": "EU27_2020",
        "partner": "CN",
        "time": "2024"
    }

    # Exports & imports by flow (EXP/IMP); dataset dimension names may differ across datasets,
    # so we query twice and sum the “TOTAL” (all SITC) if necessary.
    # If Eurostat changes labels, we gracefully fall back to last good data.

    # Try Statistics API first
    try:
        # Exports
        qexp = dict(params_base)
        qexp.update({"flow": "EXP", "sitc06": "TOTAL", "unit": "MIO_EUR"})  # € million
        exp = safe_get(f"{STAT_API}/ext_lt_intertrd", qexp)

        # Imports
        qimp = dict(params_base)
        qimp.update({"flow": "IMP", "sitc06": "TOTAL", "unit": "MIO_EUR"})
        imp = safe_get(f"{STAT_API}/ext_lt_intertrd", qimp)

        def first_value(obj):
            # JSON-stat 2.0 structure -> take the first value from "value" array
            vals = obj.get("value", [])
            if not vals:
                raise ValueError("No values in response")
            return float(vals[0])

        exp_mio = first_value(exp)
        imp_mio = first_value(imp)

        return (round(exp_mio/1000, 1), round(imp_mio/1000, 1))  # € bn
    except Exception as e:
        print("Trade totals fetch failed, will keep last values:", e, file=sys.stderr)
        return None

# High-tech supplier shares are published via Eurostat “high-tech trade” news & datasets. :contentReference[oaicite:3]{index=3}
# Many teams fix the latest annual shares once per year. We’ll keep last values unless a specific dataset endpoint is added later.
def fetch_hightech_shares():
    return None  # keep previous values unless you wire a specific dataset here

def main():
    data = load_last_good()

    # 1) Trade totals
    t = fetch_trade_totals()
    if t:
        exports_bn, imports_bn = t
        data["trade2024"]["exportsBn"] = exports_bn
        data["trade2024"]["importsBn"] = imports_bn

    # 2) Import share of China (shares table in Stats Explained / partner shares)
    # In practice, this is derived from a partner-share dataset; you can wire it later.
    # For now we keep the validated 21.3% for 2024. :contentReference[oaicite:4]{index=4}

    # 3) High-tech supplier shares (kept unless endpoint wired)
    # 4) CRM, policy, FDI: curated fields (MERICS/Rhodium/Commission notices don’t have stable open APIs).

    # Update metadata date
    data["meta"]["updatedAt"] = datetime.date.today().isoformat()

    # Save
    tmp = OUT.with_suffix(".json.tmp")
    with tmp.open("w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    tmp.replace(OUT)

if __name__ == "__main__":
    main()
