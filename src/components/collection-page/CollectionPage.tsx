import { Box, createTheme } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import "./CollectionPage.css";
import {
  Category,
  Game,
  GameBadge,
  GameBadgeType,
  GameRecord,
  SortType,
} from "../../interfaces";
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
    {
      categoryId: string;
      gamesIds?: number[];
      gamesBggIds?: number[];
      sortType?: SortType;
    }[]
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
        collection
          .filter((record) => {
            return settings?.gamesBggIds?.includes(record.game.bggId ?? 0)
              || settings?.gamesIds?.includes(record.game.id);
          })
          .sort((a, b) => {
            if (settings.sortType === "TopBgg") {
              return dataService.sortGameByTopBgg(a, b);
            }
            return 0;
          })
      );
    } else {
      setFilteredCollection(collection);
    }
  }, [categoriesGames, selectedCategoryId, collection, dataService]);

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
    const setBadge = (
      categoryId: string,
      badgeType: GameBadgeType,
      createBadge: (index: number) => GameBadge,
      findGame: (index: number) => Game | undefined,
      count: number
    ) => {
      for (let index = 0; index < count; index++) {
        const game = findGame(index);
        if (game && !game.badges?.find((badge) => badge.type === badgeType)) {
          game.badges = [...(game?.badges ?? []), createBadge(index)];
        }
      }
    };

    const topCategory = categoriesGames.find(
      (category) => category.categoryId === "top"
    );
    const hotnessCategory = categoriesGames.find(
      (category) => category.categoryId === "hotness"
    );

    if (collection.length !== 0 && categoriesGames.length !== 0) {
      if (topCategory?.gamesBggIds) {
        setBadge(
          "top",
          GameBadgeType.Top,
          (index) => ({ type: GameBadgeType.Top, value: index + 1 }),
          (index) =>
            collection.find(
              (record) =>
                record.game.bggId === topCategory.gamesBggIds![index]
            )?.game,
          topCategory.gamesBggIds.length
        );
      }

      if (hotnessCategory?.gamesIds) {
        setBadge(
          "hotness",
          GameBadgeType.Hot,
          () => ({ type: GameBadgeType.Hot }),
          (index) =>
            collection.find(
              (record) => record.game.id === hotnessCategory.gamesIds![index]
            )?.game,
          hotnessCategory.gamesIds.length
        );
      }
    }
  }, [categoriesGames, collection]);

  return (
    <>
      <Header
        title="во что поиграть"
        navigation="" // "крошки / навигации"
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
