import { Box, Link, SxProps, Typography } from "@mui/material";

export function Contacts({
  sx,
  title = "Остались вопросы? Пишите нам в чат",
}: {
  sx: SxProps;
  title?: string;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        ...sx,
      }}
    >
      <Typography
        variant="h6"
        component="span"
        sx={{
          textAlign: "center",
        }}
      >
        {title}&nbsp;
        <Link
          href="https://t.me/RollMove"
          underline="none"
          target="_blank"
          rel="noopener"
          sx={{ padding: "0px 0px" }}
        >
          Telegram
        </Link>{" "}
        или в&nbsp;
        <Link
          href="https://www.instagram.com/roll.move/"
          underline="none"
          target="_blank"
          rel="noopener"
          sx={{ padding: "0px 0px" }}
        >
          Instagram
        </Link>
      </Typography>
    </Box>
  );
}
