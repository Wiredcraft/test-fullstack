import React, { useEffect, useState } from "react";
import Main from './layouts/Main';
import { HashRouter as Router, Redirect, Switch, Route } from "react-router-dom";

export default function (props) {
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/">
                        <Main>
                            <Switch>
                                <Route exact path="/login" component={require('Pages/Login').default} />
                                <Route exact path="/register" component={require('Pages/Register').default} />
                                <Route exact path="/topics" component={require('Pages/Topics').default} />
                                <Redirect from="/" to="/login" />
                            </Switch>
                        </Main>
                    </Route>
                </Switch>
            </Router>
        </>
    )
}