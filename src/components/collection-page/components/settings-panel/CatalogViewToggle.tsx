import { Box, createTheme } from "@mui/material";
import "./CatalogViewToggle.css";

interface SettingsPanelProps {
  isDefaultView: boolean;
  onToggleView: () => void;
}

export function CatalogViewToggle({
  isDefaultView,
  onToggleView,
}: SettingsPanelProps) {
  let theme = createTheme({});

  const handleClick = () => {
    onToggleView();
  };

  return (
    <button
      type="button"
      style={{
        display: "flex",
        alignItems: "center",
        background: "none",
        border: "none",
        boxShadow: "none",
        cursor: "pointer",
        padding: 0,
      }}
      onClick={() => handleClick()}
    >
      <Box
        sx={{
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: "bold",
          [theme.breakpoints.down("md")]: {
            display: "none",
          },
        }}
      >
        вид каталога
      </Box>
      <Box
        sx={{
          [theme.breakpoints.up("md")]: {
            width: "45px",
            marginLeft: "10px",
          },
          [theme.breakpoints.down("md")]: {
            width: "20px",
          },
        }}
      >
        <Box
          component="i"
          className={`icon-button ${
            !isDefaultView ? "icon-button_selected" : ""
          }`}
          sx={{
            display: "inline-block",
            [theme.breakpoints.down("md")]: {
              display: isDefaultView ? "none" : "inline-block",
            },
          }}
        >
          <svg viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              stroke="none"
              d="M1.5 1.5v17h17v-17h-17Zm15.75 1.25H8.625v6.625h8.625V2.75Zm0 7.875H8.625v6.625h8.625v-6.625Zm-9.875-1.25V2.75H2.75v6.625h4.625Zm-4.625 1.25h4.625v6.625H2.75v-6.625Z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </Box>
        <Box
          component="i"
          className={`icon-button ${
            isDefaultView ? "icon-button_selected" : ""
          }`}
          sx={{
            display: "inline-block",
            [theme.breakpoints.down("md")]: {
              display: isDefaultView ? "inline-block" : "none",
            },
          }}
        >
          <svg viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              stroke="none"
              d="M1.5 1.5v17h17v-17h-17Zm15.75 1.25h-6.625v6.625h6.625V2.75Zm0 7.875h-6.625v6.625h6.625v-6.625Zm-7.875-1.25V2.75H2.75v6.625h6.625Zm-6.625 1.25h6.625v6.625H2.75v-6.625Z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </Box>
      </Box>
    </button>
  );
}
