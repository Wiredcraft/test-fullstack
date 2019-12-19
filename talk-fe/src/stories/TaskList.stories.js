import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import TalkList from '../components/TalkList';

const talks = [
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
];

const actions = {
  onLike: action('onLike')
};

storiesOf('TalkList', module)
  .addDecorator(story => <div style={{ padding: '3rem', background: '#4FD2DA' }}>{story()}</div>)
  .add('list of talks', () => <TalkList talks={talks} actions={actions} />)
  .add('empty talks', () => <TalkList talks={[]} />);
