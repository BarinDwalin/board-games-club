var fs = require("fs");
const { resolve } = require("path");
const dataPath = "./public/data/collections/source/";

/** выгружаем коллекцию в json */
// all collection https://api.tesera.ru/collections/base/own/1872664?v=1&offset=0&limit=100
// all collection https://api.tesera.ru/collections/base/own/1758637?v=1&offset=0&limit=100
// game info https://api.tesera.ru/games/heroes-of-might-magic-iii-the-board-game
// TODO: https://nastol.io/api/v2/users/BarinDwalin/collections/collection/games?page=1&per_page=96&sort=date&order=desc

/** читаем данные с тесеры и преобразуем в свой формат */
//convertTeseraGames("tesera-test.json", "test");
//convertTeseraGames("tesera-john.json", "john");
//convertTeseraGames("tesera-sergei.json", "sergei");
//convertTeseraGames("tesera-club.json", "club"); // https://api.tesera.ru/collections/custom/4916/gamesclear?v=1&limit=100
//convertTeseraGames("tesera-andrew.json", "andrew");

/** читаем свой формат и ищем связь элементов */
//addAddonsLink("test-bases.json", "test-addons.json");
//addAddonsLink("john-bases.json", "john-addons.json");
//addAddonsLink("sergei-bases.json", "sergei-addons.json");
//addAddonsLink("club-bases.json", "club-addons.json");
//addAddonsLink("andrew-bases.json", "andrew-addons.json");

/** читаем свой формат и дополняем данные */
//updateData("sergei.json", "sergei-2.json");
//updateData("john.json", "john-2.json");
//updateData("club.json", "club-2.json");
//updateData("andrew.json", "andrew-2.json");

/** загрузка топ 100 BGG */
/* loadBggTop(
  "https://api.tesera.ru/games?offset=0&limit=100&sort=-ratinggeekbgg",
  "top-bgg.json"
); */

/** загрузка Hotness BGG */
/* loadBggTop(
  "https://api.tesera.ru/games?offset=0&limit=100&sort=-ratingn10",
  "hotness-bgg.json"
); */

function loadBggTop(source, destination) {
  return fetch(source)
    .then((response) => response.json())
    .then((response) => {
      const links = response.map((record) => ({
        id: record.id,
        alias: record.alias,
      }));

      save(JSON.stringify(links), `${dataPath}${destination}`);
    });
}

async function updateData(source, destination) {
  const records = await read(`${dataPath}${source}`).then((response) =>
    JSON.parse(response)
  );
  let count = 0;
  for (const record of records.slice(0, 1000)) {
    const game = record.game;
    const info = (await getGameInfo(game.alias)).game;
    count++;
    game.bggId = game.bggId || info.bggId || 0;
    game.year = game.year || info.year || 0;
    game.playersMin = game.playersMin || info.playersMin || 0;
    game.playersMax = game.playersMax || info.playersMax || 0;
    game.age = game.age || info.playersAgeMin || 0;
    game.timeMin = game.timeMin || info.playtimeMin || 0;
    game.timeMax = game.timeMax || info.playtimeMax || 0;
    game.rating = {
      ...game.rating,
      ...{
        bggRating: game.rating.bggRating || info.bggRating || 0,
        bggNumVotes: game.rating.bggNumVotes || info.bggNumVotes || 0,
        teseraRating: game.rating.teseraRating || info.ratingUser || 0,
        teseraNumVotes: game.rating.teseraNumVotes || info.numVotes || 0,
      },
    };
    console.log(`${count}/${records.length}`, game.alias);
  }

  save(JSON.stringify(records), `${dataPath}${destination}`);
}

async function addAddonsLink(sourceBases, sourceAddons) {
  let bases = await read(`${dataPath}${sourceBases}`).then((response) =>
    JSON.parse(response)
  );
  let addons = await read(`${dataPath}${sourceAddons}`).then((response) =>
    JSON.parse(response)
  );

  for (const record of bases) {
    console.log(record.game.alias);

    await getGameInfo(record.game.alias).then((gameInfo) => {
      gameInfo.relateds.forEach((game) => {
        const addon = addons.find((a) => a.game.teseraId === game.teseraId);
        if (addon) {
          addon.game.parentId = record.game.id;
          if (!record.game.addons) {
            record.game.addons = [];
          }
          record.game.addons.push(addon);
        }
      });
    });
  }

  save(JSON.stringify(bases), `${dataPath}full-${sourceBases}`);
  save(
    JSON.stringify(addons.filter((addon) => addon.game.parentId)),
    `${dataPath}full-${sourceAddons}`
  );
  save(
    JSON.stringify(addons.filter((addon) => !addon.game.parentId)),
    `${dataPath}nolinks-${sourceAddons}`
  );
}

async function getGameInfo(alias) {
  return fetch(`https://api.tesera.ru/games/${alias}`).then((response) =>
    response.json()
  );
}

function convertTeseraGames(source, destination) {
  //return fetch(source).then((response) => response.json())
  return read(`${dataPath}${source}`)
    .then((response) => JSON.parse(response))
    .then((response) => {
      const records = convertData(response);
      const recordsBases = records.filter((record) => !record.game.isAddition);
      const recordsAddons = records.filter((record) => record.game.isAddition);

      save(
        JSON.stringify(recordsBases),
        `${dataPath}${destination}-bases.json`
      );
      save(
        JSON.stringify(recordsAddons),
        `${dataPath}${destination}-addons.json`
      );
    });
}

async function read(source) {
  return new Promise((resolve, reject) => {
    fs.readFile(source, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        reject("failure read");
        return;
      }
      resolve(data);
    });
  });
}

function save(data, destination) {
  fs.writeFile(destination, data, function (err) {
    if (err) {
      console.log(err);
    }
  });
}

function convertData(collection) {
  const recordsAll = collection.map((record) =>
    convertTeseraGameRecord(record)
  );

  return recordsAll;
}

function convertTeseraGameRecord(record) {
  const game = record.game;
  const rating = {
    bggRank: undefined,
    bggRating: game.bggRating,
    bggNumVotes: game.bggNumVotes,
    teseraRating: game.ratingUser,
    teseraNumVotes: game.numVotes,
    nastolioRating: undefined,
    nastolioNumVotes: undefined,
  };
  const newGame = {
    id: game.id,
    alias: game.alias,
    teseraId: game.teseraId,
    nastolioId: undefined,
    bggId: undefined,
    title: game.title,
    titleOriginal: game.title2,
    photoUrl: game.photoUrl,
    year: game.year,
    rating: rating,
    playersMin: game.players_min,
    playersMax: game.players_max,
    timeMin: game.time_min,
    timeMax: game.time_max,
    age: game.age,
    tags: [],
    isAddition: game.isAddition,
    parentId: undefined,
  };

  return {
    relationId: record.relationId,
    creationDateUtc: record.creationDateUtc,
    comment: record.comment,
    game: newGame,
    owner: record.owner,
  };
}
