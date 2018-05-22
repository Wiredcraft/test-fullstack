import React from 'react';
import Moment from 'react-moment';
import cssClass from './VideoCard.css';

const videoCard = (props) => (
    <div className='col-md-4'>
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
                <h5 className="card-title">{props.title}</h5>
                <hr/>
                <p className={`${cssClass["card-text"]} card-text`}>{props.description}</p>
            </div>
            <div className="rounded-bottom mdb-color lighten-3 py-3 d-flex justify-content-between">
                <Moment
                    className="pl-1"
                    unix
                    fromNow
                >
                    {props.publishDate/1000}
                </Moment>
                <i className="fas fa-arrow-alt-circle-up fa-2x white-text"> {props.points}</i>
                <span className="pr-1">{props.username}</span>
            </div>
        </div>
    </div>

);

export default videoCard;