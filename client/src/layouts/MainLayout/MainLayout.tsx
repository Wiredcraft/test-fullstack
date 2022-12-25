import { Outlet } from 'react-router-dom';

import { BaseLayout } from '../BaseLayout';

import { Header } from './Header';
import style from './style.css';

import { createStyler } from '@/utils/styler';

const styler = createStyler(style);

interface Props {
  className?: string;
  children?: React.ReactNode;
  route?: boolean;
}

export function MainLayout(props: Props) {
  const { className, children, route = false } = props;

  return (
    <BaseLayout className={styler(className, 'main-layout')}>
      <Header className={styler('layout-header')} />
      {/* fallback for traditional way */}
      {route ? <Outlet /> : children}
    </BaseLayout>
  );
}
