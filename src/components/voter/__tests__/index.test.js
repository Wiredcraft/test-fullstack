import React from 'react';
import renderer from 'react-test-renderer';

import Voter from '../index';

test('Voter renders', async () => {
  const component = renderer.create(<Voter />);

  expect(component.toJSON()).toMatchSnapshot();
});
