import { Route, Routes } from 'react-router-dom';

import { TalksList } from './TalksList';

export function Talks() {
  return (
    <Routes>
      <Route index element={<TalksList />} />
    </Routes>
  );
}
