import React from 'react';
import Moment from 'react-moment';
import cssClass from './VideoCard.css';

const videoCard = (props) => {
    let upVoteButton;

    if (props.hasUserVoted) {
        upVoteButton =
            <button className={cssClass.invisibleUpVoteButton}><i className="fas fa-check"></i></button>;
    } else {
        upVoteButton =
            <button
                className={cssClass.upVote}
                onClick={props.onUpVote}
            >
                <i className="fas fa-plus"></i>
            </button>;
    }

    return (
        <div className='col-12 col-sm-6 col-xl-4 mb-2'>
            <div className="card p-0">
                <div className="view overlay">
                    <div className="embed-responsive embed-responsive-16by9">
                        <iframe
                            className="embed-responsive-item"
                            src={props.url}
                            allowFullScreen
                        />
                    </div>
                </div>
                <div className="card-body text-left">
                    <h5 className={`${cssClass["card-title"]} card-title`}>{props.title}</h5>
                    <hr/>
                    <p className={`${cssClass["card-text"]} card-text`}>{props.description}</p>
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
    )
}

export default videoCard;