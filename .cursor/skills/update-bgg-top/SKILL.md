---
name: update-bgg-top
description: >-
  Update BGG top 100 category list by scraping boardgamegeek.com/browse/boardgame.
  Use when the user asks to refresh, update, or sync top-bgg.json or BGG rankings.
disable-model-invocation: true
---

# Update BGG Top Lists

## Run

```bash
npm run update:top-bgg           # scrape BGG browse → top-bgg.json
npm run update:top-bgg -- --all    # top + hotness (hotness via Tesera)
```

## How it works

1. Puppeteer opens https://boardgamegeek.com/browse/boardgame/page/1
2. Parses rank + bggId from the official BGG ranking table
3. Enriches with tesera id/alias when the game exists in club collections
4. Writes `public/data/collections/categories/top-bgg.json`

Format:

```json
{ "bggId": 224517, "rank": 1, "id": 61657, "alias": "brass-birmingham" }
```

The site filters the "топ 100" category by `game.bggId`.

## Notes

- Requires `puppeteer` (devDependency) and network access
- Scraping may take ~15–20 seconds (Cloudflare + page load)
- Hotness still uses Tesera API (`--hotness` / `--all`)
