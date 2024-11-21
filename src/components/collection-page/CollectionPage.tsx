import { Box, createTheme } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import "./CollectionPage.css";
import { Game, GameRecord } from "../../interfaces";
import {
  CategoriesPanel,
  GridCatalog,
  Header,
  MasonryCatalog,
  SettingsPanel,
} from "./components";
import { Category } from "./models";
import { DataService } from "../../services";

export function CollectionPage() {
  let theme = createTheme({});
  const [collection, setCollection] = useState<GameRecord<Game>[]>([]);
  const [defaultView, setDefaultView] = useState(true);
  const dataService = useMemo(() => new DataService(), []);

  const onToggleView = () => {
    setDefaultView((value) => !value);
  };
  const handleSelectCategory = (category: Category) => {
    console.info(`select category: ${category.category}`);
  };

  useEffect(() => {
    if (collection.length === 0) {
      dataService.getGames().then((data) => {
        if (data && data.length) {
          setCollection(data);
        }
      });
    }
  }, [collection, dataService]);

  return (
    <>
      <Header
        title="во что поиграть"
        navigation="крошки / навигации"
        imageSource="/images/banners/club-1.jpg"
        imageAlt="помещение клуба"
      ></Header>

      <CategoriesPanel
        onSelectCategory={handleSelectCategory}
      ></CategoriesPanel>

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
            <MasonryCatalog collection={collection}></MasonryCatalog>
          ) : (
            <GridCatalog collection={collection}></GridCatalog>
          )}
        </Box>
      </Box>
    </>
  );
}
