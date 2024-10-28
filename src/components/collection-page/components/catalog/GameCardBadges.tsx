import { Box } from "@mui/material";

interface GameCardBadgesProps {
  badges: GameBadge[];
}

export enum GameBadge {
  Hot,
  Hit,
  Guest,
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
          let backgroundColor = "#666e75";
          let text = "";
          let isShortTitle = true;

          switch (badge) {
            case GameBadge.Hit:
              text = "Hit!";
              backgroundColor = "#fffd02";
              break;
            case GameBadge.Hot:
              backgroundColor = "#ff3d5d";
              text = "Hot";
              break;
            case GameBadge.Guest:
              backgroundColor = "#a7b2bb";
              text = "Временно";
              isShortTitle = false;
              break;
          }

          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "30px",
                width: isShortTitle ?  "30px" : "80px",
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
