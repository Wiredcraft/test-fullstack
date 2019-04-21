import React from 'react';
import { render } from 'react-testing-library';
import App from './App';

jest.mock('./components/FirebaseAuth');

it('renders App correctly', () => {
  const { asFragment } = render(<App />);

  expect(asFragment()).toMatchSnapshot();
});
