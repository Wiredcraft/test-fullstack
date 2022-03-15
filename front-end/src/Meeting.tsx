import React from "react";
import { useNavigate } from "react-router-dom";
import AddTalk from "./AddTalk";
import { getMeetingByID } from "./apiRequest";
import Talk from "./Talk";
import { IMeeting, ITalk } from "./type";

import userIcon from "../asset/user2.png";

interface IMeetingProps {
    user: string,
    meeting: IMeeting
}

interface IMeetingState {
    currentMeeting: IMeeting,
}

class Meeting extends React.Component<IMeetingProps, IMeetingState> {

    pollingIntervalRef: any;

    constructor(props: IMeetingProps) {
		super(props);

        this.state = {
            currentMeeting: props.meeting,
        }
	}

	componentDidMount = () => {
		this.pollingIntervalRef = setInterval(async () => {
            const meetingID = this.state.currentMeeting.meetingID;
            const meeting = await getMeetingByID(meetingID) as IMeeting;
            this.setState({
                currentMeeting: meeting
            });
		}, 1000)
	}

	componentWillUnmount = () => {
		clearInterval(this.pollingIntervalRef);
	}

    renderTalks = () => {
        const talks: React.ReactNode = this.state.currentMeeting.talks.map((talk: ITalk, idx: number) => {
            return <Talk user={this.props.user} meetingID={this.props.meeting.meetingID} key={idx} index={idx} {...talk} />
        });

        const noTalksTemplate = <p>No Talks yet, click add button to add it!</p>;
        return (this.state.currentMeeting.talks.length > 0)? talks: noTalksTemplate;
    }

    renderUsers = () => {
        const users: React.ReactNode = this.state.currentMeeting.allUsers.map((user: string, idx: number) => {
            return <div className="user-container" key={idx}>
                <img className="input-icon" src={userIcon} />
                {user}
            </div>
        });
        return users;
    }
    
    render(): React.ReactNode {
        return <>
            <div className="talks-list">
                {this.renderTalks()}

                <AddTalk user={this.props.user} meetingID={this.state.currentMeeting.meetingID} />
            </div>

            <div className="users-list">
                {this.renderUsers()}
            </div>
        </>;
    }
}

function WithNavigate(props: any) {
    let navigate = useNavigate();
    return <Meeting {...props} navigate={navigate} />
}

export default WithNavigate;