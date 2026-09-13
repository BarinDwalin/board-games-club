import { Box, ThemeProvider, Typography, createTheme } from "@mui/material";
import { Contacts } from "./Contacts";

function RuleIcon() {
  return (
    <div
      style={{
        minWidth: "32px",
        minHeight: "32px",
      }}
    >
      <img alt="rule item icon" src="/images/navigation/rules.svg" />
    </div>
  );
}

export function RulesPage() {
  const rules = [
    { title: "Не курим", description: "Совсем" },
    {
      title: "Не употребляем алкоголь",
      description: "В состоянии алкогольного опьянения к играм не допускаются",
    },
    {
      title: "18+",
      description: "Допускаются подростки от 14 лет в сопровождении взрослых",
    },
    {
      title: "Переобуваемся",
      description: "Гостевые тапочки есть для всех, можно приностить свои",
    },
    {
      title: "Не едим за столами во время игры",
      description: "Снэки и печенье, не пачкающие игры, можно",
    },
    {
      title: "Еду можно заказать или принести с собой ",
      description: "Есть мини-холодильник и микроволновая печь",
    },
    { title: "Не шумим после 23:00", description: "Уважаем соседей" },
    {
      title: "Можно бронировать столы",
      description: "Пишите в Telegram/Instagram/WhatsApp",
    },
    {
      title: "Можно приносить свои игры",
      description: "Можно оставлять в клубе в общем доступе или на хранение",
    },
    {
      title: "Бережно относимся к играм",
      description:
        "Если что-то произошло во время партии, сообщите администратору, чтобы мы знали и смогли исправить",
    },
    {
      title: "Оплата при входе",
      description:
        "Kaspi или наличные. Стоимость указана за весь день. О скидках уточняйте у администратора",
    },
  ];

  let theme = createTheme({});
  
  theme.typography.h5 = {
    ...theme.typography.h5,
    [theme.breakpoints.down("md")]: {
      lineHeight: "1.5rem",
      fontSize: "1.25rem",
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          margin: "24px",
        }}
      >
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
            Правила посещения клуба
          </Typography>
        </Box>

        <Box
          component="ul"
          sx={{
            margin: "48px 100px",
            padding: 0,
            columns: 2,
            [theme.breakpoints.down("md")]: {
              margin: 0,
              columns: 1,
            },
          }}
        >
          {rules.map((rule, i) => (
            <Box
              component="li"
              key={i}
              sx={{
                margin: "12px",
                display: "flex",
                columnGap: "12px",
              }}
            >
              <RuleIcon />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  overflow: "auto",
                }}
              >
                <Typography variant="h5" component="span" sx={{}}>
                  {rule.title}
                </Typography>
                <Typography
                  variant="body1"
                  component="span"
                  sx={{
                    marginTop: "4px",
                    marginLeft: "24px",
                    [theme.breakpoints.down("md")]: {
                      marginLeft: 0,
                    },
                  }}
                >
                  {rule.description}
                </Typography>
              </div>
            </Box>
          ))}
        </Box>

        <Contacts
          sx={{
            margin: "16px 0 64px",
            [theme.breakpoints.down("md")]: {
              margin: "16px 0 40px",
            },
          }}
        />
      </div>
    </ThemeProvider>
  );
}
