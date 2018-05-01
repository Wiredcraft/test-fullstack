import React from 'react';
import {getDateDiff} from "./date.util";

export default (newsItem, index) => {
    const { hours, minutes } = getDateDiff(newsItem.publishDate);
    const timeText = hours > 0 ? `${hours} hours ago` : `${minutes} minutes ago`;
    return (
        <tr key={newsItem.id}>
            <td>{`${index + 1}.`}</td>
            <td>
                <div className="news-item">
                    <div>
                        <span className="upvote"></span>
                        <span className="title">{newsItem.title}</span>
                        {newsItem.url && newsItem.url.length && <span>{newsItem.url}</span>}
                    </div>
                    <div>{`${newsItem.rating} points by ${newsItem.username} ${timeText}`}</div>
                </div>
            </td>
        </tr>
    );
};
