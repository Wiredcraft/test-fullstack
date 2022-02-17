import { AnyAction } from '@reduxjs/toolkit';
import { initBaseState } from '../../core';
import { ITalk } from './talks.types';
import reducer from './talksSlice';

describe('talksSlice', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {} as AnyAction)).toEqual(initBaseState<ITalk>());
  });
});
