import { Box, Link, Typography, createTheme } from "@mui/material";
import { Contacts } from "../rules-page/Contacts";

export function FeedbackPage() {
  let theme = createTheme({});

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: "24px",
        justifyContent: "center",
        margin: "60px 24px 80px",
      }}
    >
      <Typography
        variant="h5"
        component="span"
        sx={{
          textAlign: "center",
        }}
      >
        Идеи, предложения, пожелания? Пишите нам на{" "}
        <Link
          href="https://forms.gle/hV1oCmzwdJy9iviV8"
          underline="none"
          target="_blank"
          rel="noopener"
          sx={{ padding: "0px 0px" }}
        >
          форму обратной связи
        </Link>
      </Typography>

      <Contacts
        title="Так же любые вопросы задавайте в"
        sx={{
          margin: "16px 0 64px",
          [theme.breakpoints.down("md")]: {
            margin: "16px 0 40px",
          },
        }}
      />
    </Box>
  );
}
