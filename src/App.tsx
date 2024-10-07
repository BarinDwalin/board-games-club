import { Box, createTheme } from "@mui/material";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { GameRecord } from "./interfaces";
import { AppRoute, Pages } from "./settings";
import { CollectionPage, Footer, Header, MainPage, Tournament } from "./components";

interface AppProps {
  clubCollections: { [key: string]: GameRecord[] };
  allGames: GameRecord[];
}

const App: React.FC<AppProps> = ({ clubCollections, allGames }: AppProps) => {
  const [page, setPage] = React.useState(AppRoute.Main);
  // const [collections, setCollections] = React.useState(clubCollections);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
    },
    {
      path: AppRoute.Main,
      element: <MainPage />,
    },
    {
      path: AppRoute.Collection,
      element: <CollectionPage collection={allGames} />,
    },
    {
      path: AppRoute.Events,
      element: <Tournament></Tournament>,
    },
  ]);

  const getPage = (page: string) => {
    switch (page) {
      case AppRoute.Main:
        return <MainPage />;
      case AppRoute.Collection:
        return <CollectionPage collection={allGames} />;

      case AppRoute.Events:
      default:
        return null;
    }
  };
  const getTitle = (route: string) => {
    return Pages[route]?.title;
  };
  const theme = createTheme({});

  return (
    <div
      className="layout"
      style={{
        minHeight: "100%",
        minWidth: "320px",
        width: "100%",
      }}
    >
      <Header
        title={getTitle(page)}
        setPage={(item) => {
          setPage(item.key);
        }}
        toggleSearch={() => {
          console.log("TODO: TOGGLE SEARCH");
        }}
      ></Header>
      <Box
        component="main"
        className="main"
        sx={{
          overflow: "initial",
        }}
      >
        <RouterProvider router={router} />
      </Box>
      <Footer></Footer>
    </div>
  );
};

export default App;
