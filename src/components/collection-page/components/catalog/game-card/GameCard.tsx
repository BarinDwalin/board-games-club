import { Box, Theme, /* Link, */ createTheme, styled } from "@mui/material";
// import { Link as RouterLink } from "react-router-dom";
import { Game } from "../../../../../interfaces";
import { BggRaitingBadge } from "./BggRaitingBadge";
import { GameBadge, GameCardBadges } from "./GameCardBadges";
import { GameCardSecondaryDescription } from "./GameCardSecondaryDescription";
import { PropsWithChildren } from "react";
import { BadgeAddon } from "./BadgeAddon";
import { GameImage } from "./GameImage";

const absoluteStyle = {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  top: 0,
};
const transitionOpacityStyle = {
  transitionDuration: ".15s",
  transitionProperty: "opacity",
  transitionTimingFunction: "ease-in-out",
};
const transitionColorStyle = {
  transitionDuration: ".15s",
  transitionProperty: "color",
  transitionTimingFunction: "ease-in-out",
};
const cardSecondaryLayoutWrapperSelectedStyle = {
  opacity: 0.8,
  background: "linear-gradient(-60deg,  #fff, 30%, #464646)",
};

const Article = styled("article")(() => ({
  width: "100%",
  position: "relative",
  "&:hover .card-secondary-layout .card-secondary-layout__inner::before": {
    ...cardSecondaryLayoutWrapperSelectedStyle,
  },
  "&:hover .secondary-description": {
    opacity: 1,
  },
  "&:focus .game-description, &:hover .game-description": {
    color: "#c6b09f",
  },
}));

const LinkWrapper = (props: PropsWithChildren) => (
  <Box
    //component={RouterLink}
    //to={`/`}
    //underline="none"
    sx={{
      display: "block",
      width: "100%",
      cursor: "pointer",
      ...transitionColorStyle,
      color: "inherit",
      fontFamily: "inherit",
      outline: "none",
      textDecoration: "none",
      touchAction: "manipulation",
    }}
  >
    {props.children}
  </Box>
);
const GameImageWrapper = (
  props: PropsWithChildren & {
    theme: Theme;
    isWide?: boolean;
    isWide2Col?: boolean;
    isInverseAlign?: boolean;
  }
) => (
  <Box
    sx={{
      position: "relative",
      "&::before": {
        content: '""',
        display: "block",
        paddingBottom: "100%",
      },

      [props.theme.breakpoints.up("lg")]: {
        marginLeft: props.isWide && !props.isInverseAlign ? "auto" : "0px",
        marginRight: props.isWide && props.isInverseAlign ? "auto" : "0px",
        width: props.isWide ? "67%" : "initial",
      },
      [props.theme.breakpoints.down("md")]: {
        marginLeft: props.isWide2Col ? "auto" : "0px",
        width: props.isWide2Col ? "67%" : "initial",
      },
    }}
  >
    <Box
      sx={{
        ...absoluteStyle,
        backgroundColor: "#f2f2f2",
        color: "#000",
        overflowX: "hidden",
        overflowY: "hidden",
        "&::before": {
          width: "100%",
          height: "100%",
          display: "block",
          zIndex: 1,
          position: "absolute",

          [props.theme.breakpoints.up("lg")]: {
            ...(props.isWide
              ? {
                  content: '""',
                  background: props.isInverseAlign
                    ? "linear-gradient(90deg, rgb(255 255 255 / 0%) 80%, rgb(255 255 255 / 80%) 100%)"
                    : "linear-gradient(90deg, rgb(255 255 255 / 80%) 0%, rgb(255 255 255 / 0%) 20%)",
                }
              : {}),
          },
          [props.theme.breakpoints.down("md")]: {
            ...(props.isWide2Col
              ? {
                  content: '""',
                  background:
                    "linear-gradient(90deg, rgb(255 255 255 / 80%) 0%, rgb(255 255 255 / 0%) 20%)",
                }
              : {}),
          },
        },
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            zIndex: 0,
            ...absoluteStyle,
          }}
        >
          <div
            style={{
              flexGrow: 1,
            }}
          >
            <Box
              sx={{
                ...absoluteStyle,
                zIndex: -1,
                opacity: 1,
              }}
            >
              {props.children}
            </Box>
          </div>
        </Box>
      </Box>
    </Box>
  </Box>
);
const gameDescriptionWideStyle = {
  position: "absolute",
  display: "flex",
  top: 0,
  bottom: 0,
  paddingTop: "15px",
  flexDirection: "column",
  justifyContent: "center",
  width: "45%",
};
const GameDescription = (
  props: PropsWithChildren & {
    theme: Theme;
    isWide?: boolean;
    isWide2Col?: boolean;
    isInverseAlign?: boolean;
  }
) => (
  <Box
    className="game-description"
    sx={{
      marginTop: "15px",
      ...transitionColorStyle,
      [props.theme.breakpoints.up("lg")]: {
        ...(props.isWide
          ? {
              ...gameDescriptionWideStyle,
              ...(props.isInverseAlign ? { right: 0 } : { left: 0 }),
              marginTop: "0px",
            }
          : {}),
        textAlign:
          (props.isWide && !props.isInverseAlign) ||
          (!props.isWide && props.isInverseAlign)
            ? "left"
            : "right",
      },
      [props.theme.breakpoints.down("md")]: {
        textAlign: "left",
        ...(props.isWide2Col
          ? {
              ...gameDescriptionWideStyle,
              left: 0,
              marginTop: "0px",
            }
          : {}),
      },
    }}
  >
    {props.children}
  </Box>
);
const GameDescriptionBadges = (
  props: PropsWithChildren & {
    theme: Theme;
    isWide?: boolean;
    isInverseAlign?: boolean;
  }
) => (
  <Box
    className="game-description__badges"
    sx={{
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      columnGap: "8px",
      zIndex: 2,
      [props.theme.breakpoints.up("lg")]: {
        flexDirection:
          (props.isWide && !props.isInverseAlign) ||
          (!props.isWide && props.isInverseAlign)
            ? "row"
            : "row-reverse",
      },
    }}
  >
    {props.children}
  </Box>
);
const Title = styled(Box)<{ isWide2Col?: boolean }>(
  ({ theme, isWide2Col }) => ({
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: 1.4,
    zIndex: 999,
    [theme.breakpoints.up("lg")]: {
      fontSize: "20px",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: isWide2Col ? "22px" : "16px",
    },
  })
);
const BlockYear = styled("span")<{ isWide2Col?: boolean }>(
  ({ theme, isWide2Col }) => ({
    fontSize: "12px",
    letterSpacing: "1.4px",
    fontWeight: 500,
    lineHeight: 1.5,
    [theme.breakpoints.up("lg")]: {
      fontSize: "14px",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: isWide2Col ? "16px" : "13px",
    },
  })
);
const SecondaryLayout = (
  props: PropsWithChildren & {
    theme: Theme;
    isSelected?: boolean;
    isWide?: boolean;
    isWide2Col?: boolean;
    isInverseAlign?: boolean;
  }
) => (
  <Box
    className="card-secondary-layout"
    sx={{
      ...absoluteStyle,
      zIndex: 2,
      pointerEvents: "none",
    }}
  >
    <Box
      className="card-secondary-layout__inner"
      sx={{
        position: "relative",
        "&::before": {
          content: '""',
          display: "block",
          paddingBottom: "100%",
          ...(props.isSelected
            ? cardSecondaryLayoutWrapperSelectedStyle
            : { opacity: 0 }),
          ...transitionOpacityStyle,
        },

        [props.theme.breakpoints.up("lg")]: {
          marginLeft: props.isWide && !props.isInverseAlign ? "auto" : "0px",
          marginRight: props.isWide && props.isInverseAlign ? "auto" : "0px",
          width: props.isWide ? "67%" : "initial",
        },
        [props.theme.breakpoints.down("md")]: {
          marginLeft: props.isWide2Col ? "auto" : "0px",
          width: props.isWide2Col ? "67%" : "initial",
        },
      }}
    >
      {props.children}
    </Box>
  </Box>
);

interface GameCardProps {
  game: Game;
  owner?: string;
  isSelected?: boolean;
  isWide?: boolean;
  isWide2Col?: boolean;
  isInverseAlign?: boolean;
  isRightPosition4Col?: boolean;
}

export function GameCard({
  game,
  owner,
  isSelected,
  isWide,
  isWide2Col,
  isInverseAlign,
  isRightPosition4Col,
}: GameCardProps) {
  let theme = createTheme({});
  const badges: GameBadge[] = [];
  if (game.bggRating > 8) {
    badges.push(GameBadge.Hot);
  }
  if (game.numVotes > 100) {
    badges.push(GameBadge.Hit);
  }
  if (game.id % 10 === 0) {
    badges.push(GameBadge.Guest);
  }

  return (
    <Article>
      <meta content={game.id.toString()} itemProp="sku"></meta>
      <LinkWrapper>
        <GameImageWrapper
          theme={theme}
          isWide={isWide}
          isWide2Col={isWide2Col}
          isInverseAlign={isInverseAlign}
        >
          <GameImage title={game.title} src={game.photoUrl}></GameImage>
        </GameImageWrapper>

        <GameDescription
          theme={theme}
          isWide={isWide}
          isWide2Col={isWide2Col}
          isInverseAlign={isInverseAlign}
        >
          <GameDescriptionBadges
            theme={theme}
            isWide={isWide}
            isInverseAlign={isInverseAlign}
          >
            <BggRaitingBadge value={game.bggRating}></BggRaitingBadge>
            <BlockYear isWide2Col={isWide2Col}>{game.year}</BlockYear>
          </GameDescriptionBadges>
          <Title isWide2Col={isWide2Col}>{game.title}</Title>
        </GameDescription>
      </LinkWrapper>

      <SecondaryLayout
        theme={theme}
        isSelected={isSelected}
        isWide={isWide}
        isWide2Col={isWide2Col}
        isInverseAlign={isInverseAlign}
      >
        <GameCardBadges badges={badges}></GameCardBadges>
        {game.isAddition ? (
          <Box
            sx={{
              position: "absolute",
              top: "0px",
              right: "0px",
            }}
          >
            <BadgeAddon></BadgeAddon>
          </Box>
        ) : (
          <></>
        )}
        <GameCardSecondaryDescription
          game={game}
          sx={{
            opacity: isSelected ? 1 : 0,
            ...transitionOpacityStyle,
            [theme.breakpoints.down("md")]: isWide2Col
              ? {
                  fontSize: "15px",
                  lineHeight: "20px",
                }
              : {},
          }}
        ></GameCardSecondaryDescription>
      </SecondaryLayout>
    </Article>
  );
}
