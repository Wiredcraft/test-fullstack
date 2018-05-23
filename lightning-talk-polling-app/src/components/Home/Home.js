import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Amplify, {Auth, API} from 'aws-amplify';
import config from '../../aws-exports';
import VideoCard from '../UI/VideoCard/VideoCard';
import cssClass from './Home.css';
import getYouTubeID from 'get-youtube-id';

Amplify.configure(config);

class Home extends Component {
    state = {
        username: '',
        lightningTalkVideos: [],
    }

    // Paths to AWS API Gateway
    apiPath = 'lightning-talk-pollingCRUD';
    path = '/lightning-talk-polling';

    componentDidMount() {
        // Get use's info
        Auth.currentAuthenticatedUser()
            .then(response => this.setState(() => {
                return {
                    username: response.username
                }}))
            .catch(error => console.log('Error retrieving user\' info: ', error));

        // Scan db and get all videos
        API.get(this.apiPath, `${this.path}/all`)
            .then(response => this.setState(() => {return {lightningTalkVideos: response}}))
            .catch (error => console.log(error));
    }

    // Submit a vote
    upVote = (lightningTalkVideo) => {
        lightningTalkVideo.points += 1;
        const {username, publishDate, points} = lightningTalkVideo;
        const body = {username, publishDate, points};

        API.put(this.apiPath, `${this.path}/vote`, {body: body})
            .then(() => {
                // Get the name of the current user who up voted this video
                lightningTalkVideo.hasUserVoted = [this.state.username];
                // Trigger UI to re-render to reflect the new update
                this.forceUpdate();
            })
            .catch(error => console.log('Up vote the video failed: ', error));
    }

    render() {
        // Sort videos list based on rating
        let sortedTalks = this.state.lightningTalkVideos.sort((a,b) => (a.points > b.points) ? -1 : ((b.points > a.points) ? 1 : 0));
        // Convert every lightning talk to VideoCard
        let lightningTalkVideos = sortedTalks.map((talk) => {
            // A fix for 'X-Frame-Options' to 'SAMEORIGIN' error so the video can be shown
            let videoID = getYouTubeID(talk.url);
            // Since this is a schemaless db, the property hasUserVoted is added to a lightning talk on
            // the db when the first user up votes the video
            let hasUserVoted = false;

            if (talk.hasOwnProperty('hasUserVoted')) {
                hasUserVoted = talk.hasUserVoted.includes(this.state.username);
            }

            return (
                <VideoCard
                    key={talk.publishDate} // unix time in milliseconds
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
              <div className="row d-flex justify-content-start">{lightningTalkVideos}</div>
          </div>
        )
    }
}

export default withRouter(Home);