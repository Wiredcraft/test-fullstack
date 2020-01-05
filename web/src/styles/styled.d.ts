import "styled-components";
import { Themes } from "./theme";

type ColorType = "primary" | "background" | "border" | "text" | "icon";
interface ColorLevel {
  base: string;
  light?: string;
  lighter?: string;
  lightest?: string;
  deep?: string;
  deeper?: string;
  deepest?: string;
}

declare module "styled-components" {
  export interface DefaultTheme {
    setTheme: (theme: Themes) => void;
    theme: Themes;
    colors: {
      [key in ColorType]: ColorLevel;
    };
  }
}
