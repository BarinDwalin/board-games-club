import { Box } from "@mui/material";

interface BadgeAddonProps {
  position: number;
}

export function BadgeTopPosition({ position }: BadgeAddonProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "30px",
        paddingX: "8px",
        backgroundColor: "#1c6a8c",
        color: "#fff",
        fontSize: "13px",
        fontWeight: "bold",
      }}
    >
      ТОП {position}
    </Box>
  );
}
