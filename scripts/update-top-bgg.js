/**
 * Updates BGG category lists used by the collection page.
 *
 * Top 100: scraped from https://boardgamegeek.com/browse/boardgame (official BGG ranking).
 * Hotness: Tesera API (BGG hotness mirror).
 *
 * Usage:
 *   node scripts/update-top-bgg.js           # top-bgg.json only
 *   node scripts/update-top-bgg.js --hotness # also hotness-bgg.json
 *   node scripts/update-top-bgg.js --all
 *
 * Requires: puppeteer (devDependency), network access.
 */

const fs = require("fs");
const path = require("path");

const CATEGORIES_DIR = path.join(
  __dirname,
  "../public/data/collections/categories"
);
const COLLECTIONS_DIR = path.join(__dirname, "../public/data/collections");

const BGG_BROWSE_URL = "https://boardgamegeek.com/browse/boardgame/page/1";
const TOP_LIMIT = 100;
const PAGE_SIZE = 100;
const REQUEST_DELAY_MS = 200;
const SCRAPE_RETRIES = 3;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function loadTeseraIndex() {
  const index = new Map();

  for (const file of fs.readdirSync(COLLECTIONS_DIR)) {
    if (!file.endsWith(".json") || file.startsWith("unavailable-")) {
      continue;
    }

    const records = JSON.parse(
      fs.readFileSync(path.join(COLLECTIONS_DIR, file), "utf8")
    );

    for (const record of records) {
      const game = record.game;
      if (game?.bggId && game.bggId > 0 && game.id) {
        index.set(game.bggId, { id: game.id, alias: game.alias });
      }
    }
  }

  return index;
}

async function scrapeBggTop100() {
  const puppeteer = await import("puppeteer");

  for (let attempt = 1; attempt <= SCRAPE_RETRIES; attempt++) {
    const browser = await puppeteer.default.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-blink-features=AutomationControlled"],
    });

    try {
      const page = await browser.newPage();
      await page.setUserAgent(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      );

      console.log(
        `Loading BGG browse page (attempt ${attempt}/${SCRAPE_RETRIES})...`
      );
      await page.goto(BGG_BROWSE_URL, {
        waitUntil: "networkidle2",
        timeout: 120000,
      });
      await sleep(8000);

      const games = await page.evaluate(() => {
        const rows = document.querySelectorAll("#collectionitems tbody tr");

        return [...rows]
          .map((row) => {
            const rankCell = row.querySelector("td.collection_rank");
            const link =
              row.querySelector('td.collection_item a[href*="/boardgame/"]') ||
              row.querySelector('a[href*="/boardgame/"]');
            const match = link?.href.match(/boardgame\/(\d+)/);

            if (!match) {
              return null;
            }

            return {
              rank: parseInt(rankCell?.textContent?.trim() || "0", 10),
              bggId: parseInt(match[1], 10),
            };
          })
          .filter(Boolean);
      });

      if (games.length >= TOP_LIMIT) {
        return games.slice(0, TOP_LIMIT);
      }

      console.warn(
        `Attempt ${attempt}: found ${games.length} games, expected ${TOP_LIMIT}`
      );
    } finally {
      await browser.close();
    }

    if (attempt < SCRAPE_RETRIES) {
      await sleep(3000);
    }
  }

  throw new Error(
    `Failed to scrape ${TOP_LIMIT} games from ${BGG_BROWSE_URL}`
  );
}

async function fetchTeseraPage(url, offset) {
  const separator = url.includes("?") ? "&" : "?";
  const pageUrl = `${url}${separator}offset=${offset}&limit=${PAGE_SIZE}`;
  const response = await fetch(pageUrl);

  if (!response.ok) {
    throw new Error(`Tesera API error ${response.status}: ${pageUrl}`);
  }

  return response.json();
}

async function fetchTeseraHotness(limit) {
  const url = "https://api.tesera.ru/games?sort=-ratingn10";
  const games = [];
  let offset = 0;

  while (games.length < limit) {
    const batch = await fetchTeseraPage(url, offset);

    if (!batch.length) {
      break;
    }

    for (const game of batch) {
      games.push({ id: game.id, alias: game.alias });

      if (games.length >= limit) {
        break;
      }
    }

    offset += PAGE_SIZE;

    if (games.length < limit && batch.length === PAGE_SIZE) {
      await sleep(REQUEST_DELAY_MS);
    }
  }

  return games;
}

function enrichWithTesera(games, teseraIndex) {
  return games.map((game) => {
    const tesera = teseraIndex.get(game.bggId);

    if (tesera) {
      return { ...game, id: tesera.id, alias: tesera.alias };
    }

    return game;
  });
}

function formatTopJson(records) {
  const lines = records.map((record) => {
    const parts = [`"bggId": ${record.bggId}`, `"rank": ${record.rank}`];

    if (record.id) {
      parts.push(`"id": ${record.id}`);
    }
    if (record.alias) {
      parts.push(`"alias": "${record.alias}"`);
    }

    return `  { ${parts.join(", ")} }`;
  });

  return `[\n${lines.join(",\n")}\n]\n`;
}

function formatHotnessJson(records) {
  const lines = records.map(
    (record) => `  { "id": ${record.id}, "alias": "${record.alias}" }`
  );

  return `[\n${lines.join(",\n")}\n]\n`;
}

function writeFile(fileName, content) {
  const destination = path.join(CATEGORIES_DIR, fileName);
  fs.writeFileSync(destination, content, "utf8");
  console.log(`Updated ${destination}`);
}

async function updateTop() {
  const teseraIndex = loadTeseraIndex();
  const bggGames = await scrapeBggTop100();
  const games = enrichWithTesera(bggGames, teseraIndex);

  writeFile("top-bgg.json", formatTopJson(games));

  const mapped = games.filter((game) => game.id).length;
  console.log(`Top 100: ${games.length} games (${mapped} matched in club collections)`);
  console.log(`  #1: bggId=${games[0].bggId}${games[0].alias ? ` (${games[0].alias})` : ""}`);
  console.log(
    `  #100: bggId=${games[99].bggId}${games[99].alias ? ` (${games[99].alias})` : ""}`
  );
}

async function updateHotness() {
  console.log("Fetching hotness from Tesera...");
  const games = await fetchTeseraHotness(TOP_LIMIT);
  writeFile("hotness-bgg.json", formatHotnessJson(games));
  console.log(`Hotness: ${games.length} games`);
}

async function main() {
  const args = new Set(process.argv.slice(2));
  const updateHotnessFlag = args.has("--hotness") || args.has("--all");
  const updateTopFlag = !args.has("--hotness") || args.has("--all");

  if (updateTopFlag) {
    await updateTop();
  }

  if (updateHotnessFlag) {
    await updateHotness();
  }
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
