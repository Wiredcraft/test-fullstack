import { call, put } from 'redux-saga/effects';
import * as talksEffect from '../talksEffect';
import * as talksService from '../../../services/talksService';
import * as globalService from '../../../services/globalService';

describe('talksEffect', () => {
  it('should run talks/get effect', () => {
    const gen = talksEffect.get();
    expect(gen.next().value).toEqual(call(talksService.get));
    expect(gen.next([]).value).toEqual(put({ type: 'talks/save', payload: [] }));
    expect(gen.next()).toEqual({ value: undefined, done: true });
  });

  it('should run talks/like effect', () => {
    const gen = talksEffect.like({ payload: { id: 1 } });
    expect(gen.next().value).toEqual(call(talksService.like, { id: 1 }));
    expect(gen.next({}).value).toEqual(put({ type: 'talks/get' }));
    expect(gen.next()).toEqual({ value: undefined, done: true });
  });

  it('should run talks/create effect', () => {
    const payload = { title: 'title', description: 'description' };
    const gen = talksEffect.create({ payload });
    expect(gen.next().value).toEqual(call(talksService.create, payload));
    expect(gen.next({}).value).toEqual(call(globalService.nav, { url: '/list' }));
    expect(gen.next()).toEqual({ value: undefined, done: true });
  });
});
