import React from 'react';
import renderer from 'react-test-renderer';

import TopicItem from '../index';

jest.mock('react-router-dom');

test('TopicItem renders', async () => {
  const component = renderer.create(<TopicItem />);

  expect(component.toJSON()).toMatchSnapshot();
});
