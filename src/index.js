import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import AddTopic from './components/add-topic';
import Content from './components/content';
import TopicDetail from './components/topic-detail';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Content />} />
        <Route path="/topics/:topicId" element={<TopicDetail />} />
        <Route path="/add" element={<AddTopic />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);
