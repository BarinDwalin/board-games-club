import { Box, Theme } from "@mui/material";
import { Event } from "../../interfaces";

export function CompletedEventsList(props: { theme: Theme; events: Event[] }) {
  return (
    <Box
      component="ul"
      sx={{
        margin: "40px 100px ",
        [props.theme.breakpoints.down("md")]: {
          margin: "48px 12px 24px",
        },
      }}
    >
      {props.events
        .sort((a, b) => {
          return new Date(b.date).valueOf() - new Date(a.date).valueOf();
        })
        .map((event, i) => (
          <Box
            component="li"
            key={i}
            sx={{
              margin: "8px",
            }}
          >
            <Box
              component="span"
              sx={{
                marginRight: "8px",
                display: "inline-block",
                width: "84px",
              }}
            >
              {new Date(event.date).toLocaleDateString()}
            </Box>
            <Box component="span">{event.title}</Box>
          </Box>
        ))}
    </Box>
  );
}
