import {
  Box,
  Button,
  Dialog,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { useState } from "react";

export interface PollsProps {
  theme: Theme;
}

export function Polls({ theme }: PollsProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const myForm = event.target;
    const formData = new FormData(myForm);
    const urlSearchParams = new URLSearchParams({
      "form-name": "polls-tournaments",
    });

    formData.forEach((value, key) => {
      urlSearchParams.append(key, value as string);
    });

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(urlSearchParams).toString(),
    })
      .then(() => {
        setOpen(true);
      })
      .catch((error) => alert(error));
  };

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
        name="polls-tournaments"
        onSubmit={handleSubmit}
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
          name="game-list"
          type="text"
          multiline
          minRows={4}
          maxRows={10}
          variant="outlined"
        />

        <TextField
          id="polls-tournaments-prize-pool"
          label="Пожелания по призам:"
          name="prize-pool"
          type="text"
          multiline
          maxRows={4}
          variant="outlined"
        />

        <TextField
          id="polls-tournaments-help"
          label="Готовы помочь с организацией турнира? "
          helperText="Напишите, что вы можете предложить и как с вами связаться"
          name="help"
          type="text"
          multiline
          minRows={1}
          maxRows={4}
          variant="standard"
        />

        <Button
          variant="contained"
          type="submit"
          sx={{
            margin: "12px auto 40px",
            [theme.breakpoints.down("sm")]: {
              width: "100%",
            },
          }}
        >
          Отправить предложение
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="polls-tournaments-alert-dialog-title"
          aria-describedby="polls-tournaments-alert-dialog-description"
        >
          <Box sx={{ padding: "24px" }}>Спасибо за учатие в опросе ❤️</Box>
        </Dialog>
      </Box>
    </Box>
  );
}
