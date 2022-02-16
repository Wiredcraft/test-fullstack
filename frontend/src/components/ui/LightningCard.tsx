import classNames from 'classnames';
import React from 'react';
import { DateTime } from "luxon";
import StarIcon from '../icons/star';

import './LightningCard.scss';
import { ITalk } from '../../store/modules/talks/talks.types';

type Props = ITalk;

type State = {
  checked: boolean;
};

export default class LightningCard extends React.Component<Props> {
  render() {
    const buttonClass = classNames({
      left: true,
      checked: this.props.voted,
      'px-10': true
    });

    const formattedTime = this.props.createdAt.toLocaleString(DateTime.DATETIME_SHORT)

    return (
      <div className="l-card py-4 my-8">
        <button type="button" className={buttonClass}>
          <StarIcon fillColor="none" size={48} />
          <span className="text-xl">{this.props.votes}</span>
        </button>
        <div className="center pr-4">
          <div className="content">
            <div className="title text-2xl text-bold text-blue">{this.props.title}</div>
            <div className="desc text-lg">{this.props.description}</div>
          </div>
          <div className="info py-2 text-gray">
            <span className="user">{this.props.user.name}</span>
            <span className="mx-2">//</span>
            <span className="created">{formattedTime}</span>
          </div>
        </div>
      </div>
    );
  }
}
