import React from 'react';
import { getDateDiff } from './date.util';
import GrayArrow from '../../assets/grayarrow.png';

export default (newsItem, index) => {
    const { hours, minutes } = getDateDiff(newsItem.publishDate);
    const timeText = hours > 0 ? `${hours} hours ago` : `${minutes} minutes ago`;
    return (
        <div className="row" key={newsItem.id}>
            <div className="column first-column">{`${index + 1}.`}</div>
            <div className="column">
                <div className="news-item">
                    <div className="inline">
                        <img src={GrayArrow} alt="Upvote" width="10px"/>
                    </div>
                    <div className="inline">
                        <div>
                            <span className="title">{newsItem.title}</span>
                            {newsItem.url && newsItem.url.length && <span>{newsItem.url}</span>}
                        </div>
                        <div className="small-text">{`${newsItem.rating} points by ${newsItem.username} ${timeText}`}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
