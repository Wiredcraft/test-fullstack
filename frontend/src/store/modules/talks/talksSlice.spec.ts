import { AnyAction } from '@reduxjs/toolkit';
import reducer from './talksSlice';

describe('talksSlice', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {} as AnyAction)).toEqual({ talks: [] });
  });
});
