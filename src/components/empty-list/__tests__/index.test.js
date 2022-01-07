import React from 'react';
import renderer from 'react-test-renderer';

import EmptyList from '../index';

jest.mock('react-router-dom');

test('EmptyList renders', () => {
  const component = renderer.create(<EmptyList />);

  expect(component.toJSON()).toMatchSnapshot();
});
