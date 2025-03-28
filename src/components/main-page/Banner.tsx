import { SvgIcon } from "@mui/material";
import { ReactComponent as BannerImage } from "../../images/banner.svg";

export function Banner() {
  return (
    <>
      <picture
        style={{
          position: "absolute",
          width: "50%",
          left: "22%",
          top: "20%",
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
    </>
  );
}
