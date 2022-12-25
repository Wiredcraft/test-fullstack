import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import style from './style.css';

import { Button } from '@/components/Button';
import { Logo } from '@/components/Logo';
import { PATH } from '@/const';
import { logout } from '@/services/auth/logout';
import { myAtom } from '@/store/auth';
import { createStyler } from '@/utils/styler';

const styler = createStyler(style);

interface Props {
  className?: string;
}

export function Header(props: Props) {
  const { className } = props;

  const [my, setMy] = useRecoilState(myAtom);

  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate(PATH.LOGIN);
  };

  const handleLogoutClick = () => {
    logout();
    setMy(null);
  };

  return (
    <div className={styler(className, 'header-box')}>
      <div className={styler('header-logo')}>
        <Logo>W</Logo>
      </div>

      <h1 className={styler('header-title')}>Lightning Talks</h1>

      <span className={styler('header-actions')}>
        {my == null ? (
          <Button
            className={styler('button-action', 'action')}
            shape="link"
            onClick={handleLoginClick}
          >
            Login
          </Button>
        ) : (
          <>
            <span className={styler('action')}>{my.username}</span>
            <Button
              className={styler('button-action', 'action')}
              shape="link"
              onClick={handleLogoutClick}
            >
              Logout
            </Button>
          </>
        )}
      </span>
    </div>
  );
}
