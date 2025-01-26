import { Box, Theme, styled } from "@mui/material";
import { PropsWithChildren, useState } from "react";
import { Game, GameRecord } from "../../../interfaces";
import { GameCard } from "../../collection-page/components/catalog/game-card";

const CatalogWrapper = styled(Box)(({ theme }) => ({
  display: "grid",
  gridRowGap: "50px",
  gridColumnGap: "40px",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",

  [theme.breakpoints.between("lg", "xl")]: {},
  [theme.breakpoints.up("xl")]: {},
  [theme.breakpoints.down("lg")]: {
    gridRowGap: "60px",
    gridColumnGap: "20px",
  },
}));

const CatalogItem = (
  props: PropsWithChildren & {
    theme: Theme;
    index: number;
    onSelectItem: () => void;
  }
) => {
  const isLeftCard = props.index % 2 === 0;

  return (
    <Box
      itemScope
      itemType="http://schema.org/Product"
      onClick={() => props.onSelectItem()}
      sx={{
        boxSizing: "border-box",
        ".game-description": {
          [props.theme.breakpoints.down("md")]: {
            paddingLeft: isLeftCard ? "20px" : "0px",
            paddingRight: isLeftCard ? "0px" : "20px",
          },
        },
      }}
    >
      {props.children}
    </Box>
  );
};

export function FilteredCollection(props: {
  theme: Theme;
  filteredCollection: GameRecord<Game>[];
}) {
  const [selectedCardId, setSelectedCardId] = useState<number>();
  const handleClick = (game: Game) => {
    setSelectedCardId((value) => (value !== game.id ? game.id : undefined));
  };

  return (
    <Box
      component="section"
      sx={{
        flex: "0 0 50%",
        marginTop: "45px",
        boxSizing: "border-box",
        [props.theme.breakpoints.between("lg", "xl")]: {
          paddingRight: "40px",
        },
        [props.theme.breakpoints.up("lg")]: {
          marginTop: "0",
        },
        [props.theme.breakpoints.up("md")]: {
          width: "50%",
          paddingRight: "30px",
        },
        [props.theme.breakpoints.down("md")]: {
          marginLeft: "-20px",
          marginRight: "-20px",
        },
      }}
    >
      <CatalogWrapper>
        {props.filteredCollection.map(({ game, owner }, i) => (
          <CatalogItem
            key={game.id}
            theme={props.theme}
            index={i}
            onSelectItem={() => handleClick(game)}
          >
            <GameCard
              game={game}
              owner={owner}
              isSelected={selectedCardId === game.id}
            ></GameCard>
          </CatalogItem>
        ))}
      </CatalogWrapper>
    </Box>
  );
}
