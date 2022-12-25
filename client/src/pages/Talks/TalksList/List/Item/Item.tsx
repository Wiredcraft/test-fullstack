import dayjs from 'dayjs';

import style from './style.css';

import { Button } from '@/components/Button';
import { createStyler } from '@/utils/styler';

const styler = createStyler(style);

interface Props {
  className?: string;
  talk: Partial<Schema.Talk>;
}

export function Item(props: Props) {
  const { className, talk } = props;

  return (
    <div className={styler(className, 'talk-box')}>
      <div className={styler('talk-vote-box')}>
        <Button className={styler('talk-vote-button')} shape="outline">
          {talk.voted}
        </Button>
      </div>
      <div className={styler('talk-info-box')}>
        <p className={styler('talk-title')}>{talk.title}</p>
        <p className={styler('talk-description')}>{talk.description}</p>
        <p className={styler('talk-info')}>{dayjs(talk.createdAt).fromNow()}</p>
      </div>
    </div>
  );
}
