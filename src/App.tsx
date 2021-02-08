import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';

import * as PageService from './services/page-service';
import axios from './services/axios-service';

import Index from './views/talks/index';
import Show from './views/talks/show';
import New from './views/talks/new';


const APP = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: { profile: any }) => state.profile);

  const urlPrefix = PageService.urlPrefix;
  const apiUrl = PageService.apiUrl;
  const wsUrl = PageService.wsUrl;

  React.useEffect(() => {

    axios.get(`${apiUrl}/api/profile`)
    .then(function(response: any) {
      // console.log(response);
      dispatch({
        type: 'profile',
        value: response.data
      });
    })
    .catch(function(error: any) {
      // console.log(error);
    })
    .then(function () {
    });

  }, [profile.id]);

  React.useEffect(() => {
    axios.get(`${apiUrl}/api/talks`)
    .then(function(response: any) {
      // console.log(response.data);
      dispatch({
        type: 'talks',
        value: response.data
      });
    })
    .catch(function(error: any) {
      // console.log(error);
    })
    .then(function () {
    });

  }, []);


  React.useEffect(() => {
    const ws = new WebSocket(`${wsUrl}`);

    // console.log(`${urlPrefix}/talks`)

    ws.onopen = function() {
      console.log('WS connected'); 
      ws.send('Hello, This is WS client.');
    }

    ws.onmessage = function(event) {
      // console.log('Receive talks by ws');
      // console.log(JSON.parse(event.data).talks);
      dispatch({
        type: 'talks',
        value: JSON.parse(event.data).talks
      });
    };
  }, []);


  return (
    <Switch>

      <Route path={`${urlPrefix}/`} component={Index} exact />
      <Route path={`${urlPrefix}/talks`} component={Index} exact />
      <Route path={`${urlPrefix}/talks/new`} component={New} exact />
      <Route path={`${urlPrefix}/talks/:id`} component={Show} />

    </Switch>
  )
}


export default APP;
