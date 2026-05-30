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
        <b>Студентам</b> скидка 1000 тенге.
        <br />
        <b>Абонемент</b> на месяц: 20000 тенге (безлимитные посещения).
        <br />
        <b>Группам</b> от 6 человек по предварительному бронированию скидка 1000 тенге на человека (не суммируется со студенческой).
      </Typography>
    </Box>
  );
}
