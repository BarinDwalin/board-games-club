import { Box, createTheme } from "@mui/material";

interface HeaderProps {
  title: string;
  navigation: string;
  imageSource: string;
}

export function Header({ title, navigation, imageSource }: HeaderProps) {
  let theme = createTheme({});

  return (
    <Box
      component="header"
      sx={{ position: "relative", paddingX: "24px", minHeight: "265px" }}
    >
      <Box sx={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}>
        <Box
          component="picture"
          sx={{
            "&::after": {
              content: '""',
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              top: 0,
              opacity: 0.2,
              background: "#000",
            },
          }}
        >
          <img
            src={imageSource}
            style={{
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              width: "100%",
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          minHeight: "inherit",
          [theme.breakpoints.down("md")]: {
            alignItems: "stretch",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            paddingY: "25px",
            alignItems: "flex-end",
            color: "#fff",
            zIndex: 1,
            [theme.breakpoints.down("md")]: {
              padding: "20px 0",
              flexDirection: "column",
              justifyContent: "space-between",
            },
          }}
        >
          <Box sx={{ width: "100%", fontSize: "14px" }}>{navigation}</Box>
          <Box
            sx={{
              width: "100%",
              fontSize: "60px",
              fontWeight: "500",
              letterSpacing: "-.2px",
              lineHeight: 1,
              [theme.breakpoints.down("lg")]: {
                fontSize: "45px",
              },
              [theme.breakpoints.down("md")]: {
                fontSize: "35px",
              },
            }}
          >
            {title}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
