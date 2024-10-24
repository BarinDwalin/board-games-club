import { Event } from "../interfaces";

export function getEvents() {
  return Promise.resolve(events);
}

const events: Event[] = [
  {
    date: "2023-10-19T00:00:00.00Z",
    title: "Турнир по Лоскутному Королевству от Стиля Жизни",
  },
  {
    date: "2024-01-11T00:00:00.00Z",
    title: "Тунир по Новым Римлянам от Стиля Жизни",
  },
  {
    date: "2023-10-26T00:00:00.00Z",
    title: "Турнир по Гномам-вредителям от Стиля Жизни",
  },
  {
    date: "2023-11-10T00:00:00.00Z",
    title: "Турнир по Королевским Хроникам от Эврикус",
  },
  {
    date: "2024-01-25T00:00:00.00Z",
    title: "Турнир по Unmatched от GaGa",
  },
];
