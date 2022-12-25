import { Outlet } from 'react-router-dom';

import style from './style.css';

import { createStyler } from '@/utils/styler';

const styler = createStyler(style);

interface Props {
  className?: string;
  children?: React.ReactNode;
  route?: boolean;
}

export function BaseLayout(props: Props) {
  const { className, children, route = false } = props;

  return (
    <div className={styler(className, 'base-layout-box')}>
      <div className={styler('layout-wrapper')}>
        {/* fallback for traditional way */}
        {route ? <Outlet /> : children}
      </div>
    </div>
  );
}
