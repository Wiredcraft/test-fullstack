import React, { Component } from 'react'
import './NewCommentWidget.css';
import logo from '../resources/icons/ic_send.png';
export default class NewCommentWidget extends Component {
    render() {
        return (
            <div className="card">
                <label className="desc">Whats on your mind ?</label>
                <img className="send" src={logo} alt=""></img>
            </div>
        )
    }
}
