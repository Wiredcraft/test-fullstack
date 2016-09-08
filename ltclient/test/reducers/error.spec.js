import expect from 'expect';
import reducer from '../../src/reducers/error';

describe('reducers - error', () => {

  it('should return the initial state', () => {
    let beforeState = undefined;
    let afterState = '';
    let action = {};

    expect(reducer(beforeState, action)).toEqual(afterState);
  });

  it('should handle DISPLAY_ERROR', () => {
    let beforeState = '';
    let afterState = 'hello';
    let action = {
      type: 'DISPLAY_ERROR',
      message: 'hello',
    };

    expect(reducer(beforeState, action)).toEqual(afterState);
  });

  it('should handle DISMISS_ERROR', () => {
    let beforeState = 'whatever';
    let afterState = '';
    let action = {
      type: 'DISMISS_ERROR',
    };

    expect(reducer(beforeState, action)).toEqual(afterState);
  });

});