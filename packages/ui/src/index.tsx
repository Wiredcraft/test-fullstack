import { createRoot } from "react-dom/client";

import { Routes, Route, Navigate } from "react-router";
import { BrowserRouter } from "react-router-dom";

import { SubmitPage } from "./pages/Submit";
import { TalkPage } from "./pages/Talk";
import { HomePage, Welcome } from "./pages/Home";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/submit" element={<Header submit />} />
        <Route path="*" element={<Header />} />
      </Routes>
      <div id="body">
        <Routes>
          <Route path="/submit" element={<SubmitPage />} />
          <Route path="/talk/:id" element={<TalkPage />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <footer></footer>
    </BrowserRouter>
  );
};

const Header = ({ submit }: { submit?: boolean }) => {
  return (
    <header>
      <b>
        <a href="/">Lightning Talk</a>
      </b>
      {" | "}
      <a href="/welcome">welcome</a>
      {" | "}
      {submit ? null : <a href="/submit">submit</a>}
    </header>
  );
};

const container = document.getElementById("app");
createRoot(container!).render(<App />);
