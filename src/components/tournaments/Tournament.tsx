import { Box, Typography, createTheme } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { getEvents } from "../../data/events";
import { Event } from "../../interfaces";

export async function eventsLoader() {
  const events = await getEvents();
  return { events };
}

export function Tournament() {
  const { events } = useLoaderData() as { events: Event[] } || [];

  let theme = createTheme({});

  return (
    <>
      <Box
        sx={{
          margin: "24px",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            textAlign: "center",
            [theme.breakpoints.down("md")]: {
              fontSize: "1.625rem",
            },
          }}
        >
          Проведенные турниры
        </Typography>
      </Box>

      <Box
        component="ul"
        sx={{
          margin: "100px",
          [theme.breakpoints.down("md")]: {
            margin: "48px 12px",
          },
        }}
      >
        {events
          .sort((a, b) => {
            return new Date(a.date).valueOf() - new Date(b.date).valueOf();
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
    </>
  );
}
