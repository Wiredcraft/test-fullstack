import { AnyAction } from '@reduxjs/toolkit';
import reducer from './userSlice';

describe('userSlice', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {} as AnyAction)).toEqual({ user: {} });
  });
});
