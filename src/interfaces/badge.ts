export interface GameBadge {
  type: GameBadgeType;
  value?: number;
}

export enum GameBadgeType {
  Hot,
  Hit,
  Guest,
  Top,
  Eng,
}
