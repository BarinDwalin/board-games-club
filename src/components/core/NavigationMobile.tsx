import {
  Box,
  Typography,
  ThemeProvider,
  createTheme,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { MenuItem } from "./Header";

export function NavigationMobile(props: {
  collapsed: boolean;
  routes: MenuItem[];
  setPage: (item: MenuItem) => void;
}) {
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
          display: "none",
          padding: "60px 0 0",
          position: "absolute",
          boxSizing: "border-box",
          height: "100vh",
          width: "312px",
          top: 0,
          right: "100%",
          [theme.breakpoints.down("lg")]: {
            display: "block",
          },
          [theme.breakpoints.down("md")]: {
            paddingTop: "48px",
          },
          [theme.breakpoints.down("sm")]: {
            width: "100%",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            height: "100%",
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            background: "#fff",
            transform: props.collapsed ? "translateX(100%)" : "none",
            transitionDuration: ".5s",
            transitionProperty: "transform",
            transitionTimingFunction: "ease",
          }}
        >
          <Box
            sx={{
              padding: "0 32px",
              height: "50px",
              alignContent: "center",
              [theme.breakpoints.down("sm")]: {
                padding: "0 20px",
              },
            }}
          >
            <Typography
              variant="subtitle1"
              component="span"
              sx={{
                fontWeight: "bold",
              }}
            >
              Астана
            </Typography>
          </Box>
          <nav style={{ width: "100%", marginTop: "12px" }}>
            <ul
              style={{
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                listStyle: "none",
                width: "100%",
                transitionDelay: "125ms",
                transitionDuration: "125ms",
                transitionProperty: "opacity, visibility",
                transitionTimingFunction: "ease-in-out",
              }}
            >
              {props.routes.map((route) => (
                <li key={route.key} onClick={() => onClickMenu(route)}>
                  <Link
                    component={RouterLink}
                    to={route.key}
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      columnGap: "10px",
                      width: "100%",
                      boxSizing: "border-box",
                      padding: "12px 32px",
                      [theme.breakpoints.down("sm")]: {
                        padding: "12px 20px",
                      },
                    }}
                  >
                    {!route.mobileIcon ? (
                      <></>
                    ) : (
                      <div
                        style={{
                          width: "42px",
                          height: "42px",
                          position: "relative",
                        }}
                      >
                        <img
                          style={{
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            left: 0,
                            top: "50%",
                            transform: "translateY(-50%)",
                          }}
                          alt={route.key}
                          src={route.mobileIcon}
                        />
                      </div>
                    )}
                    <Typography variant="h5" component="span">
                      {route.label}
                    </Typography>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
