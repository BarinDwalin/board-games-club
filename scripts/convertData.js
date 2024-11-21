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

/** читаем свой формат и ищем связь элементов */
//addAddonsLink("test-bases.json", "test-addons.json");
//addAddonsLink("john-bases.json", "john-addons.json");
//addAddonsLink("sergei-bases.json", "sergei-addons.json");

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

      save(JSON.stringify(recordsBases), `${dataPath}${destination}-bases.json`);
      save(JSON.stringify(recordsAddons), `${dataPath}${destination}-addons.json`);
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
