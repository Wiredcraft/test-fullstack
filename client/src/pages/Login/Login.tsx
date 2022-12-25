import { useFormik } from 'formik';
import { Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import * as yup from 'yup';

import style from './style.css';

import { Button } from '@/components/Button';
import { InputField } from '@/components/InputField';
import { PATH } from '@/const';
import { login } from '@/services/auth/login';
import { whoami } from '@/services/auth/whoami';
import { myAtom } from '@/store/auth';
import { createStyler } from '@/utils/styler';

const styler = createStyler(style);

interface FormValues {
  username: string;
  password: string;
}

const initialValues = { username: '', password: '' };
const validationSchema = yup.object().shape({
  password: yup.string().required('Password is required'),
  username: yup.string().required('Username is required'),
});

export function Login() {
  const [my, setMy] = useRecoilState(myAtom);
  const handleSubmit = async (values: FormValues) => {
    await login(values).then(whoami).then(setMy);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  if (my != null) {
    return <Navigate to={PATH.HOME} />;
  }

  return (
    <div className={styler('login-box')}>
      <h1 className={styler('login-title')}>Login</h1>

      <form className={styler('login-form')} onSubmit={formik.handleSubmit}>
        <InputField
          name="username"
          label="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          error={formik.touched.username ? formik.errors.username : ''}
        />
        <InputField
          type="password"
          name="password"
          label="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.touched.password ? formik.errors.password : ''}
        />
        <Button className={styler('login-submit')} type="submit" shape="filled">
          Login
        </Button>
      </form>
    </div>
  );
}
