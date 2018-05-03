import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDateDiff } from './date.util';
import GrayArrow from '../../../assets/grayarrow.png';
import { updateTalk, fetchTalks } from "../../../actions/talks.actions";

class TalkRow extends Component {
    handleVote(event) {
        event.stopPropagation();
        if(!this.props.auth.user) {
            this.props.history.push('/login');
            return;
        }

        let talk = {...this.props.talk};
        talk.rating += 1;
        talk.votes.push(this.props.auth.user.username);
        this.props.updateTalk(talk, () => this.props.fetchTalks());
    }

    handleUnvote(event) {
        event.stopPropagation();

        let talk = {...this.props.talk};
        talk.rating -= 1;
        talk.votes.splice(talk.votes.indexOf(this.props.auth.user.username), 1);
        this.props.updateTalk(talk, () => this.props.fetchTalks());
    }

    didUserVote(votes) {
        if(!this.props.auth.user) {
            return false;
        }

        return votes.indexOf(this.props.auth.user.username) >= 0;
    }

    render() {
        const { hours, minutes } = getDateDiff(this.props.talk.publishDate);
        const timeText = hours > 0 ? `${hours} hours ago` : `${minutes} minutes ago`;
        return (
            <div className="row" key={this.props.talk.id}>
                <div className="column">{`${this.props.index + 1}.`}</div>
                <div className="column">
                    <div className="talks-item">
                        <div className="inline upvote-column">
                            {!this.didUserVote(this.props.talk.votes) &&
                            <a onClick={this.handleVote.bind(this)}>
                                <img className="upvote" src={GrayArrow} alt="Upvote"/>
                            </a>}
                        </div>
                        <div className="inline">
                            <div>
                                <span className="title">{this.props.talk.title}</span>
                                {this.props.talk.description && <span className="description"> - {this.props.talk.description}</span>}
                            </div>
                            <div className="small-text">
                                {`${this.props.talk.rating} points by ${this.props.talk.username} ${timeText}`}
                                {this.didUserVote(this.props.talk.votes) && (<span> | <a onClick={this.handleUnvote.bind(this)}>unvote</a></span>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({auth}) => {
    return { auth };
};

export default connect(mapStateToProps, { updateTalk, fetchTalks })(TalkRow);

