import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import DevTools from './DevTools';
import { createRouter } from '../routes/Routes';

export default function Root(props) {
    const router = createRouter(props.history, props.store);
    return (
        <Provider store={props.store}>
            <div>
                { router }
                <DevTools/>
            </div>
        </Provider>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};
