import { Box, Link, Theme, Typography, createTheme } from "@mui/material";
import { PropsWithChildren } from "react";
import { useLoaderData } from "react-router";
import { getEvents } from "../../data/events";
import { Event } from "../../interfaces";
import { Polls } from "./Polls";

export async function eventsLoader() {
  const events = (await getEvents()) || [];
  return { events };
}

const Title = (
  props: PropsWithChildren & {
    theme: Theme;
  }
) => (
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
        [props.theme.breakpoints.down("md")]: {
          fontSize: "1.625rem",
        },
      }}
    >
      {props.children}
    </Typography>
  </Box>
);

const CompletedEventsList = (props: { theme: Theme; events: Event[] }) => (
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

export function Tournament() {
  const { events } = useLoaderData() as { events: Event[] };
  let theme = createTheme({});

  return (
    <>
      <Title theme={theme}>Наши планы</Title>
      <Polls theme={theme}></Polls>

      <Title theme={theme}>Проведенные турниры</Title>
      <CompletedEventsList theme={theme} events={events}></CompletedEventsList>

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
            textAlign: "center",
            textDecoration: "none",
            [theme.breakpoints.down("sm")]: {
              padding: "12px 20px",
            },
          }}
        >
          Подробнее о результатах
          <div style={{ fontSize: "14px" }}>(может потребоваться VPN)</div>
        </Link>
      </Box>
    </>
  );
}
