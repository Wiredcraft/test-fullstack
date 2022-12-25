import { Item } from './Item';
import style from './style.css';

import { createStyler } from '@/utils/styler';

const styler = createStyler(style);

interface Props {
  className?: string;
  talks: Schema.Talk[];
}

export function List(props: Props) {
  const { className, talks } = props;

  return (
    <div className={styler(className, 'talks-list-box')}>
      {talks.map((talk, index) => (
        <div key={talk.id} className={styler('talks-list-item-box')}>
          <span className={styler('talks-item-order')}>{index + 1}.</span>
          <Item talk={talk} />
        </div>
      ))}
    </div>
  );
}
