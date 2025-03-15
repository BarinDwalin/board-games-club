import { Box, SvgIcon, Typography } from "@mui/material";
import "./MainPage.css";
import { ReactComponent as BannerImage } from "../../images/banner.svg";
import { Map } from "./Map";

function Banner() {
  return (
    <div
      style={{
        display: "block",
        width: "100%",
        height: "initial",
        margin: "auto",
        maxWidth: "920px",
        position: "relative",
      }}
    >
      <picture
        style={{
          position: "absolute",
          width: "50%",
          left: "22%",
          top: "17%",
        }}
      >
        <source srcSet="/images/banner-meeple.webp" type="image/webp" />
        <img
          src="/images/banner-meeple.png"
          alt="banner meeple"
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </picture>
      <SvgIcon
        component={BannerImage}
        className="banner"
        inheritViewBox
        sx={{
          display: "block",
          width: "100%",
          height: "initial",
        }}
      />
    </div>
  );
}

export function MainPage() {
  return (
    <div className="page">
      {/* <h1 className="page-header">Добро пожаловать, авантюрист</h1> */}
      <Banner></Banner>
      <div className="content">
        <Box
          sx={{
            margin: "0 24px",
            textAlign: "center",
          }}
        >
          <Typography variant="subtitle2" component="span">
            * Время работы клуба и стоимость посещения в праздничные дни может
            быть изменено
          </Typography>
        </Box>
        <Map></Map>
      </div>
    </div>
  );
}
