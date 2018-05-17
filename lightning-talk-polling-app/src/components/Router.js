import React, {Component} from 'react';
import {Auth} from 'aws-amplify';
import Authenticator from './Authenticator';
import {
    withRouter,
    Switch,
    Route,
    Redirect,
    BrowserRouter as Router
} from 'react-router-dom';
import {
    Home,
    LightningTalks
} from "./Home";

class PrivateRoute extends Component {
    state = {
        loaded: false,
        isAuthenticated: false
    }

    componentDidMount() {
        this.authenticate();
        this.unlisten = this.props.history.listen(() => {
            Auth.currentAuthenticatedUser()
                .then(user => console.log('Current authenticated user: ', user))
                .catch(() => {
                    if (this.state.isAuthenticated) {
                        this.setState({isAuthenticated: false});
                    }
                });
        })
    }

    componentWillUnmount() {
        this.unlisten();
    }

    authenticate() {
        Auth.currentAuthenticatedUser()
            .then(() => {
                this.setState({
                    loaded: true,
                    isAuthenticated: true
                })
            })
            .catch(() => this.props.history.push('/authenticate'));
    }

    render() {
        const {component: Component, ...rest} = this.props;
        const {loaded, isAuthenticated} = this.state;

        if (!loaded) return null;

        return (
            <Route
                {...rest}
                render={props => {
                    return isAuthenticated ? (<Component {...props}/>) : (<Redirect to={{pathname: "/authenticate"}}/>)
                }}
            />
        );
    }
}

PrivateRoute = withRouter(PrivateRoute);

const Routes = () => (
    <Router>
        <Switch>
            <Route
                path={'/authenticate'}
                component={Authenticator}
            />
            <PrivateRoute
                path={'/lightning-talks'}
                component={LightningTalks}
            />
            <PrivateRoute
                path={'/'}
                component={Home}
            />
        </Switch>
    </Router>
);


export default Routes;