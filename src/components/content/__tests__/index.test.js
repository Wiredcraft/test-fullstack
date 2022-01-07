import React from 'react';
import renderer, { act } from 'react-test-renderer';
import wait from 'waait';

import Content from '../index';

jest.mock('react-router-dom');
jest.mock('axios');
jest.mock('../../../services/topics', () => ({
  getTopics: () => []
}));

test('Content renders', async () => {
  let component;

  await act(async () => {
    component = renderer.create(<Content />);
    await wait();
  });

  expect(component.toJSON()).toMatchSnapshot();
});
