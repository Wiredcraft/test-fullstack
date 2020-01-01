import { DefaultTheme, ThemeContext } from "styled-components";
import { useContext } from "react";
import { colors } from "./tokens";

export enum Themes {
  DARK = "DARK",
  LIGHT = "LIGHT"
}

type Theme = Omit<DefaultTheme, "setTheme" | "theme">;

const lightTheme: Theme = {
  colors: {
    primary: {
      base: colors.primary["50"],
      light: colors.primary["40"],
      deep: colors.primary["60"]
    },
    background: {
      base: colors.grey["5"],
      light: colors.white,
      deep: colors.grey["10"]
    },
    border: {
      base: colors.grey["50"],
      light: colors.primary["50"],
      deep: colors.primary["70"]
    },
    text: {
      base: colors.grey["80"],
      light: colors.grey["50"],
      deep: colors.grey["90"]
    }
  }
};

const darkTheme: Theme = {
  colors: {
    primary: {
      base: colors.primary["40"],
      light: colors.primary["30"],
      deep: colors.primary["50"]
    },
    background: {
      base: colors.grey["90"],
      light: colors.grey["80"]
    },
    border: {
      base: colors.grey["10"],
      light: colors.primary["30"]
    },
    text: {
      base: colors.grey["5"],
      light: colors.grey["20"]
    }
  }
};

export const themes = {
  [Themes.DARK]: darkTheme,
  [Themes.LIGHT]: lightTheme
};

export const useTheme = () => useContext(ThemeContext);
