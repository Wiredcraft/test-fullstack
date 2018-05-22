import React from 'react';
import cssClass from './VideoCard.css';

const videoCard = (props) => (
    <div className='col-md-4'>
        <div className="card p-0">
            <div className="view overlay">
                <div className="embed-responsive embed-responsive-16by9">
                    <iframe className="embed-responsive-item" src={props.url} allowFullScreen/>
                </div>
            </div>
            <div className="card-body text-left">
                <h5 className="card-title">{props.title}</h5>
                <hr/>
                <p className={`${cssClass["card-text"]} card-text`}>{props.description}</p>
            </div>
            <div className="rounded-bottom mdb-color lighten-3 py-3 d-flex justify-content-between">
                <i className="fa fa-clock-o pl-1">{props.publishDate}</i>
                <i className="fa fa-plus white-text"> {props.points}</i>
                <i className="fa fa-user pr-1"> {props.username}</i>
            </div>
        </div>
    </div>

);

export default videoCard;