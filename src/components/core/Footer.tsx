import {
  Container,
  Box,
  Typography,
  createTheme,
  Link,
  ThemeProvider,
} from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";

export function Footer() {
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
      <Container
        maxWidth={false}
        sx={{
          position: "relative",
          background: "#000",
          color: "#fff",
          paddingBottom: '24px',
          "&::before, &::after": {
            content: '""',
            height: 48,
            width: 48,
            backgroundImage: `url("/images/footer-logo.svg")`,
            backgroundRepeat: "no-repeat",
            position: "absolute",
            top: 16,
            left: 8,
            [theme.breakpoints.between("md", "lg")]: {
              height: 42,
              width: 42,
            },
          },
          "&::after": {
            left: "initial",
            right: 8,
            transform: "scaleX(-1)",
          },
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            px: 0,
            pt: 8,
            pb: 6,
            [theme.breakpoints.down("md")]: {
              px: 4,
              pt: 4,
              textAlign: "center",
            },
          }}
        >
          <Link href="/" underline="none" sx={{ display: "inline-flex" }}>
            <img
              width="32"
              height="32"
              src="/images/club-logo.png"
              alt="логотип клуба в виде мипла"
            />
            <Typography
              variant="h5"
              component="div"
              sx={{
                ml: 2,
              }}
            >
              Кинь-Двинь 
            </Typography>
          </Link>
        </Container>

        <Container
          maxWidth="md"
          sx={{
            px: 0,
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Link
              href="tel:77778828122"
              underline="none"
              sx={{
                display: "block",
                [theme.breakpoints.down("sm")]: {
                  mb: 4,
                },
              }}
            >
              <Typography variant="h5" component="div">
                +7 777 882-81-22
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{ color: "#b3b3b3" }}
              >
                Евгений
              </Typography>
              <Typography variant="subtitle1" component="div">
                Вт Чт Пт Сб Вс 16:00-22:00
              </Typography>
            </Link>

            <ul
              style={{
                display: "flex",
                padding: 0,
                marginTop: 20,
                marginBottom: 20,
                columnGap: 30,
                listStyleType: "none",
              }}
            >
              <li>
                <Link
                  href="https://t.me/RollMove"
                  underline="none"
                  target="_blank"
                  rel="noopener"
                  sx={{ display: "inline-flex" }}
                >
                  <TelegramIcon sx={{ paddingRight: 1 }} />
                  <Typography variant="body1" component="span">
                    Telegram
                  </Typography>
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.instagram.com/roll.move/"
                  underline="none"
                  target="_blank"
                  rel="noopener"
                  sx={{ display: "inline-flex" }}
                >
                  <InstagramIcon sx={{ paddingRight: 1 }} />
                  <Typography variant="body1" component="span">
                    Instagram
                  </Typography>
                </Link>
              </li>
            </ul>
          </Box>

          <Box sx={{ marginTop: 4, borderTop: "1px solid #ffffff1a" }}>
            <Typography
              variant="body2"
              component="div"
              sx={{ my: 4, color: "#4d4d4d", fontSize: 12 }}
            >
              Клуб настольных игр «Кинь&nbsp;Двинь» совместно с&nbsp;сообществом
              НРИ и&nbsp;Вархаммер {new Date().getFullYear()}
              <br />
              Астана, Проспект Туран, 40/2, НП&nbsp;7, ЖК&nbsp;"Alma&nbsp;Park"
            </Typography>
            <Box sx={{ marginTop: 4 }}>
              <img
                width="32"
                height="32"
                src="/images/footer/kaspi-logo.png"
                alt="логотип kaspi qr"
              />
            </Box>
          </Box>
        </Container>
      </Container>
    </ThemeProvider>
  );
}
