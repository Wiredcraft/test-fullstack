import React from 'react';
import { mount } from '../../test.helper';
import configureStore from 'redux-mock-store';
import ReduxPromise from "redux-promise";
import { Provider } from 'react-redux';
import { BrowserRouter, Link } from 'react-router-dom';
import talks from '../../../__mocks__/talks';

import Talks from './talks.component';
import TalkRow from './talk-row/talk-row.component';

describe('Talks component', () => {
    const mockStore = configureStore([ReduxPromise]);
    let component, store, state;
    beforeEach(() => {
        state = { auth: { user: { username: 'Test user' }}, talks: talks, history: {}};
        store = mockStore(state);

        component = mount(<Provider store={store}><BrowserRouter><Talks {...state}/></BrowserRouter></Provider>).find(Talks);
    });

    it('has the links for submit and talks', () => {
        expect(component.find('Link.title-link').props().to).toEqual('/talks');
        expect(component.find('Link.submit-link').props().to).toEqual('/submit');
    });

    it('has all the talk raws rendered', () => {

        expect(component.find(TalkRow).length).toBe(talks.length);
        expect(component.find('div.empty-content').length).toBe(0);

        component.find(TalkRow).forEach(row => {
            const { talk, index, history } = row.props();

            expect(talk).toBeDefined();
            expect(index).toBeDefined();
            expect(history).toBeDefined();
        });
    });

    it('renders empty row when there are no talks', () => {
        state = { auth: { user: { username: 'Test user' }}, talks: [], history: {}};
        store = mockStore(state);

        component = mount(<Provider store={store}><BrowserRouter><Talks {...state}/></BrowserRouter></Provider>).find(Talks);

        expect(component.find(TalkRow).length).toBe(0);
        expect(component.find('div.empty-content').length).toBe(1);
        expect(component.find('div.empty-content').contains('No talks here! Why not add one yourself?')).toBe(true);
    });
});
