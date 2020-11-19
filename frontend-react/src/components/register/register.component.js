import { useState } from 'react';
import { useForm } from 'react-hook-form';

import './register.component.css';
import AuthService from '../../services/auth.service';

function Register({ history }) {
  // Need the return url
  const [data, setData] = useState(null);

  // Do login
  const onSubmit = (formData) => {
    AuthService.register(formData.username, formData.password).then(res => {
      if (!res.data.error) {
        // Go to login page when register successful
        history.push('/login');
      } else {
        setData(res.data);
      }
    }).catch(error => {
      if (error.response) {
        setData(error.response.data);
      }
    });
  };

  const { register, handleSubmit, errors } = useForm();

  return (
    <div>
      <h1 className="my-4 pt-4">Register</h1>
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
            <input className="btn btn-primary mr-3" type="submit" value="Register" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
