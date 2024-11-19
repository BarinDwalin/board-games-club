import { Box, Link, Typography, createTheme } from "@mui/material";
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

      <Box
        sx={{
          display: "flex",
          margin: "12px 12px 40px",
          justifyContent: "center",
        }}
      >
        <Link
          href="https://sites.google.com/view/rollmove/%D1%82%D1%83%D1%80%D0%BD%D0%B8%D1%80%D1%8B"
          sx={{
            padding: "12px 32px",
            textDecoration: "none",
            [theme.breakpoints.down("sm")]: {
              padding: "12px 20px",
            },
          }}
        >
          Подробнее
        </Link>
      </Box>
    </>
  );
}
