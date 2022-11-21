import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TalksList , CreateTalk } from "@/pages";
import { Navi } from "@/components/index"

export default function App() {
  return (
    <BrowserRouter>
      <Navi/>
      <div className="content-wapper">
        <div  className="content">
          <Routes>
            <Route path="/" element={<TalksList />} />
            <Route path="/create" element={<CreateTalk />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
