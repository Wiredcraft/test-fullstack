import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Talk from '../components/Talk';

const talk = {
  id: '1',
  title: 'title',
  description: 'description',
  likedCount: 1000
};

const actions = {
  onLike: action('onLike')
};

storiesOf('Talk', module)
  .addDecorator(story => <div style={{ padding: '3rem', background: '#4FD2DA' }}>{story()}</div>)
  .add('default', () => <Talk talk={talk} actions={actions} />);
