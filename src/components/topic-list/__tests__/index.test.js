import React from 'react';
import renderer from 'react-test-renderer';

import TopicList from '../index';

jest.mock('react-router-dom');

test('TopicList renders', () => {
  const component = renderer.create(<TopicList />);

  expect(component.toJSON()).toMatchSnapshot();
});

test('TopicList renders with props', () => {
  const component = renderer.create(
    <TopicList
      {...{
        topics: [
          { id: 1, rating: 2 },
          { id: 2, rating: 5 }
        ],
        onVote: jest.fn()
      }}
    />
  );

  expect(component.toJSON()).toMatchSnapshot();
});
