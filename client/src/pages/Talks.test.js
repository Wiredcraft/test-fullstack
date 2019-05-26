import React from 'react';
import { render } from 'react-testing-library';
import Talks from './Talks';

it('renders Talks correctly', () => {
  const { asFragment } = render(<Talks />);

  expect(asFragment()).toMatchSnapshot();
});
