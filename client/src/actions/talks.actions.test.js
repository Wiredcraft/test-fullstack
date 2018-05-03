import api from '../../__mocks__/api.helper';
import talks from '../../__mocks__/talks';
import response from '../../__mocks__/response';

import { FETCH_TALKS, CREATE_TALK, UPDATE_TALK } from './types';
import { fetchTalks, createTalk, updateTalk } from './talks.actions';

describe('Talk actions', () => {

    let callback, promise;
    beforeEach(() => {
        callback = jest.fn();
        promise = new Promise(resolve => resolve(response));
    });

    describe('fetchTalks', () => {
        
        it('has the correct type and payload', () => {
            const action = fetchTalks();

            expect(action.type).toEqual(FETCH_TALKS);
            expect(action.payload).toEqual(new Promise(resolve => resolve(talks)));
        });

        it('makes the correct api call', () => {
            fetchTalks();

            expect(api.get).toHaveBeenCalledWith('talks?filter[order]=rating DESC');
        });
    });

    describe('createTalk', () => {

        it('has the correct type and payload', () => {
            const action = createTalk({}, callback);

            expect(action.type).toEqual(CREATE_TALK);
            expect(action.payload).toEqual(promise);
        });

        it('makes the correct api call', () => {
            createTalk({}, callback);

            expect(api.post).toHaveBeenCalledWith('talks', {});
        });

        it('makes the callback call on resolved promise', () => {
            createTalk({}, callback);

            promise.then(() => {
                expect(callback).toHaveBeenCalled();
            });
        })
    });

    describe('updateTalk', () => {

        it('has the correct type and payload', () => {
            const action = updateTalk({}, callback);

            expect(action.type).toEqual(UPDATE_TALK);
            expect(action.payload).toEqual(promise);
            expect(api.put).toHaveBeenCalledWith('talks', {});
        });

        it('makes the correct api call', () => {
            updateTalk({}, callback);

            expect(api.put).toHaveBeenCalledWith('talks', {});
        });

        it('makes the callback call on resolved promise', () => {
            updateTalk({}, callback);

            promise.then(() => {
                expect(callback).toHaveBeenCalled();
            });
        })
    });
});
