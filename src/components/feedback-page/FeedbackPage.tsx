import { Box, Typography, createTheme } from "@mui/material";
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
        Идеи, предложения, пожелания?
      </Typography>

      <Contacts
        title="По любому вопросу пишете нам в"
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
