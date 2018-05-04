import React from 'react';
import { mount, shallow } from '../../../test.helper';
import configureStore from 'redux-mock-store';
import ReduxPromise from "redux-promise";
import talks from '../../../../__mocks__/talks';

import { updateTalk } from '../../../../__mocks__/talks.actions';

import TalkRow from './talk-row.component';

describe('Talks component', () => {

    const mockStore = configureStore([ReduxPromise]);
    let component, store, state;
    beforeEach(() => {
        state = {auth: {user: {username: 'Test user'}}, talk: talks[0], index: 0, history: []};
        store = mockStore(state);

    });

    describe('Rendering talks', () => {
        beforeEach(() => {
            component = mount(<TalkRow store={store} {...state}/>);
        });

        it('renders the correct values in the row', () => {
            expect(component.find('.row-number').contains(state.index + 1 + '.')).toBe(true);
            expect(component.find('.title').contains(state.talk.title)).toBe(true);
            expect(component.find('.upvote-link').length).toBe(1);
            expect(component.find('.upvote-link').find('img.upvote').length).toBe(1);
            expect(component.find('.description').length).toBe(1);
            expect(component.find('.description').contains(state.talk.description)).toBe(true);
        });

        it('hides description when there isn\'t one', () => {
            state.talk.description = null;
            component = mount(<TalkRow store={store} {...state}/>);

            expect(component.find('.description').length).toBe(0);
        });

        it('shows unvote span when the user has voted', () => {
            state.talk.votes = [state.auth.user.username];
            component = mount(<TalkRow store={store} {...state}/>);

            expect(component.find('.unvote').length).toBe(1);
        });
    });

    describe('didUserVote', () => {
        let instance, state, store;

        beforeEach(() => {
            state = {auth: {user: { username: 'test user'}}, talk: talks[0], index: 0, history: []};
            store = mockStore(state);
            instance = shallow(<TalkRow store={store} {...state}/>).dive().instance();
        });

        it('returns false when the user is not logged in', () => {
            state.auth.user = null;
            expect(instance.didUserVote(state.talk.votes)).toBe(false);
        });

        it('returns false when user is logged in but didn\'t vote', () => {
            state.talk.votes = [];
            expect(instance.didUserVote(state.talk.votes)).toBe(false);
        });

        it('returns true when the user is logged in and did vote', () => {
            state.talk.votes = [state.auth.user.username];
            expect(instance.didUserVote(state.talk.votes)).toBe(true);
        });
    });

    describe('handleVote', () => {
        let instance, state, store, event;

        beforeEach(() => {
            event = { stopPropagation: jest.fn() };

            state = {auth: {user: { username: 'test user'}}, talk: talks[0], index: 0, history: []};
            store = mockStore(state);
            const wrapper = shallow(<TalkRow store={store} {...state} />);

            instance = wrapper.dive().instance();
        });

        it('navigates to login page if the user is not logged in', () => {
            state.auth.user = null;

            instance.handleVote(event);
            expect(event.stopPropagation).toHaveBeenCalled();
            expect(instance.props.history.indexOf('/login')).toBeGreaterThanOrEqual(0);
        });

        it('calls updateTalk with correct parameters', () => {
            state.talk.votes = [];
            state.talk.rating = 0;

            const expectedObj = {...state.talk};
            expectedObj.rating = 1;
            expectedObj.votes = [state.auth.user.username];

            instance.handleVote(event);

            expect(updateTalk.mock.calls[updateTalk.mock.calls.length - 1][0]).toEqual(expectedObj);
        });
    });

    describe('handleUnvote', () => {
        let instance, state, store, event;

        beforeEach(() => {
            event = {stopPropagation: jest.fn()};

            state = {auth: {user: {username: 'test user'}}, talk: talks[0], index: 0, history: []};
            store = mockStore(state);
            const wrapper = shallow(<TalkRow store={store} {...state} />);

            instance = wrapper.dive().instance();
        });

        it('calls updateTalk with correct parameters', () => {
            state.talk.votes = [state.auth.user.username];
            state.talk.rating = 1;

            const expectedObj = {...state.talk};
            expectedObj.rating = 0;
            expectedObj.votes = [];

            instance.handleUnvote(event);

            expect(updateTalk.mock.calls[updateTalk.mock.calls.length - 1][0]).toEqual(expectedObj);
        });

    });
});
