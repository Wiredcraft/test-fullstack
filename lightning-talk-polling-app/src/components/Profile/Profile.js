import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {API, Auth} from "aws-amplify/lib/index";
import AuxiliaryComponent from "../../hoc/AuxiliaryComponent";

class Profile extends Component {
    state = {
        user: {},
        username: '',
        email: '',
        email_verified: false,
        phone_number: 0,
        phone_number_verified: false,
        id: '',
        usersVideos: []
    }

    componentDidMount() {
        // Get use's info
        // todo: check difference between  currentAuthenticatedUser and currentUserInfo
        // Auth.currentAuthenticatedUser().then(user => this.setState({user}));
        Auth.currentUserInfo()
            .then(user => {
                this.setState({
                    username: user.username,
                    email: user.attributes.email,
                    email_verified: user.attributes.email_verified,
                    phone_number: user.attributes.phone_number,
                    phone_number_verified: user.attributes.phone_number_verified,
                    id: user.id,
                });
                this.fetch();
            })
            .catch(error => console.log('Error retrieving user\' info: ', error));

    }

    fetch = async () => {
        this.setState(() => {
            return {
                loading: true
            }
        });

        API.get('lightning-talk-pollingCRUD', `/lightning-talk-polling/${this.state.username}`)
            .then(usersVideos => this.setState({usersVideos: usersVideos}))
            .catch (err => console.log(err));
    }

    render() {
        let usersVideo = this.state.usersVideos.map((video) => {
            console.log('video ', video);
           return (
               <a
                   key={video.publishDate}
                   href={video.url}
                   target='_blank'
                   className="list-group-item waves-effect"
               >
                   {video.title}
               </a>
               )
        });

        return (
            <AuxiliaryComponent>
                <ul className="list-group list-group-flush text-left">
                    <li className="list-group-item"><span className="font-weight-bold">Hello! {this.state.username}</span></li>
                    <li className="list-group-item"><span className="font-weight-bold">Email:</span> {this.state.email}</li>
                    <li className="list-group-item"><span className="font-weight-bold">Is email verified:</span> {this.state.email_verified.toString()}</li>
                    <li className="list-group-item"><span className="font-weight-bold">Phone number:</span> {this.state.phone_number}</li>
                    <li className="list-group-item"><span className="font-weight-bold">Is phone number verified:</span> {this.state.phone_number_verified.toString()}</li>
                    <li className="list-group-item"><span className="font-weight-bold">Unique ID:</span> {this.state.id}</li>
                </ul>
                <div className="list-group text-left pt-5">
                    <span className="list-group-item white-text grey darken-4">Your Videos</span>
                    {usersVideo}
                </div>
            </AuxiliaryComponent>
        );
    }
}

export default withRouter(Profile);