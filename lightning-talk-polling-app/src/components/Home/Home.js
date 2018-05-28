import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import getYouTubeID from 'get-youtube-id';
import Amplify, {API} from 'aws-amplify';

import * as reduxAction from "../../store/actions/actions";
import config from '../../aws-exports';
import apiGateway from '../../api-gateway-config';

import VideoCard from '../UI/VideoCard/VideoCard';
import cssClass from './Home.css';
import {Auth} from "aws-amplify/lib/index";

Amplify.configure(config);

class Home extends Component {

    componentDidMount() {
        // If there is no new video published then download all videos list
        // else then download only the video user just published
        // and add it to the local array of videos
        if (!this.props.newVideoPublishDate) {
            // Scan db and get all videos
            // Since the data is small we get all video.
            // For large db, better user DynamoDB streams
            API.get(apiGateway.api_path, `/${apiGateway.path}/all`)
                .then(response => {
                    this.props.onNewVideoDownloaded(response);
                })
                .catch (error => console.log('Error downloading all videos: ', error));
        } else {
            API.get(apiGateway.api_path, `/${apiGateway.path}/object/${this.props.username}/${this.props.newVideoPublishDate}`)
                .then(response => {
                    const [...oldPlusNewSubmittedVideo] = this.props.lightningTalkVideos;

                    // Update the video array state by adding the new published video by the current user
                    // and reset the state of the newVideoPublishDate to 0
                    oldPlusNewSubmittedVideo.push(response);
                    this.props.onNewVideoDownloaded(oldPlusNewSubmittedVideo);
                })
                .catch(error => console.log('Error downloading video by its id: ', error));
        }
    }

    // Submit a vote
    upVote = (lightningTalkVideo) => {
        lightningTalkVideo.points += 1;
        const {username, publishDate, points} = lightningTalkVideo;
        const body = {username, publishDate, points};

        // Update the rating on the backend
        API.put(apiGateway.api_path, `/${apiGateway.path}/vote`, {body: body})
            .then(() => {
                // Update the rating on the frontend
                // Add the user to the list of users who up voted the video locally
                lightningTalkVideo.hasUserVoted = [this.props.username];
                // Trigger UI to re-render to reflect the new update
                // Re-rendering NOT refreshing
                this.forceUpdate();
            })
            .catch(error => console.log('Error up vote the video failed: ', error));
    }

    render() {
        // Sort videos list based on rating
        let sortedLightningTalkVideos = this.props.lightningTalkVideos.sort((a,b) => (a.points > b.points) ? -1 : ((b.points > a.points) ? 1 : 0));
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
          <div className={cssClass.videoCardsContainer + " container mt-3"}>
              <div className="row d-flex justify-content-start">{lightningTalkVideosVideoCards}</div>
          </div>
        )
    }
}

export default withRouter(connect(reduxAction.mapStateToProps, reduxAction.mapDispatchToProps)(Home));