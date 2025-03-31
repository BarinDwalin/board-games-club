import {
  Box,
  Divider,
  ThemeProvider,
  Typography,
  createTheme,
  styled,
} from "@mui/material";
import "./MainPage.css";
import { AboutClubBlock } from "./AboutClubBlock";
import { Banner } from "./Banner";
import { Map } from "./Map";
import { SpecialPrices } from "./SpecialPrices";

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

  theme.typography.h5 = {
    ...theme.typography.h5,
    [theme.breakpoints.down("md")]: {
      lineHeight: "1.5rem",
      fontSize: "1.25rem",
    },
  };
  theme.typography.subtitle1 = {
    ...theme.typography.subtitle1,
    [theme.breakpoints.down("md")]: {
      lineHeight: "1.5rem",
      fontSize: "1rem",
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="page">
        <ContentWrapper>
          <Banner />
        </ContentWrapper>

        <ContentWrapper
          sx={{
            boxSizing: "border-box",
            padding: "0 24px",
            textAlign: "center",
            [theme.breakpoints.down("md")]: {
              padding: "0 12px",
            },
          }}
        >
          <Typography
            variant="subtitle1"
            component="div"
            sx={{
              margin: "12px 0 40px",
            }}
          >
            * Время работы клуба и стоимость посещения в праздничные дни может
            быть изменено
          </Typography>

          <Divider />
          <SpecialPrices theme={theme} />
          <Divider />

          <AboutClubBlock theme={theme} />
        </ContentWrapper>

        <Map />
      </div>
    </ThemeProvider>
  );
}
