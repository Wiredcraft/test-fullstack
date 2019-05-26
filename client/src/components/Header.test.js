import React from 'react';
import { render } from 'react-testing-library';
import Header from './Header';

it('renders Header correctly', () => {
  const { asFragment } = render(<Header />);

  expect(asFragment()).toMatchSnapshot();
});
