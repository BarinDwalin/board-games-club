import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router";
import "./App.css";
import { AppRoute, Pages } from "./settings";
import { Footer, Header, SearchPanel } from "./components";
import { BrowserService } from "./services";

const App: React.FC = () => {
  const [page, setPage] = React.useState(AppRoute.Main);
  const [shownSearchPanel, setShownSearchPanel] = React.useState(false);
  const [collapsedDesktopMenu, setCollapsedDesktopMenu] = React.useState(false);
  const browserService = React.useMemo(() => new BrowserService(), []);
  const [scrollBarWidth, setScrollBarWidth] = React.useState<number>(0);

  const getTitle = (route: string) => {
    return Pages[route]?.title;
  };
  
  const handleToggleSearch = () => {
    setShownSearchPanel((value) => {
      const shown = !value;
      
      recalcScrollBar(
        shown,
        browserService.scrollBarWidth,
        setScrollBarWidth
      );
      return shown;
    });
  }

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
        scrollBarWidth={scrollBarWidth}
        shownSearchPanel={shownSearchPanel}
        toggleSearch={handleToggleSearch}
        toggleCollapsedDesktopMenu={(collapsed) => {
          setCollapsedDesktopMenu(collapsed);
        }}
      ></Header>
      <Box
        component="main"
        className="main"
        sx={{
          minHeight: "100vh",
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

/** наличие мыши влияет на тип скролла, который может уменьшать ширину экрана */
function recalcScrollBar(
  shownSearchPanel: boolean,
  scrollBarWidth: number,
  setScrollBarWidth: (value: number) => void
) {
  const bodyStyle = document.body.style;

  if (shownSearchPanel) {
    bodyStyle.width = "100vw";
    bodyStyle.overflow = "hidden";
    bodyStyle.paddingRight = `${scrollBarWidth}px`;
    setScrollBarWidth(scrollBarWidth);
  } else {
    setTimeout(() => {
      bodyStyle.width = "initial";
      bodyStyle.overflow = "initial";
      bodyStyle.paddingRight = "initial";
      setScrollBarWidth(0);
    }, 300);
  }
}
