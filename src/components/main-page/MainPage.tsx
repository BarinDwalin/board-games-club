import { SvgIcon } from "@mui/material";
import "./MainPage.css";
import React from "react";
import { ReactComponent as BannerImage } from "../../images/banner.svg";
import { Map } from "./Map";

export function MainPage() {
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
        <Map></Map>
      </div>
    </div>
  );
}
