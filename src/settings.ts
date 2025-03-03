export const AppRoute = {
  Collection: "collection",
  Events: "events",
  Feedback: "feedback",
  Main: "main",
  Rules: "rules",
};

export const Pages = {
  [AppRoute.Collection]: {
    title: 'Во что поиграть'
  },
  [AppRoute.Events]: {
    title: 'Прошедшее и неминуемое будущее'
  },
  [AppRoute.Main]: {
    title: 'Добро пожаловать, авантюрист'
  }
}

export const TIMEOUT = 900;
