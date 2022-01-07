import React from 'react';
import renderer, { act } from 'react-test-renderer';
import wait from 'waait';
import { useParams, useNavigate } from 'react-router-dom';
import { getTopic } from '../../../services/topics';

import TopicDetail from '../index';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(() => 1),
  useNavigate: jest.fn()
}));
jest.mock('axios');
jest.mock('../../../services/topics', () => ({
  getTopic: jest.fn(() => Promise.resolve(null))
}));

test('TopicDetail navigates to "/" if no topic', async () => {
  const navigate = jest.fn();
  let component;

  useNavigate.mockReturnValueOnce(navigate);

  await act(async () => {
    component = renderer.create(<TopicDetail />);
    await wait();
  });

  expect(component.toJSON()).toMatchSnapshot();
  expect(navigate).toBeCalled();
});
