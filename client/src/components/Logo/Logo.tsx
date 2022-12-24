import style from './style.css';

import { createStyler } from '@/utils/styler';

const styler = createStyler(style);

interface Props {
  className?: string;
  children: string;
}

export function Logo(props: Props) {
  const { className, children } = props;

  return (
    <div className={styler(className, 'logo', 'logo-box')}>
      <span className={styler('logo-content')}>{children}</span>
    </div>
  );
}
