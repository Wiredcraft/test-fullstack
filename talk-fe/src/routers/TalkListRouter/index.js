import React, { PureComponent } from 'react';
import TalkListContainer from './Container/TalkListContainer';

class TalkListRouter extends PureComponent {
  // state = {};

  componentDidMount() {}

  render() {
    return (
      <div>
        <TalkListContainer />
      </div>
    );
  }
}

export default TalkListRouter;
