
export interface Category {
  category: string;
  title: string;
  image: string;
}

export const categories: readonly Category[] = [
  {
    category: "hotness",
    title: "горячие",
    image: "/images/categories/hotness.svg",
  },
  {
    category: "top",
    title: "топ 100",
    image: "/images/categories/top.svg",
  },
  {
    category: "party",
    title: "вечериночные",
    image: "/images/categories/party.svg",
  },
  {
    category: "family",
    title: "семейные",
    image: "/images/categories/family.svg",
  },
  {
    category: "children",
    title: "детские",
    image: "/images/categories/children.svg",
  },
  {
    category: "hardcore",
    title: "хардкор",
    image: "/images/categories/hardcore.svg",
  },
] as const;