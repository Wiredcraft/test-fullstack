jest.mock('../src/actions/api.helper.js', () => ({ get: jest.fn(), post: jest.fn(), put: jest.fn() }));

import api from '../src/actions/api.helper';
import talks from './talks';
import response from './response';

api.get.mockImplementation(() => new Promise(resolve => resolve(talks)));
api.post.mockImplementation((endpoint, value) => new Promise(resolve => { resolve(response) }));
api.put.mockImplementation((endpoint, value) => new Promise(resolve => { resolve(response) }));

module.exports = api;
