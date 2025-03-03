import { Box, SvgIcon, Typography, createTheme } from "@mui/material";
import "./MainPage.css";
import React from "react";
import { ReactComponent as BannerImage } from "../../images/banner.svg";
import { Map } from "./Map";

export function MainPage() {
  let theme = createTheme({});

  return (
    <div className="page">
      {/* <h1 className="page-header">Добро пожаловать, авантюрист</h1> */}

      <div className="content">
        <SvgIcon
          component={BannerImage}
          className="banner"
          inheritViewBox
          sx={{
            display: "block",
            width: "100%",
            height: "initial",
            margin: "auto",
            maxWidth: "920px",
          }}
        />
        <Box
          sx={{
            margin: "0 24px",
            textAlign: "center",
          }}
        >
          <Typography
            variant="subtitle2"
            component="span"
            sx={{
              [theme.breakpoints.down("md")]: {
                fontSize: "1.625rem",
              },
            }}
          >
            * Время работы клуба и стоимость посещения в праздничные дни может
            быть изменено
          </Typography>
        </Box>
        <Map></Map>
      </div>
    </div>
  );
}
