export type SortType = "TopBgg";

export interface Category {
  id: string;
  title: string;
  image: string;
  file?: string;
  sortType?: SortType;
}
