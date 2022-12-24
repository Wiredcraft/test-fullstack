import style from './style.css';

import { createStyler } from '@/utils/styler';

const styler = createStyler(style);

interface Props {
  className?: string;
  children?: React.ReactNode;
  shape?: 'filled' | 'outline' | 'link';
  onClick?: () => void;
}

export function Button(props: Props) {
  const { className, children, shape = 'link', onClick } = props;

  return (
    <button className={styler(className, 'button', `${shape}-button`)} onClick={onClick}>
      {children}
    </button>
  );
}
