import React from 'react';
import { mount, shallow } from '../../test.helper';
import configureStore from 'redux-mock-store';
import ReduxPromise from "redux-promise";
import { Provider } from 'react-redux';
import { BrowserRouter, Link } from 'react-router-dom';

import Submit from './submit.component';

describe('Submit component', () => {
    const mockStore = configureStore([ReduxPromise]);
    let component, store, authState;
    beforeEach(() => {
        authState = { user: { username: 'Test user' }};
        store = mockStore(authState);

        component = mount(<Provider store={store}><BrowserRouter><Submit {...authState}/></BrowserRouter></Provider>).find(Submit);
    });


});
