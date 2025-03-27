import { Box, Link, Theme, Typography, createTheme } from "@mui/material";
import { PropsWithChildren } from "react";
import { useLoaderData } from "react-router";
import { getEvents } from "../../data/events";
import { Event } from "../../interfaces";
import { CompletedEventsList } from "./CompletedEventsList";
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

const ResultsLink = (props: { theme: Theme }) => (
  <Box
    sx={{
      display: "flex",
      margin: "12px 12px 40px",
      justifyContent: "center",
    }}
  >
    <Link
      href="https://sites.google.com/view/rollmove/%D1%82%D1%83%D1%80%D0%BD%D0%B8%D1%80%D1%8B"
      target="_blank"
      sx={{
        padding: "12px 32px",
        textAlign: "center",
        textDecoration: "none",
        [props.theme.breakpoints.down("sm")]: {
          padding: "12px 20px",
        },
      }}
    >
      Подробнее о результатах
      <div style={{ fontSize: "14px" }}>(может потребоваться VPN)</div>
    </Link>
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

      <ResultsLink theme={theme}></ResultsLink>
    </>
  );
}
