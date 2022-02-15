import React from 'react';
import { Link } from 'react-router-dom';

import './LightningCard.scss';

type Props = {
  title: string;
  description: string;
  likes: string;
  createdAt: Date;
  userName: string;
};
export default class LightningCard extends React.Component<Props> {
  render() {
    return <div className="border-black">It's a card!</div>;
  }
}
