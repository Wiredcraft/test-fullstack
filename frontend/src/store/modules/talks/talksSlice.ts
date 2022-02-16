import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initBaseState } from '../../core';
import { BaseState } from '../../core/types';
import type { RootState } from '../../store';
import { ITalk } from './talks.types';

export interface ITalksState extends BaseState<ITalk> {}

const initialState: ITalksState = initBaseState<ITalk>()

export const talksSlice = createSlice({
  name: 'talks',
  initialState,
  reducers: {}
});

export default talksSlice.reducer;
