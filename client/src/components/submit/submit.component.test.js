import React from 'react';
import { mount } from '../../test.helper';
import configureStore from 'redux-mock-store';
import ReduxPromise from "redux-promise";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';


import Submit from './submit.component';

describe('Submit component', () => {
    const mockStore = configureStore([ReduxPromise]);
    let component, store, authState;
    beforeEach(() => {
        authState = { user: { username: 'Test user' }};
        store = mockStore(authState);

        component = mount(<Provider store={store}><BrowserRouter><Submit {...authState}/></BrowserRouter></Provider>).find(Submit);
    });

    it('has rendered the correct fields', () => {
        expect(component.find('input.input-title').length).toBe(1);
        expect(component.find('textarea.input-description').length).toBe(1);
        expect(component.find('button').length).toBe(1);
    });
});
