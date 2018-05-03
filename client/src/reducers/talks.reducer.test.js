import { FETCH_TALKS } from "../actions/types";
import TalksReducer from './talks.reducer';
import talks from '../../__mocks__/talks';

describe('Talks reducer', () => {
    it('handles an undefined action', () => {
        expect(TalksReducer([], undefined)).toEqual([]);
    });

    it('handles the FETCH_TALKS action', () => {
        const action = { type: FETCH_TALKS, payload: {data: talks}};

        expect(TalksReducer([], action)).toEqual([...talks]);
    });
});
