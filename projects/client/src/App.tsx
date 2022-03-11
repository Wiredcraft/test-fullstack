import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LightningTalkList, LightningTalkForm } from "@/pages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LightningTalkList />} />
        <Route path="/new-talk" element={<LightningTalkForm />} />
      </Routes>
    </BrowserRouter>
  );
}
