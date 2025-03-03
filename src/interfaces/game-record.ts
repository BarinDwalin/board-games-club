export interface GameRecord<T> {
  relationId?: number;
  creationDateUtc?: string;
  comment?: string;
  game: T;
  owner?: string;

  // extention
  eventDate?: string;
}
