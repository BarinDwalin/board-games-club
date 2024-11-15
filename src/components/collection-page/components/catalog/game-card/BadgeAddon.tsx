import { Box } from "@mui/material";

export function BadgeAddon() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "30px",
        paddingX: "8px",
        backgroundColor: "#000",
        color: "#fff",
        fontSize: "13px",
        fontWeight: "bold",
      }}
    >
      Дополнение
    </Box>
  );
}
