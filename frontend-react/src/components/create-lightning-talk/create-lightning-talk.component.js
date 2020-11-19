import { useState } from 'react';
import { useForm } from 'react-hook-form';

import './create-lightning-talk.component.css';
import LightningTalkService from '../../services/lightning-talk.service';

function CreateLightningTalk({ history }) {
  const [data, setData] = useState(null);

  // create lightning talk on form submit
  const onSubmit = (formData) => {
    LightningTalkService.create(formData.title, formData.description, formData.file[0]).then(res => {
      if (!res.data.error) {
        // redirect to the item just created if no errors
        history.push(`/lightning-talks/${res.data.result.id}`);
      } else {
        setData(res.data);
      }
    }).catch((error) => {
      if (error.response) {
        setData(error.response.data);
      }
    });
  };

  const { register, handleSubmit, errors } = useForm();

  return (
    <div>
      <h1 className="my-4 pt-4">Create Lightning Talk</h1>
      <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col">
            <label htmlFor="title">Title
              { errors.title
                && <span className="text-danger">
                    <span>*</span>
                  </span>
              }
            </label>
            <input name="title" type="text" className="form-control" ref={register({required: true})} />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <label htmlFor="description">Description
              { errors.description
                && <span className="text-danger">
                    <span>*</span>
                  </span>
              }
            </label>
            <textarea name="description" type="text" className="form-control" ref={register({required: true})}></textarea>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <label htmlFor="file">PowerPoint
              { errors.file
                && <span className="text-danger">
                    <span>*</span>
                  </span>
              }
            </label>
            <input type="file" accept=".ppt,.pptx" name="file" className="form-control" ref={register({required: true})} />
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
            <input className="btn btn-primary" type="submit" value="Submit" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateLightningTalk;
