import { Box, Link, createTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Game } from "../../../../interfaces";
import { BggRaitingBadge } from "./BggRaitingBadge";
import { GameBadge, GameCardBadges } from "./GameCardBadges";

interface GameCardProps {
  isLeftCards?: boolean;
  game: Game;
  owner?: string;
}

export function GameCard({ isLeftCards, game, owner }: GameCardProps) {
  let theme = createTheme({});
  const badges: GameBadge[] = [];
  if (game.bggRating > 8) {
    badges.push(GameBadge.Hot);
  }
  if (game.numVotes > 100) {
    badges.push(GameBadge.Hit);
  }
  if (game.id %10 === 0) {
    badges.push(GameBadge.Guest);
  }

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
  }
  const transitionColorStyle = {
    transitionDuration: ".15s",
    transitionProperty: "color",
    transitionTimingFunction: "ease-in-out",
  }

  return (
    <Box
      component="article"
      sx={{
        width: "100%",
        position: "relative",
        "&:hover .card-secondary-layout .card-secondary-layout__wrapper::before": {
          opacity: .8,
          backgroundColor: "#b6b6b6",
        },
        "&:hover .secondary-description": {
          opacity: 1,
        },
      }}
    >
      <meta content={game.id.toString()} itemProp="sku"></meta>
      <Link
        component={RouterLink}
        to={`/game/${game.id}`}
        underline="none"
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
        <Box
          sx={{
            position: "relative",
            "&::before": {
              content: '""',
              display: "block",
              paddingBottom: "100%",
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
            }}
          >
            <Box
              sx={{
                "@supports (filter:blur()) or (-webkit-filter:blur())": {
                  opacity: 1,
                },
                height: "100%",
                width: "100%",
                opacity: ".25",
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
                      /* для отображения только при фокусе
                      content-visibility: visible;
                      display: block;
                      opacity: 0; */
                    }}
                  >
                    <picture 
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        top: 0,
                        backgroundColor: "#f2f2f2",
                      }}
                    >
                      <img
                        alt={game.title}
                        title={game.title}
                        src={game.photoUrl}
                        loading="lazy"
                        style={{
                          display: "block",
                          height: "100%",
                          maxHeight: "none",
                          maxWidth: "none",
                          objectFit: "contain",
                          objectPosition: "center",
                          width: "100%",
                        }}
                      />
                    </picture>
                  </Box>
                </div>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            textAlign: "left",
            marginTop: "15px",
            ...transitionColorStyle,
            [theme.breakpoints.up("lg")]: {
              textAlign: isLeftCards ? "right" : "left",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              columnGap: "8px",
              [theme.breakpoints.up("lg")]: {
                flexDirection: isLeftCards ? "row-reverse" : "row",
              },
            }}
          >
            <BggRaitingBadge value={game.bggRating}></BggRaitingBadge>
            <Box
              component="span"
              sx={{
                fontSize: "12px",
                letterSpacing: "1.4px",
                fontWeight: 500,
                lineHeight: 1.5,
                [theme.breakpoints.up("lg")]: {
                  fontSize: "14px",
                },
              }}
            >
              {game.year}
            </Box>
          </Box>

          <Box
            sx={{
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: 1.4,
              [theme.breakpoints.up("lg")]: {
                fontSize: "20px",
              },
            }}
          >
            {game.title}
          </Box>
        </Box>
      </Link>

      <Box
        className="card-secondary-layout"
        sx={{
          ...absoluteStyle,
          pointerEvents: "none",
        }}
      >
        <Box
          className="card-secondary-layout__wrapper"
          sx={{
            position: "relative",
            "&::before": {
              content: '""',
              display: "block",
              paddingBottom: "100%",
              ...transitionOpacityStyle,
              transitionProperty: "opacity, background-color",
            },
          }}
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "30px",
                  paddingX: "8px",
                  backgroundColor: "#000",
                  color: "#fff",
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
                Дополнение
              </Box>
            </Box>
          ) : (
            <></>
          )}
          <Box
            className="secondary-description"
            sx={{
              opacity: 0,
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              right: "15px",
              bottom: "15px",
              alignItems: "flex-end",
              ...transitionOpacityStyle,
              fontSize: "15px",
              lineHeight: "25px",
              fontWeight: "bold", 
            }}
          >
            <Box>Игроков: 2-4</Box>
            <Box>Возраст: 12+</Box>
            <Box>Время партии: 30-60</Box>
            <Box>Сложность: 2.7/5</Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
