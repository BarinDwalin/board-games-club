import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import {
  CollectionPage,
  ErrorPage,
  MainPage,
  NotFoundPage,
  RulesPage,
  Tournament,
  eventsLoader,
} from "./components";
import reportWebVitals from "./reportWebVitals";
import { AppRoute } from "./settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <MainPage /> },
          {
            path: AppRoute.Main,
            element: <MainPage />,
          },
          {
            path: AppRoute.Collection,
            element: <CollectionPage />,
          },
          {
            loader: eventsLoader,
            path: AppRoute.Events,
            element: <Tournament></Tournament>,
          },
          {
            path: AppRoute.Rules,
            element: <RulesPage />,
          },
          { path: "404", element: <NotFoundPage /> },
          { path: "*", element: <Navigate replace to="/404" /> },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

console.info(
  "%c Хочешь помочь сделать лучше? Присылай свой PR: https://github.com/BarinDwalin/board-games-club/pulls",
  "color:green; font-size:16px;"
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
