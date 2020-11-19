import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';
import Login from './components/login/login.component';
import LightningTalkList from './components/lightning-talk-list/lightning-talk-list.component';
import LightningTalkDetail from './components/lightning-talk-detail/lightning-talk-detail.component';
import CreateLightningTalk from './components/create-lightning-talk/create-lightning-talk.component';
import Register from './components/register/register.component';
import NavigationBar from './components/navigation-bar/navigation-bar.component';
import AuthGuard from './utils/auth-guard';

// Require authentication to access lightning talk creation.
const AuthCreateLightningTalk = AuthGuard(CreateLightningTalk);

function App() {
  return (
    <div>
      <NavigationBar />
      <div className="container pb-4">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/lightning-talks" component={LightningTalkList} />
          <Route exact path="/lightning-talks/:id" component={LightningTalkDetail} />
          <Route exact path="/create" component={AuthCreateLightningTalk} />
          <Redirect from="/*" to="/lightning-talks"/>
        </Switch>
      </div>
    </div>
  );
}

export default App;
