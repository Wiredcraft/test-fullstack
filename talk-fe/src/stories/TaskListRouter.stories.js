import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';

import TalkListRouter from '../routers/TalkListRouter';

const store = {
  getState: () => {
    return {
      talks: [
        {
          id: 1,
          title: 'title',
          description: 'ssdasssssssd',
          likedCount: 1
        },
        {
          id: 2,
          title: 'title',
          description: 'ssdasssssssd',
          likedCount: 1
        },
        {
          id: 3,
          title: 'title',
          description: 'ssdasssssssd',
          likedCount: 1
        }
      ]
    };
  },
  subscribe: () => 0,
  dispatch: action('dispatch')
};

storiesOf('TaskListRouter', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('default', () => <TalkListRouter />);
