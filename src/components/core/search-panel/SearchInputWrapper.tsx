import { Box, Theme, Input, styled } from "@mui/material";
import { PropsWithChildren, useEffect, useRef, useState } from "react";

const StickyBlock = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "0px",
  zIndex: 1000,
  backgroundColor: "#fff",
  paddingLeft: "80px",
  paddingRight: "80px",
  marginLeft: "auto",
  marginRight: "auto",
  [theme.breakpoints.down("md")]: {
    paddingLeft: "45px",
    paddingRight: "45px",
  },
  [theme.breakpoints.down("sm")]: {
    paddingLeft: "20px",
    paddingRight: "20px",
  },
}));

const Form = (
  props: PropsWithChildren & {
    theme: Theme;
  }
) => (
  <Box
    sx={{
      position: "relative",
      overflowX: "clip",
      [props.theme.breakpoints.up("md")]: {
      paddingLeft: "50%",
      },
    }}
  >
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        width: "100%",
        height: "200px",
        alignItems: "center",
        display: "flex",
        [props.theme.breakpoints.down("lg")]: {
          height: "170px",
        },
        [props.theme.breakpoints.down("md")]: {
          height: "110px",
        },
        [props.theme.breakpoints.down("sm")]: {
          height: "60px",
        },
      }}
    >
      {props.children}
    </Box>
  </Box>
);

const HiddenSearchString = styled("span")<{ searchValue: string }>(
  ({ theme, searchValue }) => ({
    visibility: "hidden",
    whiteSpace: "nowrap",
    position: "absolute",
    ...theme.typography.body2,
    letterSpacing: getLetterSpacing(searchValue),
  })
);

export function SearchInputWrapper(
  props: PropsWithChildren & {
    theme: Theme;
    shown: boolean;
    setSearchValue: (searchValue: string) => void;
  }
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const textWidthRef = useRef<HTMLSpanElement>(null);
  const biggerTextWidthRef = useRef<HTMLSpanElement>(null);
  const [searchValue, setSearchValue] = useState("");
  const [fontSize, setFontSize] = useState(60);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    props.setSearchValue(event.target.value);
  };

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 300);
  }, [props.shown]);

  useEffect(() => {
    if (
      inputRef.current &&
      textWidthRef.current &&
      biggerTextWidthRef.current
    ) {
      const textWidth = textWidthRef.current.offsetWidth;
      const biggerTextWidth = biggerTextWidthRef.current.offsetWidth;
      const containerWidth = inputRef.current.offsetWidth;

      if (textWidth > containerWidth) {
        if (fontSize > 35) {
          setFontSize((value) => value - 5);
        }
      } else if (biggerTextWidth < containerWidth) {
        if (fontSize < 60) {
          setFontSize((value) => value + 5);
        }
      }
    }
  }, [searchValue, fontSize]);

  return (
    <StickyBlock>
      <Form theme={props.theme}>
        <Input
          value={searchValue}
          inputRef={inputRef}
          placeholder="хочу играть в"
          onChange={handleSearchChange}
          sx={{
            width: "100%",
            fontSize: `${fontSize}px`,
            letterSpacing: getLetterSpacing(searchValue),
            "&::after, &::before": {
              display: "none",
            },
            [props.theme.breakpoints.down("md")]: {
              fontSize: "45px",
            },
            [props.theme.breakpoints.down("sm")]: {
              fontSize: "30px",
            },
          }}
        />
        <HiddenSearchString
          searchValue="searchValue"
          ref={textWidthRef}
          style={{
            fontSize: `${fontSize}px`,
          }}
        >
          {searchValue}
        </HiddenSearchString>
        <HiddenSearchString
          searchValue="searchValue"
          ref={biggerTextWidthRef}
          style={{
            fontSize: `${fontSize + 5}px`,
          }}
        >
          {searchValue}
        </HiddenSearchString>
      </Form>
    </StickyBlock>
  );
}

function getLetterSpacing(searchValue: string) {
  return searchValue.length < 30 ? "-0.2px" : "-0.4px";
}
