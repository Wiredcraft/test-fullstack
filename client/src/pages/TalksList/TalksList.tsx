import { useRequest } from 'ahooks';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { List } from './List';
import { talksFilterAtom } from './store';
import style from './style.css';

import { FloatingButton } from '@/components/FloatingButton';
import { PATH } from '@/const';
import { queryTalks } from '@/services/talks/queryTalks';
import { createStyler } from '@/utils/styler';

const styler = createStyler(style);

export function TalksList() {
  const params = useRecoilValue(talksFilterAtom);
  const { data: talks, refresh } = useRequest(queryTalks, { defaultParams: [params] });

  const handleListChange = () => {
    refresh();
  };

  const navigate = useNavigate();
  const handleSubmitClick = () => {
    navigate(PATH.TALKS_SUBMIT);
  };

  return (
    <div className={styler('task-list-page')}>
      <List
        className={styler('task-list')}
        talks={talks?.results ?? []}
        onChange={handleListChange}
      />

      <FloatingButton onClick={handleSubmitClick}>Submit</FloatingButton>
    </div>
  );
}
