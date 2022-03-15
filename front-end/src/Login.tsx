import React from "react";
import userIcon from "../asset/user2.png";
import meetingIcon from "../asset/meeting2.png";
import { getMeetingByID, postMeeting, putUser } from "./apiRequest";
import { useNavigate } from "react-router-dom";
import { IMeeting } from "./type";

const defaultState = {
    meetingID: '',
    isMeetingExisted: false,
    userName: '',
    isUserNameInMeeting: false,
    isCheckButtonValid: false,
    checkResponse: null
};

class Login extends React.Component<any, {}> {

    state = defaultState;

    constructor(props: any) {
		super(props);
	}

    render() {
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

    onUserNameFieldChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            userName: e.target.value,
            isCheckButtonValid: e.target.value.length > 0 && this.state.meetingID.length > 0
        });
    }

    onMeetingIDFieldChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            meetingID: e.target.value,
            isCheckButtonValid: this.state.userName.length > 0 && e.target.value.length > 0
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
        const checkButton = <button disabled={!this.state.isCheckButtonValid} onClick={this.onCheckButtonClickHandler}>Check</button>;
        const okButton = <button key="okButton" onClick={this.onOKButtonClickHandler}>OK</button>;
        const resetButton = <button key="resetButton" onClick={this.onResetButtonClickHandler}>Reset</button>;

        return (this.state.checkResponse)? [resetButton, okButton] : checkButton;
    }

    onCheckButtonClickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const meeting = await getMeetingByID(this.state.meetingID) as any;
        // console.log(meeting)

        let isUserNameInMeeting: boolean;
        if (!meeting.error) {
            isUserNameInMeeting = meeting.allUsers.includes(this.state.userName);
        } else {
            // back-end has no meeting
            isUserNameInMeeting = false;
        }

        this.setState({
            isMeetingExisted: (meeting.error)? false: true,
            isUserNameInMeeting,
            checkResponse: meeting
        })
        console.log('onCheckButtonClickHandler', this.state);
    }

    onOKButtonClickHandler = async () => {
        let meeting = this.state.checkResponse as unknown as IMeeting;
        // create meeting, and set user as organizer
        if (!this.state.isMeetingExisted) {
            const newMeeting = await postMeeting(this.state.meetingID, this.state.userName);
            meeting = newMeeting;
        }

        // join the user intoMeeting
        if (this.state.isMeetingExisted && !this.state.isUserNameInMeeting) {
            const newMeeting = await putUser(this.state.meetingID, this.state.userName);
            meeting = newMeeting;
        }

        this.props.setAppState({
            currentUser: this.state.userName,
            currentMeeting: meeting
        })
        this.props.navigate(`/meeting?meetingID=${this.state.meetingID}`)
    }

    onResetButtonClickHandler = () => {
        this.setState(defaultState)
    }
}

function WithNavigate(props: any) {
    let navigate = useNavigate();
    return <Login {...props} navigate={navigate} />
}

export default WithNavigate;