import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import Amplify, {Auth, API} from 'aws-amplify';
import config from '../../aws-exports';
import Iframe from 'react-iframe';
import Moment from 'react-moment';
import 'moment-timezone';
import VideoCard from '../UI/VideoCard/VideoCard';

Amplify.configure(config);

class Home extends Component {
    state = {
        username: '',
        user: {},
        data: []
    }

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

        API.get('lightning-talk-pollingCRUD', '/lightning-talk-polling/all')
            .then(resp => {
                this.setState({
                    data: resp
                });
                console.log("response is : ", resp);
            })
            .catch (err => console.log(err));
    }

    render() {
        let lightningTalks = this.state.data.map((item) => {
            // todo: format time to readable date format
            // A fix for 'X-Frame-Options' to 'SAMEORIGIN' error
            // so the video can be shown
            let url = item.url.replace("watch?v=", "embed/");
            return (
                <VideoCard
                    key={item.publishDate}
                    title={item.title}
                    url={url}
                    description={item.description}
                    publishDate={item.publishDate}
                    username={item.username}
                    points={item.points}
                />
            )
        });

        return (
          <div  className="container mt-5">
              <div className="row d-flex justify-content-between">
                  {lightningTalks}
              </div>
              {/*<Link*/}
                  {/*to={'/submit-lightning-talk'}*/}
                  {/*label={'submit-lightning-talk'}*/}
              {/*>*/}
                  {/*Submit a lightning talk*/}
              {/*</Link>*/}
          </div>
        )
    }
}

export default withRouter(Home);