import React, { useCallback, useState } from 'react';
import { Formik } from 'formik';
import { createTalk } from '@/request';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PostForm = (props) => {
  const { history } = props;
  const [serverErr, setServerErr] = useState([]);

  const onSubmit = useCallback(
    async (values) => {
      setServerErr([]);
      try {
        await createTalk(values);
        history.push('/');
      } catch ({ message }) {
        setServerErr(message);
      }
    },
    [],
  );

  return (
    <Formik
      initialValues={{ title: '', description: '', video: '' }}
      onSubmit={onSubmit}
      validate={(values) => {
        const errors = {};
        const { title, video } = values;
        if (!title) {
          errors.title = 'Title is required';
        }
        if (!video) {
          errors.video = 'File is required';
        } else if (video.type.indexOf('video') === -1) {
          errors.video = 'File should be a video';
        }
        return errors;
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldValue,
        handleSubmit,
      }) => (
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={values.title}
            placeholder="Please enter title"
          />
          {errors.title && touched.title && <p className="err">{errors.title}</p>}
          <textarea
            name="description"
            onChange={handleChange}
            value={values.description}
            placeholder="Please enter description"
          />
          <input
            type="file"
            name="video"
            onChange={(event) => {
              setFieldValue('video', event.currentTarget.files[0]);
            }}
            placeholder="Please select video file"
          />
          {errors.video && touched.video && <p className="err">{errors.video}</p>}
          {serverErr.length > 0 && <p className="err">{serverErr.map((e) => e.messages.map((m) => m.message))}</p>}
          <button type="submit">Post</button>
        </form>
      )}
    </Formik>
  );
};

PostForm.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(PostForm);
