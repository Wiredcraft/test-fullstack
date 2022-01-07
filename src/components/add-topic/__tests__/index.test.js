import React from 'react';
import renderer from 'react-test-renderer';

import AddTopic from '../index';

jest.mock('react-router-dom');

test('AddTopic renders', () => {
  const component = renderer.create(<AddTopic />);

  expect(component.toJSON()).toMatchSnapshot();
});
