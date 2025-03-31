import { Box, Theme, Typography } from "@mui/material";

export function SpecialPrices(props: { theme: Theme }) {
  return (
    <Box
      sx={{
        margin: "24px 0 32px",
        [props.theme.breakpoints.down("md")]: {
          margin: "24px 0",
        },
      }}
    >
      <Typography variant="h5" component="div">
        Специальное предложение
      </Typography>

      <Typography
        variant="subtitle1"
        component="div"
        sx={{
          marginTop: "12px",
        }}
      >
        Первое посещение: 1500 тенге с человека за весь день.
        <br />
        Абонемент на месяц: 15000 тенге (безлимитные посещения).
      </Typography>
    </Box>
  );
}
