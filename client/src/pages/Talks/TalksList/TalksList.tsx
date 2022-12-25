import { useRecoilValue } from 'recoil';

import { talksAtom } from './store';
import { List } from './List';

export function TalksList() {
  const talks = useRecoilValue(talksAtom);
  return (
    <div>
      <List talks={talks?.results ?? []} />
    </div>
  );
}
