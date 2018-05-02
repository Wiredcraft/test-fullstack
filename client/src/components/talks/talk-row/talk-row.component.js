import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDateDiff } from './date.util';
import GrayArrow from '../../../assets/grayarrow.png';
import { updateTalk } from "../../../actions/talks.actions";

class TalkRow extends Component {
    render() {
        const { hours, minutes } = getDateDiff(this.props.talk.publishDate);
        const timeText = hours > 0 ? `${hours} hours ago` : `${minutes} minutes ago`;
        return (
            <div className="row" key={this.props.talk.id}>
                <div className="column">{`${this.props.index + 1}.`}</div>
                <div className="column">
                    <div className="talks-item">
                        <div className="inline">
                            <a>
                                <img className="upvote" src={GrayArrow} alt="Upvote" />
                            </a>
                        </div>
                        <div className="inline">
                            <div>
                                <span className="title">{this.props.talk.title}</span>
                                {this.props.talk.description && <span className="description"> - {this.props.talk.description}</span>}
                            </div>
                            <div className="small-text">{`${this.props.talk.rating} points by ${this.props.talk.username} ${timeText}`}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, { updateTalk })(TalkRow);

