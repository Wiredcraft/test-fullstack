import { render, RenderOptions } from "@testing-library/react";
import React, { FC, ReactElement } from "react";
import ThemeProvider from "../src/styles/ThemeProvider";

const Provider: FC = ({ children }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">
) => render(ui, { wrapper: Provider, ...options });

export * from "@testing-library/react";

export { customRender as render };
