import React, { Component} from "react";
import userIcon from "../asset/user2.png";
import meetingIcon from "../asset/meeting2.png";

class Login extends Component {

    constructor(props) {
		super(props);
	}

    state = {
        meetingID: '',
        isMeetingExisted: false,
        userName: '',
        isUserNameInMeeting: false,
        checkResponse: null
    }

    render(h) {
        return (
            <div className="login-container">
                <div className="field-container">
                    <img className="input-icon" src={meetingIcon} />
                    <input type="text" id="meetingID" placeholder="Meeting ID (4 bits)"
                        onChange={this.onMeetingIDFieldChangeHandler}
                        value={this.state.meetingID} />
                </div>

                <div className="field-container">
                    <img className="input-icon" src={userIcon} />
                    <input type="text" id="userName" placeholder="User Name"
                        onChange={this.onUserNameFieldChangeHandler}
                        value={this.state.userName} />
                </div>

                <div>
                    {this.renderInstruction()}
                    {this.renderButton()}
                </div>
            </div>
        );
    }

    onUserNameFieldChangeHandler = (e) => {
        this.setState({
            userName: e.target.value
        });
    }

    onMeetingIDFieldChangeHandler = (e) => {
        this.setState({
            meetingID: e.target.value
        });
    }

    renderInstruction = () => {
        if (!this.state.checkResponse) {
            return null;
        }
        let inst;
        if (this.state.isMeetingExisted && this.state.isUserNameInMeeting) {
            inst = `Meeting ${this.state.meetingID} has existed and User ${this.state.userName} has joined in, you will be directly connected`;
        }

        if (this.state.isMeetingExisted && !this.state.isUserNameInMeeting) {
            inst = `Meeting ${this.state.meetingID} has existed and User ${this.state.userName} will be created for the meeting`
        }

        if (!this.state.isMeetingExisted) {
            inst = `Meeting ${this.state.meetingID} will be created and User ${this.state.userName} will be the organizer`
        }

        return (
            <p>{inst}</p>
        );
    }

    renderButton = () => {
        const checkButton = <button onClick={this.onCheckButtonClickHandler}>Check</button>;
        const connectButton = <button onClick={this.onConnectButtonClickHandler}>Connect</button>;

        return (this.state.checkResponse)? connectButton : checkButton;
    }

    onCheckButtonClickHandler = () => {
        const response = await fetch('http://localhost:3001/meeting', {
            method: 'get',
            mode:'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                meetingID: 1234,//this.state.meetingID,
                user: "CJ"
            },
        });
        const data = await response.json();
        console.log({ data })

        this.setState({
            isMeetingExisted: true,
            isUserNameInMeeting: true,
            checkResponse: 12345
        })
        console.log('onCheckButtonClickHandler', this.state);
    }

    onConnectButtonClickHandler = () => {
        console.log('onConnectButtonClickHandler');
    }
}

export default Login;