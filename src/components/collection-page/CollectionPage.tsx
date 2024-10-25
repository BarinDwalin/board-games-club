import { Box, createTheme } from "@mui/material";
import React, { useState } from "react";
import "./CollectionPage.css";
import { GameRecord } from "../../interfaces";
import {
  CategoriesPanel,
  GridCatalog,
  Header,
  MasonryCatalog,
  SettingsPanel,
} from "./components";

interface CollectionPageProps {
  collection: GameRecord[];
}

export function CollectionPage({ collection }: CollectionPageProps) {
  let theme = createTheme({});
  const [defaultView, setDefaultView] = useState(true);
  const onToggleView = () => {
    setDefaultView((value) => !value);
  };

  return (
    <>
      <Header
        title="во что поиграть"
        navigation="крошки / навигации"
        imageSource="/images/banners/club-1.jpg"
      ></Header>

      <CategoriesPanel></CategoriesPanel>

      <SettingsPanel
        count={collection.length}
        isDefaultView={defaultView}
        onToggleView={onToggleView}
      ></SettingsPanel>

      <Box
        sx={{
          margin: "0 auto",
          maxWidth: "1530px",
          minHeight: "50vh",
          [theme.breakpoints.up("lg")]: {
            padding: "0 40px 50px",
          },
          [theme.breakpoints.between("md", "lg")]: {
            padding: "0 45px 50px",
          },
          [theme.breakpoints.down("md")]: {
            paddingBottom: "50px",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
          }}
        >
          {defaultView ? (
            <GridCatalog collection={collection}></GridCatalog>
          ) : (
            <MasonryCatalog collection={collection}></MasonryCatalog>
          )}
        </Box>
      </Box>
    </>
  );
}
