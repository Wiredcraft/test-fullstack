import React from 'react';
import renderer from 'react-test-renderer';

import TopicItem from '../index';

jest.mock('react-router-dom');

test('TopicItem renders', () => {
  const component = renderer.create(<TopicItem />);

  expect(component.toJSON()).toMatchSnapshot();
});

test('TopicItem renders with props', () => {
  const component = renderer.create(
    <TopicItem
      {...{
        id: 1,
        title: 'Title',
        rating: 2,
        user: 'You',
        onVote: jest.fn()
      }}
    />
  );

  expect(component.toJSON()).toMatchSnapshot();
});
