export interface Game {
  id: number;
  teseraId: number;
  title: string;
  title2?: string;
  title3?: string;
  alias: string;
  descriptionShort: string;
  creationDateUtc: string;
  photoUrl?: string;
  year: number;
  numVotes: number;
  ratingMy?: number;
  ratingUser: number;
  n10Rating: number;
  n20Rating: number;
  bggRating: number;
  bggGeekRating: number;
  bggNumVotes: number;
  commentsTotal: number;
  commentsTotalNew: number;
  teseraUrl: string;
  isAddition: boolean;
  
  players_min?: number;
  players_max?: number;
  time_min?: number;
  time_max?: number;
  age?: number;
}

export interface GameNastolio {
  name_original: string;
  name_russian: string;
  slug: string;
  year: number;
  players_min: number;
  players_max: number;
  time_min: number;
  time_max: number;
  age: number;
  height: number | null;
  length: number | null;
  width: number | null;
  weight: number | null;
  logo: {
    original: string;
    thumb: string;
  };
  type_string: "game" | "expansion";
  scores: {
    average: string;
    votes: number;
  };
  bgg: {
    bgg_id: number;
    rating: {
      votes: number;
      average: number;
      rank: number | null;
      synced_at: string;
    };
  };
}
