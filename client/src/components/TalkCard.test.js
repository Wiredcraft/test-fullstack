import React from 'react';
import { render } from 'react-testing-library';
import TalkCard from './TalkCard';

it('renders TalkCard correctly', () => {
  const { asFragment } = render(<TalkCard />);

  expect(asFragment()).toMatchSnapshot();
});
