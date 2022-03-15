import React from "react";
import { putPoll } from "./apiRequest";
import { IMeeting, ITalk } from "./type";

interface ITalkProps extends ITalk {
    index: number,
    user: string,
    meetingID: string
}

class Talk extends React.Component<ITalkProps, any> {

    constructor(props: any) {
		super(props);
    }

    renderPolledUsers = () => {
        return this.props.polledUser.map((u: string, idx: number) => {
            return <li className="polled-user" key={idx}>{u}</li>
        })
    }

    onPollButtonClickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const talkID = this.props.talkID;
        const res = await putPoll(this.props.meetingID, this.props.user, talkID);
        console.log(res)
    }

    transferTalkIDtoDate = (talkID: string) => {
        const timeStamp = parseInt(talkID);
        return (new Date(timeStamp)).toLocaleString()
    }

    transferIndex = (idx: number) => {
        const newIdx = idx + 1;
        if (newIdx < 10) {
            return `0${newIdx}`
        }
        return newIdx.toString();
    }

    render(): React.ReactNode {
        return (
            <div className="talk-container">
                <div className="talk-header">
                    <div className="index-container">
                        {this.transferIndex(this.props.index)}
                    </div>
                    <div>
                        <h3>{this.transferTalkIDtoDate(this.props.talkID)}</h3>
                        <h2>{this.props.title}</h2>
                    </div>
                    <ul className="polled-users-list">{this.renderPolledUsers()}</ul>
                </div>
                <p>{this.props.description}</p>
                <div className="talk-action">
                    <button onClick={this.onPollButtonClickHandler} 
                        disabled={this.props.polledUser?.includes(this.props.user)}>
                        Poll
                    </button>
                </div>
            </div>
        );
    }
}

export default Talk;