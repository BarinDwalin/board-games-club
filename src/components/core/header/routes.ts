import { AppRoute } from "../../../settings";
import { MenuItem } from "./menu-item";

export const routes: MenuItem[] = [
  {
    key: AppRoute.Main,
    mobileIcon: "/images/navigation/about.svg",
    label: "О клубе",
  },
  {
    key: AppRoute.Collection,
    mobileIcon: "/images/navigation/collection.svg",
    label: "Во что играем",
  },
  {
    key: AppRoute.Events,
    mobileIcon: "/images/navigation/tournament.svg",
    label: "Турниры",
  },
  {
    key: AppRoute.Feedback,
    mobileIcon: "/images/navigation/feedback.svg",
    label: "Обратная связь",
  },
  {
    key: AppRoute.Rules,
    mobileIcon: "/images/navigation/rules.svg",
    label: "Правила посещения",
  },
];
