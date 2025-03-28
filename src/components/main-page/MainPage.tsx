import { Box, Typography, createTheme, styled } from "@mui/material";
import "./MainPage.css";
import { AboutClubBlock } from "./AboutClubBlock";
import { Banner } from "./Banner";
import { Map } from "./Map"; 

const ContentWrapper = styled(Box)(({ theme }) => ({
  display: "block",
  width: "100%",
  height: "initial",
  margin: "auto",
  maxWidth: "920px",
  position: "relative",
}));

export function MainPage() {
  let theme = createTheme({});

  return (
    <div className="page">
      <ContentWrapper>
        <Banner />
      </ContentWrapper>

      <ContentWrapper
        sx={{
          boxSizing: "border-box",
          padding: "0 24px",
          textAlign: "center",
          fontFamily: "Mulish-Bold, Mulish",
          [theme.breakpoints.down("md")]: {
            padding: "0 12px",
          },
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontFamily: "inherit",
            fontWeight: "bold",
            [theme.breakpoints.down("md")]: {
              marginTop: "12px",
              lineHeight: "1.5rem",
              fontSize: "1rem",
            },
          }}
        >
          Первое посещение: 1500 тенге с человека за весь день.
          <br />
          Абонемент на месяц: 15000 тенге (безлимитные посещения).
        </Typography>
        <Typography
          variant="subtitle2"
          component="div"
          sx={{
            margin: "12px 0",
            fontFamily: "inherit",
            [theme.breakpoints.down("md")]: {
              fontSize: "0.75rem",
            },
          }}
        >
          * Время работы клуба и стоимость посещения в праздничные дни может
          быть изменено
        </Typography>

        <AboutClubBlock theme={theme} />
      </ContentWrapper>

      <Map />
    </div>
  );
}
