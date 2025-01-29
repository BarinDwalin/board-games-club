import { Box, createTheme, ThemeProvider, Theme } from "@mui/material";
import { PropsWithChildren, useEffect, useMemo, useRef, useState } from "react";
import { DataService } from "../../../services";
import { Game, GameRecord } from "../../../interfaces";
import { SearchInputWrapper } from "./SearchInputWrapper";
import { CommonSuggestion } from "./CommonSuggestion";
import { FilteredCollection } from "./FilteredCollection";

const SearchPanelWrapper = (
  props: PropsWithChildren & {
    theme: Theme;
    shown: boolean;
    collapsedDesktopMenu: boolean;
  }
) => {
  const scrollComponentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (props.shown) {
      scrollComponentRef.current?.scrollTo({
        top: 0,
      });
    }
  }, [props.shown]);

  return (
    <Box
      component="aside"
      sx={{
        zIndex: props.shown ? 10000 : 1,
        visibility: props.shown ? "visible" : "hidden",

        position: "fixed",
        top: props.collapsedDesktopMenu ? "60px" : "120px",
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",

        transitionDuration: ".3s",
        transitionTimingFunction: "cubic-bezier(.12,0,.39,0)",
        transitionProperty: "visibility, height",
        overflow: "hidden",
        willChange: "height",

        [props.theme.breakpoints.down("lg")]: {
          top: "60px",
        },
        [props.theme.breakpoints.down("md")]: {
          top: "45px",
        },
      }}
    >
      <div
        style={{
          width: "100%",
          height: props.shown ? "100%" : "0px",
          maxHeight: "100%",
          maxWidth: "100%",

          margin: 0,
          backgroundColor: "rgb(255, 255, 255)",
          transitionDuration: "inherit",
          transitionTimingFunction: "inherit",
          transitionProperty: "inherit",
        }}
      >
        <Box
          ref={scrollComponentRef}
          sx={{
            position: "relative",
            overflowY: "scroll",
            height: "100%",
            [props.theme.breakpoints.up("lg")]: {},
          }}
        >
          {props.children}
        </Box>
      </div>
    </Box>
  );
};

const SuggestionWrapper = (
  props: PropsWithChildren & {
    theme: Theme;
  }
) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "row",
      boxSizing: "border-box",
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: "1600px",

      [props.theme.breakpoints.between("lg", "xl")]: {
        paddingBottom: "50px",
      },
      [props.theme.breakpoints.up("lg")]: {
        paddingLeft: "80px",
        paddingRight: "80px",
      },
      [props.theme.breakpoints.up("md")]: {
        paddingLeft: "32px",
        paddingRight: "32px",
      },
      [props.theme.breakpoints.down("md")]: {
        flexDirection: "column-reverse",
        paddingLeft: "20px",
        paddingRight: "20px",
      },
    }}
  >
    {props.children}
  </Box>
);

export function SearchPanel(props: {
  children?: JSX.Element;
  collapsedDesktopMenu: boolean;
  shown: boolean;
}) {
  const itemCountLimit = 20 as const;
  const [collection, setCollection] = useState<GameRecord<Game>[]>([]);
  const [filteredCollection, setFilteredCollection] = useState<
    GameRecord<Game>[]
  >([]);
  const dataService = useMemo(() => new DataService(), []);

  useEffect(() => {
    if (collection.length === 0) {
      dataService.getGames().then((data) => {
        if (data && data.length) {
          setCollection(data);
          setFilteredCollection(data.slice(0, itemCountLimit));
        }
      });
    }
  }, [collection, dataService]);

  useEffect(() => {
    const bodyStyle = document.body.style;
    if (props.shown) {
      bodyStyle.width = "100vw";
      bodyStyle.overflow = "hidden";
    }

    return () => {
      bodyStyle.width = "initial";
      bodyStyle.overflow = "initial";
    };
  }, [props.shown]);

  const handleSearchChange = (value: string) => {
    const searchValue = value.trim().toLowerCase();
    const searchValues = searchValue.split(" ");

    if (!searchValue) {
      setFilteredCollection(collection.slice(0, itemCountLimit));

      return;
    }

    setFilteredCollection(
      collection
        .filter((record) => {
          return searchValues.every(
            (searchValue) =>
              record.game.title.toLowerCase().includes(searchValue) ||
              record.game.titleOriginal?.toLowerCase()?.includes(searchValue)
          );
        })
        .slice(0, itemCountLimit)
    );
  };

  let theme = createTheme({});
  theme = {
    ...theme,
    components: {
      MuiLink: {
        styleOverrides: {
          root: {
            color: "#fff",
            "&.Mui-focusVisible": {
              color: "#555",
            },
            "&:focus": {
              color: "#c6b09f",
            },
          },
        },
      },
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <SearchPanelWrapper
        theme={theme}
        shown={props.shown}
        collapsedDesktopMenu={props.collapsedDesktopMenu}
      >
        <SearchInputWrapper
          theme={theme}
          shown={props.shown}
          setSearchValue={handleSearchChange}
        ></SearchInputWrapper>

        <SuggestionWrapper theme={theme}>
          <FilteredCollection
            theme={theme}
            filteredCollection={filteredCollection}
          />
          <CommonSuggestion theme={theme} />
        </SuggestionWrapper>
      </SearchPanelWrapper>
    </ThemeProvider>
  );
}
