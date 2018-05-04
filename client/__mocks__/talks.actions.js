import { fetchTalks, updateTalk } from "../src/actions/talks.actions";
import { FETCH_TALKS, UPDATE_TALK } from "../src/actions/types";

jest.mock('../src/actions/talks.actions.js', () => ({ updateTalk: jest.fn(), createTalk: jest.fn(), fetchTalks: jest.fn() }));

fetchTalks.mockImplementation((talk, callback) => ({ type: FETCH_TALKS, payload: {}}));
updateTalk.mockImplementation((talk, callback) => ({ type: UPDATE_TALK, payload: {}}));

module.exports = { updateTalk, fetchTalks };
