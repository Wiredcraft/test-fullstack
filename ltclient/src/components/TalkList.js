import React from 'react';

import Talk from './Talk';

var testData = [
  {
    title: 'How to beat procratination',
    speaker: 'Jon Snow',
    cover: 'http://carlog.qiniudn.com/starry-night.jpg',
    description: 'Jon talks about how to beat procratination',
    submitter: 'bob',
    createdAt: '3 days ago',
    upvote: 233,
  },
  {
    title: 'How to beat procratination',
    speaker: 'Jon Snow',
    cover: 'http://carlog.qiniudn.com/starry-night.jpg',
    description: 'Jon talks about how to beat procratination',
    submitter: 'alice',
    createdAt: '2 hours ago',
    upvote: 56,
  }
];


const TalkList = () => {
  const list = testData.map((item, idx) => {
    return <Talk key={idx} {...item} />
  });

  return (
    <div>
      {list}
    </div>
  );
};

export default TalkList;