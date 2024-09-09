export const AppRoute = {
  Collection: "collection",
  Events: "events",
  Main: "main",
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
