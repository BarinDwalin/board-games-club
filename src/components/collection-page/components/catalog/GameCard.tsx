import { Box, Link, createTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Game } from "../../../../interfaces";
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

  const absoluteStyle = {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  };

  return (
    <Box
      component="article"
      sx={{
        width: "100%",
        position: "relative",
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
          transitionDuration: ".15s",
          transitionProperty: "color",
          transitionTimingFunction: "ease-in-out",
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
            transitionDuration: ".15s",
            transitionProperty: "color",
            transitionTimingFunction: "ease-in-out",
            [theme.breakpoints.up("lg")]: {
              textAlign: isLeftCards ? "right" : "left",
            },
          }}
        >
          <Box>{game.title}</Box>
          <Box>bggRating: {game.bggGeekRating}</Box>
          <Box> {game.year}</Box>
        </Box>
      </Link>

      <Box
        sx={{
          ...absoluteStyle,
          pointerEvents: "none",
        }}
      >
        <Box
          sx={{
            position: "relative",
            "&::before": {
              content: '""',
              display: "block",
              paddingBottom: "118%",
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
        </Box>
      </Box>
    </Box>
  );
}
