import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import Talks from '../talks/talks.component';
import Login from '../login/login.component';
import PrivateRoute from '../private-route/private-route.component';
import Submit from '../submit/submit.component';

import { checkSession } from "../../actions/auth.actions";

class App extends Component {
    componentWillMount() {
        this.props.checkSession();
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/talks" component={Talks}/>
                    <Route path="/login" component={Login}/>
                    <PrivateRoute path="/submit" component={Submit}/>
                    <Redirect from="/" exact to="/talks"/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default connect(null, { checkSession })(App);
