import { Box, List, ListItem, Theme, Typography } from "@mui/material";
import { useRef, useEffect } from "react";

function AboutClubVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      width="100%"
      style={{
        marginTop: "20px",
      }}
    >
      <source src="/videos/shelfs.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

export function AboutClubBlock(props: { theme: Theme }) {
  return (
    <>
      <Typography
        variant="h5"
        component="div"
        sx={{
          margin: "48px 0",
          padding: "24px",
          [props.theme.breakpoints.down("md")]: {
            margin: "20px 0",
          },
        }}
      >
        «Кинь-Двинь» — это клуб с настольными играми на левом берегу Астаны, где
        вы можете приятно провести несколько часов за хорошими играми
        и в хорошей компании.
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
          alignItems: "center",
          [props.theme.breakpoints.down("md")]: {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        <AboutClubVideo />

        <Box>
          <Typography
            variant="h5"
            component="div"
            sx={{
              padding: "24px",
            }}
          >
            5 причин заглянуть в клуб:
          </Typography>
          <List dense={true}>
            {[
              "350+ настолок — от простых до мозгодробительных",
              "Атмосфера как дома, только лучше во всём",
              "Левый берег, открыты до ночи",
              "Если не нашли компанию, всё равно приходите — мы подберем её на месте ",
              "Всё объясним, всем рады, особенно новичкам!",
            ].map((text) => (
              <ListItem>
                <Typography variant="subtitle1" component="div">
                  {"✅ " + text}
                </Typography>
              </ListItem>
            ))}
            <ListItem>
              <Typography variant="subtitle1" component="div">
                🎲 Серьезно, у нас 350+ игр, мы всегда можем собрать такую
                партию, где для каждого игрока — она будет первой
              </Typography>
            </ListItem>
          </List>
        </Box>
      </Box>
    </>
  );
}
