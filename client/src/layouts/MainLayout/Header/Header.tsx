import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

import style from './style.css';

import { Logo } from '@/components/Logo';
import { myAtom } from '@/store/auth';
import { createStyler } from '@/utils/styler';
import { Button } from '@/components/Button';
import { PATH } from '@/const';

const styler = createStyler(style);

interface Props {
  className?: string;
}

export function Header(props: Props) {
  const { className } = props;

  const user = useRecoilValue(myAtom);

  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate(PATH.LOGIN);
  };

  return (
    <div className={styler(className, 'header-box')}>
      <div className={styler('header-logo')}>
        <Logo>W</Logo>
      </div>

      <h1 className={styler('header-title')}>Lightning Talks</h1>

      {user == null ? (
        <Button className={styler('header-login')} onClick={handleLoginClick}>
          Login
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
}
