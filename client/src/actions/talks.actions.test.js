import api from '../../__mocks__/api.helper';
import talks from '../../__mocks__/talks';
import response from '../../__mocks__/response';

import { FETCH_TALKS, CREATE_TALK, UPDATE_TALK } from './types';
import { fetchTalks, createTalk, updateTalk } from './talks.actions';

describe('Talk actions', () => {
    describe('fetchTalks', () => {
        it('has the correct type and payload', () => {
            const action = fetchTalks();

            expect(action.type).toEqual(FETCH_TALKS);
            expect(action.payload).toEqual(new Promise(resolve => resolve(talks)));
            expect(api.get).toHaveBeenCalledWith('talks?filter[order]=rating DESC');
        });
    });

    describe('createTalk', () => {
        it('has the correct type and payload', () => {
            const callback = jest.fn();
            const action = createTalk({}, callback);
            const promise = new Promise(resolve => {return resolve(response)});

            expect(action.type).toEqual(CREATE_TALK);
            expect(action.payload).toEqual(promise);

            promise.then(() => {
                expect(callback).toHaveBeenCalled();
            });
        });
    });

    describe('updateTalk', () => {
        it('has the correct type and payload', () => {
            const callback = jest.fn();
            const action = updateTalk({}, callback);
            const promise = new Promise(resolve => {return resolve(response)});

            expect(action.type).toEqual(UPDATE_TALK);
            expect(action.payload).toEqual(promise);

            promise.then(() => {
                expect(callback).toHaveBeenCalled();
            });
        });
    });
});
