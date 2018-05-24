import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import getYouTubeID from 'get-youtube-id';
import Amplify, {Auth, API} from 'aws-amplify';

import * as reduxAction from "../../store/actions/actions";
import config from '../../aws-exports';
import VideoCard from '../UI/VideoCard/VideoCard';
import cssClass from './Home.css';

Amplify.configure(config);

class Home extends Component {
    state = {
        lightningTalkVideos: [],
    }

    componentDidMount() {
        // Scan db and get all videos
        // Since the data is small we get all video. For large db, better user DynamoDB streams
        API.get(config.api_gateway_path, `/${config.sub_api_gateway_path}/all`)
            .then(response => this.setState(() => {return {lightningTalkVideos: response}}))
            .catch (error => console.log(error));
    }

    // Submit a vote
    upVote = (lightningTalkVideo) => {
        lightningTalkVideo.points += 1;
        const {username, publishDate, points} = lightningTalkVideo;
        const body = {username, publishDate, points};

        API.put(config.api_gateway_path, `/${config.sub_api_gateway_path}/vote`, {body: body})
            .then(() => {
                // Get the name of the current user who up voted this video
                // Add username to the list of users who up voted this video
                lightningTalkVideo.hasUserVoted = [this.props.username];
                // Trigger UI to re-render to reflect the new update
                // Re-rendering NOT refreshing
                this.forceUpdate();
            })
            .catch(error => console.log('Up vote the video failed: ', error));
    }

    render() {
        // Sort videos list based on rating
        let sortedLightningTalkVideos = this.state.lightningTalkVideos.sort((a,b) => (a.points > b.points) ? -1 : ((b.points > a.points) ? 1 : 0));
        // Convert every lightning talk to VideoCard
        let lightningTalkVideosVideoCards = sortedLightningTalkVideos.map((talk) => {
            // A fix for 'X-Frame-Options' to 'SAMEORIGIN' error so the video can be shown
            let videoID = getYouTubeID(talk.url);
            // Since this is a schema-less db, the property 'hasUserVoted' is added to a lightning talk on
            // the db when the first user up votes the video
            let hasUserVoted = false;

            // Check whether this user has up voted this video before or not
            // if false, show him voting button so he can up vote the video
            if (talk.hasOwnProperty('hasUserVoted')) {
                hasUserVoted = talk.hasUserVoted.includes(this.props.username);
            }

            return (
                <VideoCard
                    key={talk.publishDate} // Unix time in milliseconds
                    title={talk.title}
                    videoID={videoID}
                    description={talk.description}
                    publishDate={talk.publishDate}
                    username={talk.username}
                    points={talk.points}
                    hasUserVoted={hasUserVoted}
                    onUpVote={() => this.upVote(talk)}
                />
            )
        });

        return (
          <div className={cssClass.videoCardsContainer + " container mt-5"}>
              <div className="row d-flex justify-content-start">{lightningTalkVideosVideoCards}</div>
          </div>
        )
    }
}

export default withRouter(connect(reduxAction.mapStateToProps)(Home));