import { Box, Theme } from "@mui/material";

export function CommonSuggestion(props: { theme: Theme }) {
  return (
    <Box
      sx={{
        [props.theme.breakpoints.between("lg", "xl")]: {
          paddingLeft: "40px",
        },
        [props.theme.breakpoints.up("md")]: {
          paddingLeft: "30px",
          flexBasis: "480px",
          flexGrow: 0,
          flexShrink: 1,
          maxWidth: "480px",
        },
        [props.theme.breakpoints.down("md")]: {
          marginTop: "20px",
        },
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: "-50px",
          [props.theme.breakpoints.down("lg")]: {
            top: "-80px",
          },
          [props.theme.breakpoints.down("md")]: {
            display: "none",
          },
        }}
      >
        {[
          "The Gang 🃏🃏🃏🃏🃏",
          "The Gang 🃏🃏🃏🃏🃏",
          "The Gang 🃏🃏🃏🃏🃏",
          "The Gang 🃏🃏🃏🃏🃏",
          "The Gang 🃏🃏🃏🃏🃏",
          "The Gang 🃏🃏🃏🃏🃏",
          "The Gang 🃏🃏🃏🃏",
          "The Gang 🃏🃏🃏",
          "The Gang 🃏🃏",
          "🕵🏻🕵🏻 Омерта 🕵🏻🕵🏻",
          "Покорение Марса Арес 🚀 🪐",
          "Gloomhaven",
          "Slay the Spire",
          "Slay the Spire",
          "Slay the Spire",
          "Slay the Spire",
          "Slay the Spire",
          "Slay the Spire",
          (<div>
            <img width="24" height="24" src="./images/icons/cultist.png" alt="cultist" />
            <img width="24" height="24" src="./images/icons/donu.png" alt="donu" />
            <img width="24" height="24" src="./images/icons/donu.png" alt="donu" />
            <img width="24" height="24" src="./images/icons/donu.png" alt="donu" />
          </div>),
          "WAAAAGH!"
        ].map((item, index) => (
          <div key={'suggestion' + index}>{item}</div>
        ))}
      </Box>
      <Box
        sx={{
          [props.theme.breakpoints.up("md")]: {
            display: "none",
          },
        }}
      >
        {[
          "The Gang?    🃏🃏🃏🃏🃏",
          "The Gang      🃏🃏🃏🃏",
          "The Gang!     🃏🃏🃏",
          "The Gang??? 🃏🃏",
          "Покорение Марса Арес 🚀 🪐",
          (<div>
            <img width="24" height="24" src="./images/icons/cultist.png" alt="cultist" />
            <img width="24" height="24" src="./images/icons/donu.png" alt="donu" />
            <img width="24" height="24" src="./images/icons/donu.png" alt="donu" />
            <img width="24" height="24" src="./images/icons/donu.png" alt="donu" />
          </div>)
        ].map((item, index) => (
          <div key={'suggestion' + index} style={{whiteSpace: "pre"}}>{item}</div>
        ))}
      </Box>
    </Box>
  );
}
