import reducer from '../talks';

describe('talks reducer', () => {
  it('should return the initial state', () => {
    expect(reducer([], {})).toEqual([]);
  });

  it('should handle talks/save', () => {
    const mockData = [
      {
        id: 1
      },
      {
        id: 2
      }
    ];
    expect(
      reducer([], {
        type: 'talks/save',
        payload: mockData
      })
    ).toEqual(mockData);
  });
});
