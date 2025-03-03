import { Box } from "@mui/material";
import { getNoun } from "../../../../../utils";

interface BadgeAddonProps {
  count: number;
}

export function BadgeAddon({ count }: BadgeAddonProps) {
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
      +{count} {getNoun(count, "дополнение", "дополнения", "дополнений")}
    </Box>
  );
}
