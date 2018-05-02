import React from 'react';
import { getDateDiff } from './date.util';
import GrayArrow from '../../assets/grayarrow.png';

export default (talk, index) => {
    const { hours, minutes } = getDateDiff(talk.publishDate);
    const timeText = hours > 0 ? `${hours} hours ago` : `${minutes} minutes ago`;
    return (
        <div className="row" key={talk.id}>
            <div className="column first-column">{`${index + 1}.`}</div>
            <div className="column">
                <div className="talks-item">
                    <div className="inline">
                        <img className="upvote" src={GrayArrow} alt="Upvote" />
                    </div>
                    <div className="inline">
                        <div>
                            <span className="title">{talk.title}</span>
                        </div>
                        <div className="small-text">{`${talk.rating} points by ${talk.username} ${timeText}`}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
