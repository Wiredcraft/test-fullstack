import { Outlet } from 'react-router-dom';

import { Header } from './Header';
import style from './style.css';

import { createStyler } from '@/utils/styler';

const styler = createStyler(style);

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export function MainLayout(props: Props) {
  const { className, children } = props;

  return (
    <div className={styler(className, 'layout-box')}>
      <Header className={styler('layout-header')} />
      <Outlet />
      {/* fallback for traditional way */}
      {children}
    </div>
  );
}
