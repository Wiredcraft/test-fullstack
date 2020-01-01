import React, { FC, useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { useMedia, useLocalStorage } from "react-use";
import { Themes, themes } from "./theme";

const STORE_THEME_KEY = "theme";

const ThemeProvider: FC = ({ children }) => {
  const prefersDarkMode = useMedia("(prefers-color-scheme: dark)");
  const initialTheme = prefersDarkMode ? Themes.DARK : Themes.LIGHT;

  const [localTheme, setLocalTheme] = useLocalStorage<Themes>(
    STORE_THEME_KEY,
    initialTheme
  );
  const [theme, setCurrentTheme] = useState(localTheme || initialTheme);

  const setTheme = (nextTheme: Themes): void => {
    setCurrentTheme(nextTheme);
    setLocalTheme(nextTheme);
  };
  return (
    <StyledThemeProvider theme={{ ...themes[theme], setTheme, theme }}>
      {children}
    </StyledThemeProvider>
  );
};

export default ThemeProvider;
