import React from 'react';
import renderer from 'react-test-renderer';

import TopicList from '../index';

test('TopicList renders', async () => {
  const component = renderer.create(<TopicList />);

  expect(component.toJSON()).toMatchSnapshot();
});
