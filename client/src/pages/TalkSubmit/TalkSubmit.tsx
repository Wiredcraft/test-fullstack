import { useRequest } from 'ahooks';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import style from './style.css';

import { Button } from '@/components/Button';
import { InputField } from '@/components/InputField';
import { PATH } from '@/const';
import { createTalk } from '@/services/talks/createTalk';
import { createStyler } from '@/utils/styler';

const styler = createStyler(style);

type FormValues = ServiceParams<typeof createTalk>;

const initialValues = { title: '', description: '' };
const validationSchema = yup.object().shape({
  description: yup.string().required('Description is required'),
  title: yup.string().required('Title is required'),
});

export function TalkSubmit() {
  console.debug('submit tlak');
  const [handleSubmit, submitting] = useSubmitTalkHandler();

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className={styler('talk-submit-box')}>
      <form className={styler('submit-form')} onSubmit={formik.handleSubmit}>
        <InputField
          name="title"
          label="title"
          onChange={formik.handleChange}
          value={formik.values.title}
          error={formik.touched.title ? formik.errors.title : ''}
        />
        <InputField
          type="description"
          name="description"
          label="description"
          rows={10}
          onChange={formik.handleChange}
          value={formik.values.description}
          error={formik.touched.description ? formik.errors.description : ''}
        />
        <Button
          className={styler('login-submit')}
          type="submit"
          shape="filled"
          disabled={submitting}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

function useSubmitTalkHandler() {
  const navigate = useNavigate();

  const { run: submit, loading } = useRequest(createTalk, {
    manual: true,
    onSuccess: () => {
      navigate(PATH.TALKS);
    },
    // onError: (error) => {},
  });

  return [submit, loading] as const;
}
