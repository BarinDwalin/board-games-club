import { Box, Button, TextField, Theme, Typography } from "@mui/material";

export interface PollsProps {
  theme: Theme;
}

export function Polls({ theme }: PollsProps) {
  return (
    <Box
      sx={{
        padding: "0 12px",
        textAlign: "center",
      }}
    >
      <Typography variant="subtitle1" component="div">
        В ближайшее время турниров не планируется.
        <br />
        Хотите это исправить? Нужна лишь ваша активность
      </Typography>

      <Box
        data-netlify="true"
        component="form"
        sx={{
          display: "flex",
          flexFlow: "column",
          margin: "12px auto 40px",
          maxWidth: "720px",
          rowGap: "12px",
          justifyContent: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="polls-tournaments-game-list"
          label="В какие игры хотите сразиться:"
          multiline
          minRows={4}
          maxRows={10}
          variant="outlined"
        />

        <TextField
          id="polls-tournaments-prize-pool"
          label="Пожелания по призам:"
          multiline
          maxRows={4}
          variant="outlined"
        />

        <TextField
          id="polls-tournaments-help"
          label="Готовы помочь с организацией турнира? "
          helperText="Напишите, что вы можете предложить и как с вами связаться"
          multiline
          minRows={1}
          maxRows={4}
          variant="standard"
        />

        <Button
          variant="contained"
          sx={{
            margin: "12px auto 40px",
            [theme.breakpoints.down("sm")]: {
              width: "100%",
            },
          }}
        >
          Отправить предложение
        </Button>
      </Box>
    </Box>
  );
}
