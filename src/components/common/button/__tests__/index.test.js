import React from 'react';
import renderer from 'react-test-renderer';

import Button from '../index';

test('Button renders', () => {
  const component = renderer.create(<Button />);

  expect(component.toJSON()).toMatchSnapshot();
});
