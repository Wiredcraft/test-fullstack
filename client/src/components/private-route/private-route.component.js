import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    let url = `/login`;
    if(rest.path) {
        url = `${url}?redirectTo=${rest.path.replace('/', '')}`;
    }

    return(<Route {...rest} render={(props) => (
        rest.auth.user ?
            <Component {...props} /> : <Redirect to={url}/>
    )}/>);
};

const mapStateToProps = ({auth}) => {
    return { auth };
};

export default connect(mapStateToProps)(PrivateRoute);
