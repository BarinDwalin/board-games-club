import { Box, Theme, createTheme, styled } from "@mui/material";
import { PropsWithChildren, useState } from "react";
import "./MasonryCatalog.css";
import { Game, GameRecord } from "../../../../interfaces";
import { GameCard } from "./game-card";

const CatalogWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  flexWrap: "wrap",
  position: "relative",

  [theme.breakpoints.between("lg", "xl")]: {
    margin: "0 -15px",
  },

  [theme.breakpoints.between("lg", "xl")]: {
    margin: "0 -20px",
  },
}));

const CatalogItem = (
  props: PropsWithChildren & {
    theme: Theme;
    index: number;
    isWide: boolean;
    isWide2Col: boolean;
    isMarginRight4Col?: boolean;
    isMarginRight2Col?: boolean;
    onSelectItem: () => void;
  }
) => {
  let bigItem = false;
  const bigItemWithMargin = props.index === 333;
  switch (props.index % 24) {
    case 2:
    case 3:
    case 8:
      bigItem = true;
      break;
  }

  return (
    <Box
      itemScope
      itemType="http://schema.org/Product"
      onClick={() => props.onSelectItem()}
      sx={{
        boxSizing: "border-box",
        display: "inline-flex",
        [props.theme.breakpoints.up("xl")]: {
          margin: "0 0 120px",
          marginRight: props.isMarginRight4Col ? "50px" : "0px",
          marginTop: bigItem && bigItemWithMargin ? "-252px" : "0px",
          padding: "0 25px",
          width: props.isWide ? "calc(50% - 25px)" : "calc(25% - 12.5px)",
        },
        [props.theme.breakpoints.between("lg", "xl")]: {
          margin: "0 0 80px",
          marginRight: props.isMarginRight4Col ? "30px" : "0px",
          marginTop: bigItem && bigItemWithMargin ? "-252px" : "0px",
          padding: "0 15px",
          width: props.isWide ? "calc(50% - 15px)" : "calc(25% - 7.5px)",
        },
        [props.theme.breakpoints.between("md", "lg")]: {
          margin: "0 0 64px",
          marginRight: props.index % 3 === 2 ? "0px" : "34px",
          marginTop: bigItem && bigItemWithMargin ? "-252px" : "0px",
          width: "calc(33.33% - 22.66667px)",
        },
        [props.theme.breakpoints.down("md")]: {
          margin: "0 0 60px",
          marginRight: props.isMarginRight2Col ? "20px" : "0px",
          marginTop: bigItemWithMargin ? "-252px" : "0px",
          width: props.isWide2Col ? "100%" : "calc(50% - 10px)",
        },
        ".game-description": {
          [props.theme.breakpoints.down("md")]: {
            paddingLeft: props.isWide2Col || props.isMarginRight2Col ? "20px" : "0px",
            paddingRight: props.isWide2Col || props.isMarginRight2Col ? "0px" : "20px",
          },
        },
      }}
    >
      {props.children}
    </Box>
  );
};

interface MasonryCatalogProps {
  collection: GameRecord<Game>[];
}

export function MasonryCatalog({ collection }: MasonryCatalogProps) {
  let theme = createTheme({});
  const [selectedCardId, setSelectedCardId] = useState<number>();
  const handleClick = (id: number) => {
    setSelectedCardId((value) => (value !== id ? id : undefined));
  };

  return (
    <CatalogWrapper>
      {collection.map(({ game, owner }, i) => {
        const positionInBlock = (i % 24) + 1;
        const isWide = [1, 10, 15, 24].includes(positionInBlock);
        const isWide2Col = [3, 10, 17, 22].includes(positionInBlock);
        const isRightPosition4Col = [
          2, 3, 6, 7, 10, 13, 14, 16, 17, 20, 21, 24,
        ].includes(positionInBlock);
        const isMarginRight4Col = [1, 5, 9, 12, 15, 19, 23].includes(
          positionInBlock
        );
        const isMarginRight2Col = [1, 4, 6, 8, 11, 13, 15, 18, 20, 23].includes(
          positionInBlock
        );

        return (
          <CatalogItem
            key={game.id}
            theme={theme}
            index={i}
            isWide={isWide}
            isWide2Col={isWide2Col}
            isMarginRight4Col={isMarginRight4Col}
            isMarginRight2Col={isMarginRight2Col}
            onSelectItem={() => handleClick(game.id)}
          >
            <GameCard
              game={game}
              owner={owner}
              isSelected={selectedCardId === game.id}
              isWide={isWide}
              isWide2Col={isWide2Col}
              isInverseAlign={isRightPosition4Col}
              isRightPosition4Col={isRightPosition4Col}
            ></GameCard>
          </CatalogItem>
        );
      })}
    </CatalogWrapper>
  );
}
