import { Box } from "@mui/material";
import { getNoun } from "../../../../utils";
import { CatalogViewToggle } from "./CatalogViewToggle";

interface SettingsPanelProps {
  count?: number;
  isDefaultView: boolean;
  onToggleView: () => void;
}

export function SettingsPanel({
  count,
  isDefaultView,
  onToggleView,
}: SettingsPanelProps) {
  return (
    <Box
      sx={{
        position: "relative",
        marginY: "10px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          justifyContent: "flex-start",
          alignItems: "center",
          display: "flex",
          flexBasis: "20%",
          flexGrow: 1,
          flexShrink: 0,
        }}
      >
        {/* TODO: фильтры */}
      </Box>
      <Box component="span" sx={{ fontSize: "16px" }}>
        {!count
          ? "Loading..."
          : `${count} ${getNoun(count, "игра", "игры", "игр")}`}
      </Box>
      <Box
        sx={{
          justifyContent: "flex-end",
          alignItems: "center",
          display: "flex",
          flexBasis: "20%",
          flexGrow: 1,
          flexShrink: 0,
        }}
      >
        <CatalogViewToggle
          isDefaultView={isDefaultView}
          onToggleView={onToggleView}
        ></CatalogViewToggle>
      </Box>
    </Box>
  );
}
