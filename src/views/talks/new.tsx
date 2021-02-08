import * as React from 'react';
import axios from '../../services/axios-service';

import {
  useHistory
} from "react-router-dom";

import * as PageService from '../../services/page-service';

import BaseLayout from '../layouts/base-layout';


const New = () => {
  let [title, setTitle] = React.useState('');
  let [content, setContent] = React.useState('');
  let [error, setError] = React.useState('');

  const history = useHistory();
  const urlPrefix = PageService.urlPrefix;
  const apiUrl = PageService.apiUrl;


  function submitNew(event: React.MouseEvent) {
    let params: any = {};

    if (title === '') {
      setError('Title is required.');
      return;
    }

    if (content === '') {
      setError('Content is required.');
      return;
    }

    params.title = title;
    params.content = content;
    params.rank = 0;
    params.created_at = new Date().getTime();

    // console.log('Posting data....');
    // console.log(params);

    try {
      axios.post(`${apiUrl}/api/talks`, params)
      .then(function (response) {
        // console.log(response);
        history.push(`${urlPrefix}/talks`);
      })
      .catch(function (error) {
        // console.log(error);
      });
    } catch (error) {
      // console.log(error.message);
    }
  }

  return (
    <BaseLayout>
        <div className="main-content">

          <div className="container">

            <div className="form new-form">

              {error &&
                <div className="error">
                  { error }
                </div>
              }

              <div className="input-wrap">

                <div className="after-input hide">
                  <div className="input-hint">Title</div>
                  <input className="title-input" type="text" name="title" id="talk-title" onChange={e => setTitle(e.target.value.trim())} defaultValue={ `${title}` } />
                </div>

              </div>

              <div className="text-wrap">
                <textarea placeholder="Share something...." id="talk-content" onChange={e => setContent(e.target.value.trim())} defaultValue={ `${content}` }></textarea>
              </div>

              <button className="submit-btn" onClick={submitNew}>Submit</button>

            </div>

          </div>

        </div>

    </BaseLayout>
  )
}


export default New;
