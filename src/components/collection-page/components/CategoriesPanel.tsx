import { Box, createTheme } from "@mui/material";

export interface Category {
  category: string;
  title: string;
  image: string;
}

export const categories: readonly Category[] = [
  {
    category: "hotness",
    title: "горячие",
    image: "/images/categories/hotness.svg",
  },
  {
    category: "top",
    title: "топ 100",
    image: "/images/categories/top.svg",
  },
  {
    category: "party",
    title: "вечериночные",
    image: "/images/categories/party.svg",
  },
  {
    category: "family",
    title: "семейные",
    image: "/images/categories/family.svg",
  },
  {
    category: "children",
    title: "десткие",
    image: "/images/categories/children.svg",
  },
  {
    category: "hardcore",
    title: "хардкор",
    image: "/images/categories/hardcore.svg",
  },
] as const;

export function CategoriesPanel() {
  let theme = createTheme({});

  const handleClick = (category: Category) => {
    console.info(`select category: ${category.category}`);
  };

  return (
    <Box
      className="panel-categories"
      sx={{
        display: "flex",
        alignItems: "center",
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
      }}
    >
      <Box
        className="panel-categories__inner"
        sx={{
          display: "flex",
          alignItems: "center",
          paddingLeft: "23px",
          paddingRight: "23px",
          [theme.breakpoints.down("md")]: {
            paddingLeft: "15px",
            paddingRight: "15px",
          },
        }}
      >
        {categories.map((category) => (
          <Box
            key={category.category}
            component="button"
            className="panel-categories__item"
            onClick={() => handleClick(category)}
            sx={{
              display: "inline-flex",
              height: "80px",
              maxWidth: "285px",
              boxSizing: "border-box",
              alignItems: "center",
              justifyContent: "center",
              color: "#000",
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

              [theme.breakpoints.down("md")]: {
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
            <Box
              sx={{
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
              }}
            >
              <Box>
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
              </Box>
            </Box>
            <span
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {category.title}
            </span>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
