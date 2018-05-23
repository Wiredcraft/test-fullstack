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
        user: {},
        data: [],
        isVote: false
    }

    apiPath = 'lightning-talk-pollingCRUD';
    path = '/lightning-talk-polling';

    componentDidMount() {
        // Get use's info
        Auth.currentAuthenticatedUser().then(user => this.setState({user}));
        Auth.currentUserInfo()
            .then(user => {
                this.setState({username: user.username});
            })
            .catch(error => console.log('Error retrieving user\' info: ', error));
        this.fetch();
    }

    fetch = async () => {
        this.setState(() => {
            return {
                loading: true
            }
        });

        API.get(this.apiPath, `${this.path}/all`)
            .then(resp => {
                this.setState({
                    data: resp
                });
                console.log("response is : ", resp);
            })
            .catch (err => console.log(err));
    }

    upVote = (lightningTalkVideo) => {
        lightningTalkVideo.points += 1;
        const {username, publishDate, points} = lightningTalkVideo;
        const body = {username, publishDate, points};

        API.put(this.apiPath, `${this.path}/vote`, {body: body})
            .then(() => {
                // Update UI
                lightningTalkVideo.hasUserVoted = [this.state.username];
                this.setState({isVote: true});
            })
            .catch(error => console.log('Put Failed: ', error));
    }

    render() {
        let sortedTalks = this.state.data.sort((a,b) => (a.points > b.points) ? -1 : ((b.points > a.points) ? 1 : 0));
        let lightningTalks = sortedTalks.map((lightningTalkVideo) => {
            // A fix for 'X-Frame-Options' to 'SAMEORIGIN' error so the video can be shown
            let videoID = getYouTubeID(lightningTalkVideo.url);

            // Since this is a schemaless db, the property hasUserVoted is added to a lightning talk on
            // the db when the first user up votes the video
            let hasUserVoted = false;
            if (lightningTalkVideo.hasOwnProperty('hasUserVoted')) {
                hasUserVoted = lightningTalkVideo.hasUserVoted.includes(this.state.username);
            }
            return (
                <VideoCard
                    key={lightningTalkVideo.publishDate} // unix time in milliseconds
                    title={lightningTalkVideo.title}
                    videoID={videoID}
                    description={lightningTalkVideo.description}
                    publishDate={lightningTalkVideo.publishDate}
                    username={lightningTalkVideo.username}
                    points={lightningTalkVideo.points}
                    hasUserVoted={hasUserVoted}
                    onUpVote={() => this.upVote(lightningTalkVideo)}
                />
            )
        });

        return (
          <div className={cssClass.videoCardsContainer + " container mt-5"}>
              <div className="row d-flex justify-content-start">{lightningTalks}</div>
          </div>
        )
    }
}

export default withRouter(Home);