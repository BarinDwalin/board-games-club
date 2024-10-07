import { Box, Typography, createTheme } from "@mui/material";

export function Tournament() {
  const events = [
    {
      date: "2023-10-19T00:00:00.00Z",
      title: "Турнир по Лоскутному Королевству от Стиля Жизни",
    },
    {
      date: "2024-01-11T00:00:00.00Z",
      title: "Тунир по Новым Римлянам от Стиля Жизни",
    },
    {
      date: "2023-10-26T00:00:00.00Z",
      title: "Турнир по Гномам-вредителям от Стиля Жизни",
    },
    {
      date: "2023-11-10T00:00:00.00Z",
      title: "Турнир по Королевским Хроникам от Эврикус",
    },
    {
      date: "2024-01-25T00:00:00.00Z",
      title: "Турнир по Unmatched от GaGa",
    },
  ];
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
