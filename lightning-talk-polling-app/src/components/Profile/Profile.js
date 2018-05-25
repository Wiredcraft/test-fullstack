import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {API, Auth} from "aws-amplify/lib/index";
import AuxiliaryComponent from "../../hoc/AuxiliaryComponent";
import * as reduxAction from "../../store/actions/actions";
import {connect} from "react-redux";
import apiGateway from "../../api-gateway-config";

class Profile extends Component {
    state = {
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
        Auth.currentUserInfo()
            .then(user => {
                this.setState(() => {return {
                    username: user.username,
                    email: user.attributes.email,
                    email_verified: user.attributes.email_verified,
                    phone_number: user.attributes.phone_number,
                    phone_number_verified: user.attributes.phone_number_verified,
                    id: user.id,
                }});
                this.fetchUsersVideos();
            })
            .catch(error => {
                // Force the user to log out
                this.props.onSignOut();
                this.props.history.push('/authenticate');
                console.log('Error retrieving user\'s info. Force user to log out: ', error);
            });
    }

    fetchUsersVideos = () => {
        API.get(apiGateway.api_path, `/${apiGateway.path}/${this.state.username}`)
            .then(usersVideos => this.setState(() => {return{usersVideos: usersVideos}}))
            .catch (err => console.log(err));
    }

    render() {
        let usersVideo = this.state.usersVideos.map((video) => {
           return (
               <a
                   key={video.publishDate}
                   href={video.url}
                   target='_blank'
                   className="list-group-item waves-effect"
               >
                   {video.title}
               </a>
           )});

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

export default withRouter(connect(null, reduxAction.mapDispatchToProps)(Profile));