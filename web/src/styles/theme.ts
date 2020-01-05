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
      lighter: colors.primary["10"],
      lightest: colors.primary["5"],
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
    },
    icon: {
      base: colors.grey["70"],
      light: colors.grey["40"]
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
      light: colors.grey["80"],
      lighter: colors.primary["70"],
      lightest: colors.primary["40"]
    },
    border: {
      base: colors.grey["10"],
      light: colors.primary["30"]
    },
    text: {
      base: colors.grey["5"],
      light: colors.grey["20"]
    },
    icon: {
      base: colors.grey["40"],
      light: colors.grey["60"]
    }
  }
};

export const themes = {
  [Themes.DARK]: darkTheme,
  [Themes.LIGHT]: lightTheme
};

export const useTheme = (): DefaultTheme => useContext(ThemeContext);
