import React, { useCallback, useState } from 'react';
import { Formik } from 'formik';
import { login } from '@/request';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const LoginForm = (props) => {
  const { setUser, history } = props;
  const [serverErr, setServerErr] = useState([]);

  const onSubmit = useCallback(
    async (values) => {
      setServerErr([]);
      try {
        const { jwt, user: { id, username } } = await login(values);
        setUser({ username, user: id, token: jwt });
        history.push('/');
      } catch ({ message }) {
        if (Array.isArray(message)) {
          setServerErr(message);
        }
      }
    },
    [],
  );

  return (
    <Formik
      initialValues={{ identifier: '', password: '' }}
      onSubmit={onSubmit}
      validate={(values) => {
        const errors = {};
        if (!values.identifier) {
          errors.identifier = 'Email or username is required';
        } else if (!values.password) {
          errors.password = 'Password is required';
        }
        return errors;
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
      }) => (
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="identifier"
            onChange={handleChange}
            value={values.identifier}
            placeholder="Please enter your username or email address"
          />
          {errors.identifier && touched.identifier && <p className="err">{errors.identifier}</p>}
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password}
            placeholder="Please enter your password"
          />
          {errors.password && touched.password && <p className="err">{errors.password}</p>}
          {serverErr.length > 0 && <p className="err">{serverErr.map((e) => e.messages.map((m) => m.message))}</p>}
          <button type="submit">Login</button>
        </form>
      )}
    </Formik>
  );
};

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapDispatch = ({ user: { setUser } }) => ({
  setUser,
});

export default connect(
  null,
  mapDispatch,
)(withRouter(LoginForm));
