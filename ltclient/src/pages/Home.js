import React from 'react';
import { Link } from 'react-router';

import TalkList from '../components/TalkList';
import Icon from '../components/Icon';

const Home = () => (
  <div className="main">
    <TalkList />
    <Link to="submit" className="addtalk">
      <Icon name="add" />
    </Link>
  </div>
);

export default Home;
