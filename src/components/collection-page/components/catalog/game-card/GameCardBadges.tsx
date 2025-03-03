import { Box } from "@mui/material";
import { GameBadge, GameBadgeType } from "../../../../../interfaces";
import { BadgeTopPosition } from "./BadgeTopPosition";

export interface GameCardBadgesProps {
  badges: GameBadge[];
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

          switch (badge.type) {
            case GameBadgeType.Hit:
              text = "Hit!";
              backgroundColor = "#fffd02";
              break;
            case GameBadgeType.Hot:
              backgroundColor = "#ff3d5d";
              text = "Hot";
              break;
            case GameBadgeType.Guest:
              backgroundColor = "#a7b2bb";
              text = "Временно";
              isShortTitle = false;
              break;
            case GameBadgeType.Eng:
              backgroundColor = "#a7b2bb";
              text = "Eng"; 
              break;
            case GameBadgeType.Top:
              return (
                <BadgeTopPosition position={badge.value!}></BadgeTopPosition>
              );
          }

          return (
            <Box
              key={badge.type}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "30px",
                width: isShortTitle ? "30px" : "80px",
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
