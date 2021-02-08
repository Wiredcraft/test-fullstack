import * as React from 'react';
import axios from '../../services/axios-service';

import {
  useSelector,
  useDispatch
} from 'react-redux';

import {
  useHistory,
  useParams
} from "react-router-dom";

import * as PageService from '../../services/page-service';

import BaseLayout from '../layouts/base-layout';


const Show = () => {
  let [talk, setTalk] = React.useState({
    title: '',
    content: ''
  });

  const history = useHistory();
  const urlPrefix = PageService.urlPrefix;
  const apiUrl = PageService.apiUrl;

  const { id } = useParams();

  React.useEffect(() => {
    axios.get(`${apiUrl}/api/talks/${id}`)
    .then(function(response: any) {
      setTalk(response.data);
    })
    .catch(function(error: any) {
      // console.log(error);
    })
    .then(function () {
    });

  }, []);


  return (
    <BaseLayout>
        <div className="main-content">

          <div className="container">
            {talk.title && talk.content &&
              <>
                <h5 className="title">
                  {talk.title}
                </h5>

                <div className="content">
                  {talk.content}
                </div>
              </>
            }
          </div>

        </div>

    </BaseLayout>
  )
}


export default Show;
