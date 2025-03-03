import { Box, SxProps, createTheme } from "@mui/material";
import { Game } from "../../../../../interfaces";

interface GameCardSecondaryDescriptionProps {
  game: Game;
  sx: SxProps;
}

export function GameCardSecondaryDescription({
  game,
  sx,
}: GameCardSecondaryDescriptionProps) {
  let theme = createTheme({});

  return (
    <Box
      className="secondary-description"
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        right: "15px",
        bottom: "15px",
        alignItems: "flex-end",
        fontSize: "15px",
        lineHeight: "25px",
        fontWeight: "bold",
        [theme.breakpoints.down("sm")]: {
          fontSize: "12px",
          lineHeight: "17px",
        },
        ...sx,
      }}
    >
      <Box>Игроков: {game.playersMin || '?'}-{game.playersMax || '?'}</Box>
      <Box>Возраст: {game.age}+</Box>
      <Box>Время партии: {getTimeBoundary(game.timeMin, game.timeMax)}</Box>
      <Box>Рейтинг Т: {game.rating.teseraRating || '--'}</Box>
      <Box>Оценок: {game.rating.teseraNumVotes || '--'}</Box>
    </Box>
  );
}

function getTimeBoundary(timeMin?: number, timeMax?: number): string {
  if (timeMin === timeMax) {
    return timeMin?.toString() || '---';
  }

  if (timeMin && timeMax) {
    return `${timeMin}-${timeMax}`;
  }

  return (timeMin || timeMax)?.toString() || '---';
}