import { Category, Game, GameRecord, GameTesera } from "../interfaces";

export class DataService {
  private collectionsPath = "/data/collections/";
  private collections = [
    {
      file: "john.json",
      unavailableFile: "unavailable-john.json",
      owner: "John",
    },
    {
      file: "sergei.json",
      unavailableFile: "unavailable-sergei.json",
      owner: "Sergei",
    },
  ];

  categories: readonly Category[] = [
    {
      id: "hotness",
      title: "горячие",
      image: "/images/categories/hotness.svg",
      file: "",
    },
    {
      id: "top",
      title: "топ 100",
      image: "/images/categories/top.svg",
      file: "top-bgg.json",
    },
    {
      id: "party",
      title: "вечериночные",
      image: "/images/categories/party.svg",
      file: "",
    },
    {
      id: "family",
      title: "семейные",
      image: "/images/categories/family.svg",
      file: "",
    },
    {
      id: "children",
      title: "детские",
      image: "/images/categories/children.svg",
      file: "",
    },
    {
      id: "hardcore",
      title: "хардкор",
      image: "/images/categories/hardcore.svg",
      file: "",
    },
  ] as const;

  async getCategoriesGames(): Promise<
    { categoryId: string; gamesIds: number[] }[]
  > {
    const categoriesGames: { categoryId: string; gamesIds: number[] }[] = [];

    for (const settings of this.categories.filter(
      (settings) => settings.file
    )) {
      const games =
        (await this.getData<{ id: number }>(
          `${this.collectionsPath}categories/${settings.file}`
        )) || [];

      if (games.length > 0) {
        categoriesGames.push({
          categoryId: settings.id,
          gamesIds: games.map((game) => game.id),
        });
      }
    }

    return categoriesGames;
  }

  async getGames(): Promise<GameRecord<Game>[]> {
    let allRecords: GameRecord<Game>[] = [];

    for (const collection of this.collections) {
      const records =
        (await this.getData<GameRecord<Game>>(
          `${this.collectionsPath}${collection.file}`
        )) || [];
      const unavailableGames =
        (
          await this.getData<{ id: number }>(
            `${this.collectionsPath}${collection.unavailableFile}`
          )
        ).map((value) => value.id) || [];
      const availableRecords = records.filter(
        (record) => !unavailableGames.includes(record.game.id)
      );
      availableRecords.forEach((record) => {
        record.owner = collection.owner;
      });

      allRecords = [...allRecords, ...availableRecords];
    }

    return this.distinctGame(allRecords.sort(this.sortGame));
  }

  private async getData<T>(fileName: string): Promise<T[]> {
    return fetch(fileName)
      .then((response) => response.json())
      .catch(() => []);
  }

  private convertGame(record: GameRecord<GameTesera>): GameRecord<Game> {
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
    const newGame: Game = {
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

  private sortGame(a: GameRecord<Game>, b: GameRecord<Game>) {
    const nameA = a.game?.title?.toUpperCase(); // ignore upper and lowercase
    const nameB = b.game?.title?.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  }

  private distinctGame(records: GameRecord<Game>[]) {
    const unicGamesId = new Set();
    const unicGames: GameRecord<Game>[] = [];

    records.forEach((record) => {
      if (!unicGamesId.has(record.game.id)) {
        unicGamesId.add(record.game.id);
        unicGames.push(record);
      }
    });

    return unicGames;
  }
}
