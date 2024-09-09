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
}
