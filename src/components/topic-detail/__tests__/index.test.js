import React from 'react';
import renderer, { act } from 'react-test-renderer';
import wait from 'waait';

import TopicDetail from '../index';

jest.mock('react-router-dom', () => ({
  useParams: () => 1,
  useNavigate: () => {}
}));
jest.mock('axios');
jest.mock('../../../services/topics', () => ({
  getTopic: () => ({})
}));

test('TopicDetail renders', async () => {
  let component;

  await act(async () => {
    component = renderer.create(<TopicDetail />);
    await wait();
  });

  expect(component.toJSON()).toMatchSnapshot();
});
