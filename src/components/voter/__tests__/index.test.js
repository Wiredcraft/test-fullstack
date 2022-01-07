import React from 'react';
import renderer from 'react-test-renderer';

import Voter from '../index';

test('Voter renders', () => {
  const component = renderer.create(<Voter />);

  expect(component.toJSON()).toMatchSnapshot();
});

test('Voter renders with props', () => {
  const component = renderer.create(
    <Voter {...{ id: 1, rating: 2, onVote: jest.fn() }} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});
