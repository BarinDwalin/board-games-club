import { Box, Theme, createTheme, styled } from "@mui/material";
import { PropsWithChildren } from "react";
import { Category } from "../../../interfaces";

const PanelCategories = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  height: "80px",
  overflowX: "auto",
  scrollbarWidth: "none",
  borderBottom: "1px solid #e6e6e6",
  paddingBottom: "30px",
  paddingTop: "30px",

  [theme.breakpoints.down("md")]: {
    paddingBottom: "20px",
    paddingTop: "20px",
    height: "60px",
  },
}));
const PanelCategoriesInner = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  paddingLeft: "23px",
  paddingRight: "23px",
  [theme.breakpoints.down("md")]: {
    paddingLeft: "15px",
    paddingRight: "15px",
  },
}));
const PanelCategoriesItem = (
  props: PropsWithChildren & {
    theme: Theme;
    category: Category;
    isSelected: boolean;
    onSelectItem: () => void;
  }
) => (
  <Box
    onClick={() => props.onSelectItem()}
    className="panel-categories__item"
    component="button"
    sx={{
      display: "inline-flex",
      height: "80px",
      maxWidth: "285px",
      boxSizing: "border-box",
      alignItems: "center",
      justifyContent: "center",
      color: props.isSelected ? "#c6b09f" : "#000",
      background: "none",
      cursor: "pointer",
      border: "1px solid #e6e6e6",
      borderRadius: "100px",
      paddingLeft: "24px",
      paddingRight: "24px",
      fontFamily: "inherit",
      fontSize: "16px",
      fontWeight: 600,
      lineHeight: "1.2",

      [props.theme.breakpoints.down("md")]: {
        height: "60px",
        paddingLeft: "19px",
        paddingRight: "19px",
        fontSize: "13px",
      },

      "+.panel-categories__item": {
        marginLeft: "15px",
      },

      "&:focus, &:hover": {
        color: "#c6b09f",
      },
    }}
  >
    {props.children}
  </Box>
);
const ImageWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  height: "80px",
  width: "80px",
  borderRadius: "100px",
  overflow: "hidden",
  backgroundColor: "#ececea",
  left: "-25px",
  marginRight: "-5px",

  [theme.breakpoints.down("md")]: {
    height: "60px",
    width: "60px",
    left: "-20px",
  },
}));
const Title = styled("span")(({ theme }) => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}));

interface CategoriesPanelProps {
  categories: readonly Category[];
  selectedCategoryId: string | null;
  onSelectCategory: (category: Category | null) => void;
}

export function CategoriesPanel({
  categories,
  selectedCategoryId,
  onSelectCategory,
}: CategoriesPanelProps) {
  let theme = createTheme({});

  const handleClick = (category: Category) => {
    if (category.id === selectedCategoryId) {
      onSelectCategory(null);
    } else {
      onSelectCategory(category);
    }
  };

  return (
    <PanelCategories>
      <PanelCategoriesInner>
        {categories.map((category) => (
          <PanelCategoriesItem
            key={category.id}
            theme={theme}
            category={category}
            isSelected={category.id === selectedCategoryId}
            onSelectItem={() => handleClick(category)}
          >
            <ImageWrapper>
              <picture>
                <img
                  alt={category.title}
                  title={category.title}
                  src={category.image}
                  loading="lazy"
                  style={{
                    height: "100%",
                    width: "100%",
                    maxWidth: "100%",
                    objectFit: "cover",
                  }}
                />
              </picture>
            </ImageWrapper>
            <Title>{category.title}</Title>
          </PanelCategoriesItem>
        ))}
      </PanelCategoriesInner>
    </PanelCategories>
  );
}
