import {ApolloProvider} from "@apollo/client";
import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import client from "./api/client";

import "./App.css";
import LoginContainer from "./containers/LoginContainer";
import RegisterContainer from "./containers/RegisterContainer";
import TalksContainer from "./containers/TalksContainer";

const App: React.FunctionComponent = (): JSX.Element => {
    return (
        <ApolloProvider client={client}>
            <Router>
                <div className="center">
                    <Switch>
                        <Route path="/talks">
                            <TalksContainer />
                        </Route>
                        <Route path="/login">
                            <LoginContainer />
                        </Route>
                        <Route path="/register">
                            <RegisterContainer />
                        </Route>
                        <Route path="*">
                            <Redirect to="/talks" />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </ApolloProvider>
    );
};

export default App;
