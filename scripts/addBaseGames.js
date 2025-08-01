var fs = require("fs");
const { resolve } = require("path");
const dataPath = "./public/data/collections/source/";

//main("https://api.tesera.ru/collections/base/own/1872664?v=1&limit=30"); //john
//main('https://api.tesera.ru/collections/custom/4916/gamesclear?v=1&limit=30'); //club
//main('https://api.tesera.ru/collections/custom/4997/gamesclear?v=1&limit=30'); //andrew

async function main(collectionUrl) {
  const recordsBases = [];
  const destination = "./scripts/new-games.json";
  const aliases = await read("./scripts/games.json").then((response) =>
    JSON.parse(response)
  );
  const recordsGames = await fetch(collectionUrl).then((response) =>
    response.json()
  );

  for (const alias of aliases) {
    console.log(alias);
    const record = recordsGames.find((rel) => rel.game.alias === alias);
    const teseraGame = await getGameInfo(alias);

    if (!record) {
      console.log(`Game ${alias} not found in collection`);
      continue;
    }
    if (!teseraGame) {
      console.log(`Game ${alias} not found on tesera`);
      continue;
    }

    const formattedRecord = convertTeseraGameRecord(record, teseraGame.game);
    addTeseraFields(formattedRecord.game, teseraGame.game);
    recordsBases.push(formattedRecord);
  }
  save(JSON.stringify(recordsBases), destination);
}

async function getGameInfo(alias) {
  return fetch(`https://api.tesera.ru/games/${alias}`).then((response) =>
    response.json()
  );
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
    titleOriginal: game.title2 || game.title3,
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
    bggId: game.bggId || 0,
    timeMax: game.playtimeMax,
    parentId: undefined,
  };

  return {
    relationId: record.relationId,
    creationDateUtc: record.creationDateUtc,
    comment: record.comment,
    game: newGame,
  };
}

function addTeseraFields(game, teseraGame) {
  game.rating = {
    bggRating: teseraGame.bggRating,
    bggNumVotes: teseraGame.bggNumVotes,
    teseraRating: teseraGame.ratingUser,
    teseraNumVotes: teseraGame.numVotes,
  };
  game.bggId = teseraGame.bggId || 0;
  game.playersMin = teseraGame.playersMin;
  game.playersMax = teseraGame.playersMax;
  game.age = teseraGame.age;
  game.timeMin = teseraGame.playtimeMin;
  game.timeMax = teseraGame.playtimeMax;
}
