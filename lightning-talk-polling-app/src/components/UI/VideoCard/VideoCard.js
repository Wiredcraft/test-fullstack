import React from 'react';
import Moment from 'react-moment';
import cssClass from './VideoCard.css';
import Button from '../Button/Button';

const videoCard = (props) => {
    let upVoteButton;

    // If the user's name is in the list of users who had voted for this video
    // then don't show him the upvoting button
    if (props.hasUserVoted) {
        upVoteButton =
            <Button
                cssClass={cssClass.invisibleUpVoteButton}
                text={<i className="fas fa-check"/>}
            />;
    } else {
        upVoteButton =
            <Button
                cssClass={cssClass.upVote}
                clicked={props.onUpVote}
                text={<i className="fas fa-plus"/>}
            />;
    }

    return (
        <div className='col-12 col-sm-6 col-xl-4 mb-2'>
            <div className="card p-0">
                <div className="view overlay">
                    <div className="embed-responsive embed-responsive-16by9">
                        <iframe
                            className="embed-responsive-item"
                            src={`https://www.youtube.com/embed/${props.videoID}`}
                            allowFullScreen
                        />
                    </div>
                </div>
                <div className="card-body text-left">
                    <h5 className={`${cssClass.cardTitle} card-title`}>{props.title}</h5>
                    <hr/>
                    <p className={`${cssClass.cardText} card-text`}>{props.description}</p>
                </div>
                <div className="rounded-bottom white-text orange darken-4 py-3 d-flex justify-content-between align-items-center">
                    <Moment
                        className="pl-1"
                        unix
                        fromNow
                    >
                        {props.publishDate/1000}
                    </Moment>
                    <div className="h6 orange darken-4 white-text">
                        <span className="pr-2">{props.points}</span>
                        {upVoteButton}
                    </div>
                    <span className="pr-1">By {props.username}</span>
                </div>
            </div>
        </div>
    );
}

export default videoCard;