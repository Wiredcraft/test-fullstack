import React from 'react';

const videoCard = (props) => (
    <div
        key={props.publishDate}
        className="card col-sm-4 p-0">
        <div className="view overlay">
            <div className="embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item" src={props.url} allowFullScreen/>
            </div>
        </div>
        <div className="card-body text-left">
            <h4 className="card-title">{props.title}</h4>
            <hr/>
            <p className="card-text">{props.description}</p>
        </div>
        <div className="rounded-bottom mdb-color lighten-3 py-3 d-flex justify-content-between">
            <i className="fa fa-clock-o pl-1">{props.publishDate}</i>
            <i className="fa fa-plus white-text"> {props.points}</i>
            <i className="fa fa-user pr-1"> {props.username}</i>
        </div>
    </div>
);

export default videoCard;