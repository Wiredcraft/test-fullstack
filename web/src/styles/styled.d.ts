import "styled-components";
import { Themes } from "./theme";

type ColorType = "primary" | "background" | "border" | "text";
interface ColorLevel {
  base: string;
  light?: string;
  lighter?: string;
  deep?: string;
  deeper?: string;
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
