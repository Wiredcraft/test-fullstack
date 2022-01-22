import React, { useEffect, useState } from "react";
import Main from 'Layouts/Main';
import { BrowserRouter as Router, Switch, Route, withRouter} from "react-router-dom";

export default function (props) {
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/">
                        <Main>
                            <Switch>
                                <Route exact path="/" component={require('Pages/Home').default} />
                                <Route exact path="/login" component={require('Pages/Login').default} />
                                <Route exact path="/register" component={require('Pages/Register').default} />
                                <Route exact path="/addTalk" component={require('Pages/AddTalk').default} />
                            </Switch>
                        </Main>
                    </Route>
                </Switch>
            </Router>
        </>
    )
}