import React, { useEffect, useState } from "react";
import Main from './layouts/Main';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
  
export default function (props) {
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/">
                        <Main>
                            <Switch>
                                <Route exact path="/" component={require('./pages/Home').default} />
                                <Route exact path="/login" component={require('./pages/Login').default} />
                                <Route exact path="/register" component={require('./pages/Register').default} />
                                {/* <Route exact path="/topics" component={require('./pages/Topics').default} /> */}
                            </Switch>
                        </Main>
                    </Route>
                </Switch>
            </Router>
        </>
    )
}