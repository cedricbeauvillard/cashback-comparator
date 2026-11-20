#!/usr/bin/env python3
"""Validate V2 offer staging against REAL test-clone CSV exports. No database writes."""
import argparse, collections, csv, math, pathlib, sys

def load(path):
    with open(path, encoding="utf-8-sig", newline="") as handle:
        return list(csv.DictReader(handle))

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--staging", required=True)
    ap.add_argument("--sellers", required=True, help="CSV with id column exported from SellerV2")
    ap.add_argument("--cashbackers", required=True, help="CSV with id,name exported from CashbackerV2")
    ap.add_argument("--output-dir", required=True)
    args = ap.parse_args()
    offers, sellers, cashbackers = map(load, (args.staging, args.sellers, args.cashbackers))
    if not offers:
        raise SystemExit("Empty staging file")
    required = {"sellerIdV2","cashbackerName","cashbackerIdV2","type","rate","unit","isRangeRate","isActive","validationStatus"}
    if not required.issubset(offers[0]):
        raise SystemExit(f"Missing staging columns: {sorted(required-set(offers[0]))}")
    if sellers and "id" not in sellers[0]:
        raise SystemExit("Seller export requires id column")
    if cashbackers and not {"id","name"}.issubset(cashbackers[0]):
        raise SystemExit("Cashbacker export requires id,name columns")
    seller_ids = {r["id"].strip() for r in sellers}
    platforms = collections.defaultdict(set)
    for p in cashbackers:
        platforms[p["name"].strip().casefold()].add(p["id"].strip())
    output = pathlib.Path(args.output_dir)
    output.mkdir(parents=True, exist_ok=True)
    ready, blocked, seen, counts = [], [], set(), collections.Counter()
    for item in offers:
        r = dict(item)
        errors = []
        sid, name = r["sellerIdV2"].strip(), r["cashbackerName"].strip().casefold()
        candidates = platforms.get(name, set())
        key = (sid, name, r["type"].strip())
        if key in seen: errors.append("DUPLICATE_SOURCE_KEY")
        seen.add(key)
        if sid not in seller_ids: errors.append("UNKNOWN_SELLER")
        if len(candidates) != 1 or not next(iter(candidates), ""):
            errors.append("PLATFORM_NOT_UNIQUE_OR_MISSING")
        else:
            resolved = next(iter(candidates))
            existing = r["cashbackerIdV2"].strip()
            if existing and existing != resolved: errors.append("PLATFORM_ID_CONFLICT")
            r["cashbackerIdV2"] = resolved
        if r["validationStatus"].strip() != "VERIFIED":
            errors.append("NOT_BUSINESS_VERIFIED")
        if r["type"] not in {"WEB","GIFT_CARD","AUTOMATIC"}: errors.append("INVALID_TYPE")
        if r["unit"] not in {"EURO","PERCENT","NONE"}: errors.append("INVALID_UNIT")
        try:
            rate = float(r["rate"])
            if not math.isfinite(rate) or rate < 0: errors.append("INVALID_RATE")
        except (ValueError, TypeError):
            errors.append("INVALID_RATE")
        if r["isActive"].lower() not in {"true","false"}: errors.append("INVALID_ACTIVE_FLAG")
        if r["isRangeRate"].lower() not in {"true","false"}: errors.append("INVALID_RANGE_FLAG")
        if r["unit"] == "NONE" and r["rate"] not in {"0","0.0","0.00"}:
            errors.append("NONE_UNIT_WITH_NONZERO_RATE")
        r["preflightIssues"] = "|".join(errors)
        (blocked if errors else ready).append(r)
        counts.update(errors)
    fieldnames = list(offers[0])
    if "preflightIssues" not in fieldnames: fieldnames.append("preflightIssues")
    for filename, data in (("ready.csv", ready), ("blocked.csv", blocked)):
        with open(output / filename, "w", encoding="utf-8-sig", newline="") as handle:
            writer = csv.DictWriter(handle, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(data)
    with open(output / "summary.txt", "w", encoding="utf-8") as handle:
        handle.write(f"total={len(offers)}\nready={len(ready)}\nblocked={len(blocked)}\n")
        handle.write(f"joko_present_in_cashbacker_export={bool(platforms.get('joko'))}\n")
        for issue, count in sorted(counts.items()):
            handle.write(f"{issue}={count}\n")
    print(f"total={len(offers)}, ready={len(ready)}, blocked={len(blocked)}")
    return 0 if not blocked else 2

if __name__ == "__main__":
    sys.exit(main())
