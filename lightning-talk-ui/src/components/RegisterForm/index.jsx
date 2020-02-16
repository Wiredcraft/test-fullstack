import React, { useCallback, useState } from 'react';
import { Formik } from 'formik';
import { register } from '@/request';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const RegisterForm = (props) => {
  const { setUser, history } = props;
  const [serverErr, setServerErr] = useState([]);

  const onSubmit = useCallback(
    async (values) => {
      setServerErr([]);
      try {
        const { jwt, user: { id, username } } = await register(values);
        setUser({ username, user: id, token: jwt });
        history.push('/');
      } catch ({ message }) {
        setServerErr(message);
      }
    },
    [],
  );

  return (
    <Formik
      initialValues={{ email: '', password: '', username: '' }}
      onSubmit={onSubmit}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Email is required';
        } else if (!values.password) {
          errors.password = 'Password is required';
        } else if (!values.username) {
          errors.username = 'Username is required';
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
            name="username"
            onChange={handleChange}
            value={values.username}
            placeholder="Please enter your username"
          />
          {errors.email && touched.email && <p className="err">{errors.email}</p>}
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={values.email}
            placeholder="Please enter your email address"
          />
          {errors.email && touched.email && <p className="err">{errors.email}</p>}
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password}
            placeholder="Please enter your password"
          />
          {errors.password && touched.password && <p className="err">{errors.password}</p>}
          {serverErr.length > 0 && <p className="err">{serverErr.map((e) => e.messages.map((m) => m.message))}</p>}
          <button type="submit">Register</button>
        </form>
      )}
    </Formik>
  );
};

RegisterForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapDispatch = ({ user: { setUser } }) => ({
  setUser,
});

export default connect(
  null,
  mapDispatch,
)(withRouter(RegisterForm));
