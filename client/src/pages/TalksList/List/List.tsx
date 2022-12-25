import dayjs from 'dayjs';

import { VoteButton } from './VoteButton';
import style from './style.css';

import { createStyler } from '@/utils/styler';

const styler = createStyler(style);

interface Props {
  className?: string;
  talks: Schema.Talk[];
  onChange: () => void;
}

export function List(props: Props) {
  const { className, talks, onChange } = props;

  return (
    <div className={styler(className, 'talks-list-box')}>
      {talks.map((talk, index) => (
        <div key={talk.id} className={styler('talks-list-item-box')}>
          <span className={styler('talks-item-order')}>{index + 1}.</span>
          <div className={styler(className, 'talk-box')}>
            <div className={styler('talk-vote-box')}>
              <VoteButton talk={talk} onChange={onChange} />
            </div>
            <div className={styler('talk-info-box')}>
              <p className={styler('talk-title')}>{talk.title}</p>
              <p className={styler('talk-description')}>{talk.description}</p>
              <p className={styler('talk-info')}>
                <span className={styler('info-item')}>by {talk.owner?.username}</span>
                <span className={styler('info-item')}>{dayjs(talk.createdAt).fromNow()}</span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
