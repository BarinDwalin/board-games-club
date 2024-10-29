import { Game } from "./game";

export interface GameRecord {
  relationId?: number;
  creationDateUtc?: string;
  eventDate?: string;
  comment?: string;
  game: Game;
  owner?: string;
}
