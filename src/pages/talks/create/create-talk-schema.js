import * as Yup from 'yup';

export const CreateTalkSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title should be at least 3 characters long')
    .max(256, 'Title cannot exceed 256 characters')
    .required('Title is required'),
  description: Yup.string()
    .min(3, 'Description should be at least 3 characters long')
    .max(10240, 'Description is possibly too long (more than 10240 characters)')
});
