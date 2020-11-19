import { useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import queryString from 'query-string';
import { useForm } from 'react-hook-form';

import './login.component.css';
import AuthService from '../../services/auth.service';
import { UserContext } from '../../contexts/user';

function Login({ location }) {
  const [data, setData] = useState(null);
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const { register, handleSubmit, errors } = useForm();

  // Redirect out of here if user has already logged in
  if (currentUser) {
    const q = queryString.parse(location.search);
    return <Redirect to={q.returnUrl || '/'} />;
  }

  // Do login
  const onSubmit = (formData) => {
    AuthService.login(formData.username, formData.password).then(res => {
      if (!res.data.error) {
        setCurrentUser(res.data.result);
      } else {
        setData(res.data);
      }
    }).catch(error => {
      if (error.response) {
        setData(error.response.data);
      }
    });
  };

  return (
    <div>
      <h1 className="my-4 pt-4">Login</h1>
      <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col">
            <label htmlFor="username">Username
              { errors.username
                && <span className="text-danger">
                    <span>*</span>
                  </span>
              }
            </label>
            <input name="username" type="text" className="form-control" ref={register({required: true})} />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <label htmlFor="password">Password
              { errors.password
                && <span className="text-danger">
                    <span>*</span>
                  </span>
              }
            </label>
            <input name="password" type="password" className="form-control" ref={register({required: true})} />
          </div>
        </div>
        { (data && data.error)
          && <div className="row mt-3">
              <div className="col-12 alert alert-warning" role="alert">
                <ul className="mb-0">
                  { data.message.map((item, key) => (
                      <li key={key}>
                        <strong>{item}.</strong>
                      </li>
                    )) }
                </ul>
              </div>
            </div>
        }
        <div className="row mt-4">
          <div className="col">
            <input className="btn btn-primary mr-3" type="submit" value="Login" />/<Link to="/register" className="btn btn-link btn-sm ml-2">Register new user</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
