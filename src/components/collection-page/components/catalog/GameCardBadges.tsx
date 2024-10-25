import { Box } from "@mui/material";

interface GameCardBadgesProps {
  badges: GameBadge[];
}

export enum GameBadge {
  Hot,
  Hit,
}

export function GameCardBadges({ badges }: GameCardBadgesProps) {
  return (
    <Box
      sx={{
        display: "flex",
        position: "absolute",
        left: 0,
        top: 0,
        pointerEvents: "none",
      }}
    >
      <Box
        sx={{
          display: "inherit",
          margin: "-25%",
          padding: "25%",
        }}
      >
        {badges.map((badge) => {
          const backgroundColor =
            badge === GameBadge.Hit ? "#fffd02" : "#ff3d5d";
          let text = "";
          switch (badge) {
            case GameBadge.Hit:
              text = "Hit!";
              break;
            case GameBadge.Hot:
              text = "Hot";
              break;
          }

          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "30px",
                width: "30px",
                backgroundColor: backgroundColor,
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              {text}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
