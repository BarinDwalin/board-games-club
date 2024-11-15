import { Box, Theme, createTheme, styled } from "@mui/material";
import { PropsWithChildren, useState } from "react";
import "./GridCatalog.css";
import { GameRecord } from "../../../../interfaces";
import { GameCard } from "./game-card";

const CatalogWrapper = styled(Box)(({ theme }) => ({
  alignItems: "flex-start",
  display: "flex",
  flexWrap: "wrap",
  position: "relative",
  [theme.breakpoints.between("lg", "xl")]: {
    margin: "0 -15px",
  },
  [theme.breakpoints.up("xl")]: {
    margin: "0 -20px",
  },
}));

const CatalogItem = (
  props: PropsWithChildren & {
    theme: Theme;
    index: number;
    onSelectItem: () => void;
  }
) => (
  <Box
    itemScope
    itemType="http://schema.org/Product"
    onClick={() => props.onSelectItem()}
    sx={{
      boxSizing: "border-box",
      display: "inline-flex",
      [props.theme.breakpoints.up("xl")]: {
        margin: "0 0 120px",
        marginRight: props.index % 4 === 1 ? "50px" : "0px",
        padding: "0 25px",
        width: "calc(25% - 12.5px)",
      },
      [props.theme.breakpoints.between("lg", "xl")]: {
        margin: "0 0 80px",
        marginRight: props.index % 4 === 1 ? "30px" : "0px",
        padding: "0 15px",
        width: "calc(25% - 7.5px)",
      },
      [props.theme.breakpoints.between("md", "lg")]: {
        margin: "0 0 64px",
        marginRight: props.index % 3 === 2 ? "0px" : "34px",
        width: "calc(33.33% - 22.66667px)",
      },
      [props.theme.breakpoints.down("md")]: {
        margin: "0 0 60px",
        marginRight: props.index % 2 === 1 ? "0px" : "20px",
        width: "calc(50% - 10px)",
      },
      ".game-description": {
        [props.theme.breakpoints.down("md")]: {
          paddingLeft: props.index % 2 === 1 ? "0px" : "20px",
          paddingRight: props.index % 2 === 0 ? "0px" : "20px",
        },
        [props.theme.breakpoints.up("lg")]: {
          textAlign: props.index % 4 < 2 ? "right" : "left",
        },
      },
    }}
  >
    {props.children}
  </Box>
);

interface GridCatalogProps {
  collection: GameRecord[];
}

export function GridCatalog({ collection }: GridCatalogProps) {
  let theme = createTheme({});
  const [selectedCardId, setSelectedCardId] = useState<number>();
  const handleClick = (id: number) => {
    setSelectedCardId((value) => (value !== id ? id : undefined));
  };

  return (
    <CatalogWrapper>
      {collection.map(({ game, owner }, i) => (
        <CatalogItem
          key={game.id}
          index={i}
          theme={theme}
          onSelectItem={() => handleClick(game.id)}
        >
          <GameCard
            game={game}
            owner={owner}
            isSelected={selectedCardId === game.id}
            isInverseAlign={i % 4 > 1}
          ></GameCard>
        </CatalogItem>
      ))}
    </CatalogWrapper>
  );
}
