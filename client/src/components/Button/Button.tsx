import { ButtonHTMLAttributes } from 'react';

import style from './style.css';

import { createStyler } from '@/utils/styler';

const styler = createStyler(style);

interface Props extends ButtonHTMLAttributes<Element> {
  className?: string;
  children?: React.ReactNode;
  shape?: 'filled' | 'outline' | 'link';
}

export function Button(props: Props) {
  const { className, children, shape = 'link', ...buttonProps } = props;

  return (
    <button className={styler(className, 'button', `${shape}-button`)} {...buttonProps}>
      {children}
    </button>
  );
}
