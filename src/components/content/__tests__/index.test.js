import React from 'react';
import renderer, { act } from 'react-test-renderer';
import wait from 'waait';

import Content from '../index';
import { getTopics } from '../../../services/topics';

jest.mock('react-router-dom');
jest.mock('axios');
jest.mock('../../../services/topics', () => ({
  getTopics: jest.fn()
}));

test('Content renders', async () => {
  let component;

  await act(async () => {
    component = renderer.create(<Content />);
    await wait();
  });

  expect(component.toJSON()).toMatchSnapshot();
});

test('Content renders with empty topics', async () => {
  let component;

  getTopics.mockReturnValueOnce([]);

  await act(async () => {
    component = renderer.create(<Content />);
    await wait();
  });

  expect(component.toJSON()).toMatchSnapshot();
});

test('Content renders with populated topics', async () => {
  let component;

  getTopics.mockReturnValueOnce([{ id: 1 }]);

  await act(async () => {
    component = renderer.create(<Content />);
    await wait();
  });

  expect(component.toJSON()).toMatchSnapshot();
});
