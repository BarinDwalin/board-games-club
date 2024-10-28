import { Box, createTheme } from "@mui/material";

interface BggRaitingBadgeProps {
  value: number;
}

export function BggRaitingBadge({ value }: BggRaitingBadgeProps) {
  const raiting = Math.round(10 * (value || 0)) / 10;
  let theme = createTheme({});
  const backgroundColor = getRaitingColor(raiting);

  return (
    <Box
      sx={{
        display: "block",
        textAlign: "center",
        position: "relative",
        pointerEvents: "none",
        width: "24px",
        height: "14px",
        marginY: "6px",
        lineHeight: "15px",
        fontWeight: 600,
        color: "#fff",
        fontSize: "10px",
        backgroundColor,

        [theme.breakpoints.up("lg")]: {
          width: "28px",
          height: "16px",
          marginY: "8px",
          lineHeight: "17px",
          fontSize: "12px",
        },

        "&::before": {
          top: "-6px",
          borderBottom: `6px solid ${backgroundColor}`,
          [theme.breakpoints.up("lg")]: {
            top: "-8px",
            borderBottom: `8px solid ${backgroundColor}`,
          },
        },
        "&::after": {
          bottom: "-6px",
          borderTop: `6px solid ${backgroundColor}`,
          [theme.breakpoints.up("lg")]: {
            bottom: "-8px",
            borderTop: `8px solid ${backgroundColor}`,
          },
        },
        "&::after,&::before": {
          content: '""',
          position: "absolute",
          left: 0,
          width: 0,
          height: 0,
          borderLeft: "12px solid transparent",
          borderRight: "12px solid transparent",
          [theme.breakpoints.up("lg")]: {
            borderLeft: "14px solid transparent",
            borderRight: "14px solid transparent",
          },
        },
      }}
    >
      {raiting ? raiting.toPrecision(2) : "--"}
    </Box>
  );
}

function getRaitingColor(value?: number) {
  switch (Math.floor(value || 0)) {
    case 10:
    case 9:
      return "#186b40";
    case 8:
      return "#1d804c";
    case 7:
      return "#1978b3";
    default:
      return "#666e75";
  }
}
