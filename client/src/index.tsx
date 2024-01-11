import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./app";

const rootDOM = document.getElementById("root");

const root = createRoot(rootDOM!);

root.render(<App />);
