import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

interface TalksState {
  talks: Talk[];
}

const initialState: TalksState = {
  talks: [],
}

export const talksSlice = createSlice({
  name: 'talks',
  initialState,
  reducers: {},
})

export default talksSlice.reducer
