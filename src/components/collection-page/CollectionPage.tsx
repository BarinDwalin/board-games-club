import { Box, createTheme } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import "./CollectionPage.css";
import { Category, Game, GameBadgeType, GameRecord } from "../../interfaces";
import {
  CategoriesPanel,
  GridCatalog,
  Header,
  MasonryCatalog,
  SettingsPanel,
} from "./components";
import { DataService } from "../../services";

export function CollectionPage() {
  let theme = createTheme({});
  const [collection, setCollection] = useState<GameRecord<Game>[]>([]);
  const [filteredCollection, setFilteredCollection] = useState<
    GameRecord<Game>[]
  >([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [categoriesGames, setCategoriesGames] = useState<
    { categoryId: string; gamesIds: number[] }[]
  >([]);
  const [defaultView, setDefaultView] = useState(true);
  const dataService = useMemo(() => new DataService(), []);

  const onToggleView = () => {
    setDefaultView((value) => !value);
  };
  const handleSelectCategory = (category: Category | null) => {
    console.info(`select category: ${category?.id}`);
    setSelectedCategoryId(category?.id ?? null);
  };

  useEffect(() => {
    const settings = categoriesGames.find(
      (settings) => settings.categoryId === selectedCategoryId
    );

    if (settings) {
      setFilteredCollection(
        collection.filter((record) =>
          settings.gamesIds.includes(record.game.id)
        )
      );
    } else {
      setFilteredCollection(collection);
    }
  }, [categoriesGames, selectedCategoryId, collection]);

  useEffect(() => {
    if (collection.length === 0) {
      dataService.getGames().then((data) => {
        if (data && data.length) {
          setCollection(data);
        }
      });
    }

    if (categoriesGames.length === 0) {
      dataService.getCategoriesGames().then((data) => {
        if (data && data.length) {
          setCategoriesGames(data);
        }
      });
    }
  }, [categoriesGames, collection, dataService]);

  useEffect(() => {
    if (collection.length !== 0 && categoriesGames.length !== 0) {
      const topGames = categoriesGames.find(
        (category) => category.categoryId === "top"
      )?.gamesIds;

      for (let index = 0; index < (topGames?.length ?? 0); index++) {
        const topGame = collection.find(
          (record) => record.game.id === topGames![index]
        )?.game;
        if (
          topGame &&
          !topGame.badges?.find((badge) => badge.type === GameBadgeType.Top)
        ) {
          topGame.badges = [
            ...(topGame?.badges ?? []),
            { type: GameBadgeType.Top, value: index + 1 },
          ];
        }
      }
    }
  }, [categoriesGames, collection]);

  return (
    <>
      <Header
        title="во что поиграть"
        navigation="крошки / навигации"
        imageSource="/images/banners/club-1.jpg"
        imageAlt="помещение клуба"
      ></Header>

      <CategoriesPanel
        categories={dataService.categories}
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={handleSelectCategory}
      ></CategoriesPanel>

      <SettingsPanel
        count={filteredCollection.length}
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
            <MasonryCatalog collection={filteredCollection}></MasonryCatalog>
          ) : (
            <GridCatalog collection={filteredCollection}></GridCatalog>
          )}
        </Box>
      </Box>
    </>
  );
}
