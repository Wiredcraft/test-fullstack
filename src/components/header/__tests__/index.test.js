import React from 'react';
import renderer from 'react-test-renderer';

import Header from '../index';

jest.mock('react-router-dom');

test('Header renders', () => {
  const component = renderer.create(<Header />);

  expect(component.toJSON()).toMatchSnapshot();
});
