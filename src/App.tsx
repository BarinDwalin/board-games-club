import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import { AppRoute, Pages } from "./settings";
import { Footer, Header, SearchPanel } from "./components";

const App: React.FC = () => {
  const [page, setPage] = React.useState(AppRoute.Main);
  const [shownSearchPanel, setShownSearchPanel] = React.useState(false);
  const [collapsedDesktopMenu, setCollapsedDesktopMenu] = React.useState(false);

  const getTitle = (route: string) => {
    return Pages[route]?.title;
  };

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
        shownSearchPanel={shownSearchPanel}
        toggleSearch={() => {
          setShownSearchPanel((value) => !value);
        }}
        toggleCollapsedDesktopMenu={(collapsed) => {
          setCollapsedDesktopMenu(collapsed);
        }}
      ></Header>
      <Box
        component="main"
        className="main"
        sx={{
          overflow: "initial",
        }}
      >
        <Outlet />
      </Box>
      <Footer></Footer>
      <SearchPanel
        shown={shownSearchPanel}
        collapsedDesktopMenu={collapsedDesktopMenu}
      ></SearchPanel>
    </div>
  );
};

export default App;
