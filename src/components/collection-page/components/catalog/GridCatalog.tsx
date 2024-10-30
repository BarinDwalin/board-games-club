import { Box, createTheme } from "@mui/material";
import "./GridCatalog.css";
import { GameRecord } from "../../../../interfaces";
import { GameCard } from "./game-card";

interface GridCatalogProps {
  collection: GameRecord[];
}

export function GridCatalog({ collection }: GridCatalogProps) {
  let theme = createTheme({});

  return (
    <Box
      sx={{
        alignItems: "flex-start",
        display: "flex",
        flexWrap: "wrap",
        position: "relative",
        [theme.breakpoints.between("lg", "xl")]: {
          margin: "0 -20px",
        },
      }}
    >
      {collection.map(({ game, owner }, i) => (
        <Box
          key={game.id}
          itemScope
          itemType="http://schema.org/Product"
          sx={{
            boxSizing: "border-box",
            display: "inline-flex",
            [theme.breakpoints.up("xl")]: {
              margin: "0 0 120px",
              marginRight: i % 4 === 1 ? "50px" : "0px",
              padding: "0 25px",
              width: "calc(25% - 12.5px)",
            },
            [theme.breakpoints.between("lg", "xl")]: {
              margin: "0 0 80px",
              marginRight: i % 4 === 1 ? "30px" : "0px",
              padding: "0 15px",
              width: "calc(25% - 7.5px)",
            },
            [theme.breakpoints.between("md", "lg")]: {
              margin: "0 0 64px",
              marginRight: i % 3 === 2 ? "0px" : "34px",
              width: "calc(33.33% - 22.66667px)",
            },
            [theme.breakpoints.down("md")]: {
              margin: "0 0 60px",
              marginRight: i % 2 === 1 ? "0px" : "20px",
              width: "calc(50% - 10px)",
            },
            ".game-description": {
              [theme.breakpoints.down("md")]: {
                paddingLeft: i % 2 === 1 ? "0px" : "20px",
                paddingRight: i % 2 === 0 ? "0px" : "20px",
              },
              [theme.breakpoints.up("lg")]: {
                textAlign: i % 4 < 2 ? "right" : "left",
              },
            },
            ".game-description .game-description__badges": {
              [theme.breakpoints.up("lg")]: {
                flexDirection: i % 4 < 2 ? "row-reverse" : "row",
              },
            },
          }}
        >
          <GameCard game={game} owner={owner}></GameCard>
        </Box>
      ))}
    </Box>
  );
}
