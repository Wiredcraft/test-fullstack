import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

//
import Header from '../../app/components/Header';
import LightingTalkList from '../../app/components/LightingTalkList';

const fakeTalksData = [
    {
        id: 1,
        coverURL: 'http://www.flyingant.me/images/me/social_small.png',
        like: 120,
        speaker: 'Ken Robinson',
        title: 'Do schools kill creativity?',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.',
        publisher: 'MaYi',
        date: '2016-07-05 11:00:00'
    },
    {
        id: 2,
        coverURL: 'http://www.flyingant.me/images/me/social_small.png',
        like: 120,
        speaker: 'Ken Robinson',
        title: 'Do schools kill creativity?',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.',
        publisher: 'MaYi',
        date: '2016-07-05 11:00:00'
    },
    {
        id: 3,
        coverURL: 'http://www.flyingant.me/images/me/social_small.png',
        like: 120,
        speaker: 'Ken Robinson',
        title: 'Do schools kill creativity?',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
        publisher: 'MaYi',
        date: '2016-07-05 11:00:00'
    },
    {
        id: 4,
        coverURL: 'http://www.flyingant.me/images/me/social_small.png',
        like: 120,
        speaker: 'Ken Robinson',
        title: 'Do schools kill creativity?',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
        publisher: 'MaYi',
        date: '2016-07-05 11:00:00'
    }
]

storiesOf('App Pages', module)
    .add('Header without login', () => (
        <Header
            logoText={'Talks'}
            status={'Sign In'}
            onBackToIndex={action('Back to index page clicked')}
            onSignIn={action('Click the sign in link')}
            />
    ))

    .add('Header with logged user', () => (
        <Header
            logoText={'Talks'}
            status={'Hi, MaYi'}
            onBackToIndex={action('Back to index page clicked')}
            />
    ))

    .add('Lighting Talk List', () =>(
        <LightingTalkList talks={fakeTalksData}/>
    ))
