import style from './style.css';

import { createStyler } from '@/utils/styler';

const styler = createStyler(style);

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function FloatingButton(props: Props) {
  const { className, children, ...buttonProps } = props;

  return (
    <button className={styler(className, 'floating-button')} {...buttonProps}>
      <span className={styler('inner')}>
        <span className={styler('icon')} />
        <span className={styler('text')}>{children}</span>
      </span>
    </button>
  );
}
