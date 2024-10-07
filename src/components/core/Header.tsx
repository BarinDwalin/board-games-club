import {
  Box,
  ThemeProvider,
  createTheme,
  Link,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { AppRoute } from "../../settings";
import { NavigationMobile } from "./NavigationMobile";
import { NavigationDesktop } from "./NavigationDesktop";

export interface MenuItem {
  key: string;
  label: string;
  mobileIcon?: string;
}

const routes: MenuItem[] = [
  {
    key: AppRoute.Main,
    mobileIcon: "./images/navigation/about.svg",
    label: "О клубе",
  },
  {
    key: AppRoute.Collection,
    mobileIcon: "./images/navigation/collection.svg",
    label: "Во что играем",
  },
  {
    key: AppRoute.Events,
    mobileIcon: "./images/navigation/tournament.svg",
    label: "Турниры",
  },
];

export function Header(props: {
  children?: JSX.Element;
  title: string;
  setPage: (item: MenuItem) => void;
  toggleSearch: () => void;
}) {
  const [collapsedDesktopMenu, setCollapsedDesktopMenu] = useState(false);
  const [collapsedMobileMenu, setCollapsedMobileMenu] = useState(false);
  const onToggleMenu = () => {
    setCollapsedMobileMenu((value) => !value);
  };

  const changeCss = () => {
    var scroll = window.scrollY;
    const newCollapsed = scroll > 50;
    if (newCollapsed !== collapsedDesktopMenu) {
      setCollapsedDesktopMenu(newCollapsed);
    }
  };

  window.addEventListener("scroll", changeCss, false);

  let theme = createTheme({});
  theme = {
    ...theme,
    components: {
      MuiContainer: {
        styleOverrides: {
          root: {
            [theme.breakpoints.up("xs")]: {
              padding: 0,
            },
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: "#000",
            textDecoration: "none",
            textDecorationColor: "#000",
            "&.Mui-focusVisible": {
              color: "#000",
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
      <Box
        component="header"
        sx={{
          position: "fixed",
          zIndex: 999,

          top: 0,
          left: 0,
          right: 0,
          [theme.breakpoints.up("md")]: {
            height: "60px",
          },
        }}
      >
        {/*  <Container
          maxWidth={false}
          sx={{ 
            "@media (width <= 1024px)": {
              display: "block",
            },
          }}
        > */}
        <Box
          sx={{
            display: "none",
            height: "100vh",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            background: "#000",
            opacity: collapsedMobileMenu ? 0.3 : 0,
            visibility: collapsedMobileMenu ? "visible" : "hidden",
            transitionDuration: "0.5s",
            transitionProperty: "opacity, visibility",
            transitionTimingFunction: "ease",
            [theme.breakpoints.down("lg")]: {
              display: "block",
            },
          }}
          onClick={() => onToggleMenu()}
        ></Box>
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            [theme.breakpoints.down("lg")]: {
              backgroundColor: "#fff",
              "&::before": {
                content: '""',
                left: 0,
                right: 0,
                bottom: 0,
                borderTop: "1px solid",
                color: "currentcolor",
                opacity: 0.1,
                display: "block",
                pointerEvents: "none",
                position: "absolute",
                transitionDuration: ".15s",
                transitionProperty: "color",
                transitionTimingFunction: "ease-in-out",
              },
            },
            [theme.breakpoints.up("lg")]: {
              display: "grid",
              gridTemplateColumns: "auto  auto",
              height: "56px",
              margin: "0 auto",
              padding: "0 40px",
              alignItems: "center",
              justifyContent: "space-between",
              transform: collapsedDesktopMenu ? "none" : "translateY(12px)",
              transitionDuration: ".25s",
              transitionProperty: "transform ",
              transitionTimingFunction: "ease-in-out",
            },
            [theme.breakpoints.up("md")]: {
              height: "100%",
              padding: "0 12px",
            },
          }}
        >
          <Box
            sx={{
              [theme.breakpoints.down("lg")]: {
                display: "none",
              },
            }}
          >
            Астана
          </Box>
          <Link
            href="/"
            underline="none"
            sx={{
              display: "block",
              height: "48px",
              width: "48px",
              position: "absolute",
              zIndex: 0,
              [theme.breakpoints.up("md")]: {
                margin: "auto",
                zIndex: 0,
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
                "&::before": {
                  content: '""',
                  position: "absolute",
                  zIndex: -1,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  top: 0,
                  margin: "-8px",
                },
              },
              [theme.breakpoints.down("md")]: {
                display: "none",
              },
              [theme.breakpoints.down("lg")]: {
                height: "42px",
                width: "42px",
              },
            }}
          >
            <img
              style={{
                width: "inherit",
                height: "inherit",
              }}
              src="./images/club-logo.png"
              alt="логотип клуба в виде мипла"
            />
          </Link>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              [theme.breakpoints.down("lg")]: {
                height: "100%",
                width: "100%",
              },
            }}
          >
            <IconButton
              aria-label="поиск"
              size="large"
              sx={{
                marginRight: "auto",
                [theme.breakpoints.up("lg")]: {
                  display: "none",
                },
              }}
              onClick={() => onToggleMenu()}
            >
              <MenuIcon />
            </IconButton>
            <Link
              href="/"
              underline="none"
              sx={{
                display: "block",
                position: "relative",
                height: "42px",
                width: "42px",
                marginRight: "auto",
                zIndex: 0,
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
                "&::before": {
                  content: '""',
                  position: "absolute",
                  zIndex: -1,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  top: 0,
                  margin: "-8px",
                },
                [theme.breakpoints.up("md")]: {
                  display: "none",
                },
              }}
            >
              <img
                style={{
                  width: "inherit",
                  height: "inherit",
                }}
                src="./images/club-logo.png"
                alt="логотип клуба в виде мипла"
              />
            </Link>
            <IconButton aria-label="поиск" size="large" sx={{}}>
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>
        <Box
          sx={{
            display: "none",
            [theme.breakpoints.up("lg")]: {
              display: "block",
            },
          }}
        >
          <NavigationDesktop
            collapsed={collapsedDesktopMenu}
            routes={routes}
            setPage={props.setPage}
          ></NavigationDesktop>
        </Box>
        <NavigationMobile
          collapsed={collapsedMobileMenu}
          routes={routes}
          setPage={props.setPage}
        ></NavigationMobile>
      </Box>
    </ThemeProvider>
  );
}
