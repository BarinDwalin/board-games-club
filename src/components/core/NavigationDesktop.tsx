import {
  Box,
  Typography,
  ThemeProvider,
  createTheme,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { MenuItem } from "./Header";

export function NavigationDesktop(props: {
  collapsed: boolean;
  routes: MenuItem[];
  shownSearchPanel: boolean;
  setPage: (item: MenuItem) => void;
}) {
  const collapsed = props.collapsed;
  const onClickMenu = (item: MenuItem) => {
    props.setPage(item);
  };

  let theme = createTheme({});
  theme = {
    ...theme,
    components: {
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
            "&:hover": {
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
        sx={{
          display: "flex",
          alignItems: "flex-end",
          position: "absolute",
          left: 0,
          top: "-60px",
          height: "120px",
          width: "100%",
          backgroundColor: "#fff",
          transform: collapsed ? "none" : "translateY(60px)",
          transitionDuration: ".25s",
          transitionProperty: "transform, background-color",
          transitionTimingFunction: "ease-in-out",
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
        }}
      >
        <nav
          style={{
            width: "100%",
            paddingRight: props.shownSearchPanel ? "15px" : "0px",
          }}
        >
          <ul
            style={{
              margin: 0,
              padding: 0,
              display: "flex",
              justifyContent: "center",
              listStyle: "none",
              width: "100%",
              transitionDelay: collapsed ? "0s" : "125ms",
              transitionDuration: "125ms",
              transitionProperty: "opacity, visibility",
              transitionTimingFunction: "ease-in-out",
              opacity: collapsed ? 0 : "initial",
              visibility: collapsed ? "hidden" : "initial",
            }}
          >
            {props.routes.map((route) => (
              <li key={route.key} onClick={() => onClickMenu(route)}>
                <Link
                  component={RouterLink}
                  to={route.key}
                  sx={{
                    display: "inline-flex",
                    px: "18px",
                    "&:hover": {
                      borderColor: "currentcolor",
                    },
                    "&:hover span": {
                      borderColor: "currentcolor",
                    },
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    component="span"
                    sx={{
                      textAlign: "center",
                      borderBottom: "2px solid #0000",
                      pb: "18px",
                      pt: "4px",
                      lineHeight: "16px",
                    }}
                  >
                    {route.label}
                  </Typography>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Box>
    </ThemeProvider>
  );
}
