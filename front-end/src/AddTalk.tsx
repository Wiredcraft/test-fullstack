import React from "react";
import { postTalk } from "./apiRequest";

interface IAddTalkProps {
    user: string,
    meetingID: string
}

interface IAddTalkState {
    editing: boolean,
    title: string,
    description: string,
    isSubmitDisabled: boolean
}

const defaultState = {
    editing: false,
    title: '',
    description: '',
    isSubmitDisabled: true
}

class AddTalk extends React.Component<IAddTalkProps, IAddTalkState> {

    state = defaultState;

    constructor(props: any) {
		super(props)
    }

    onTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            title: e.target.value,
            isSubmitDisabled: (e.target.value as string).length === 0
        })
    }

    onDescriptionChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            description: e.target.value
        })
    }

    onSubmitHandler = async () => {
        const obj = {
            user: this.props.user,
            title: this.state.title,
            description: this.state.description
        }
        this.setState(defaultState);
        const res = await postTalk(this.props.meetingID, obj);
    }

    render(): React.ReactNode {
        const addTalkButton = <button onClick={() => this.setState({editing: true})}>add talk</button>
        const editingTemplate = <div className="new-talk-container">
            <input type="text"
                name="new-talk-title" id="new-talk-title"
                placeholder="New Talk Title"
                value={this.state.title}
                onChange={this.onTitleChangeHandler}
            />
            <textarea name="new-talk-description" id="new-talk-description" rows={5}
                placeholder="New Talk Description"
                value={this.state.description}
                onChange={this.onDescriptionChangeHandler}
            ></textarea>
            <div>
                <button onClick={() => {this.setState({editing: false})}}>back</button>
                <button id="new-talk-submit-button"
                    disabled={this.state.isSubmitDisabled}
                    onClick={this.onSubmitHandler}
                >
                    Submit
                </button>
            </div>
        </div>

        return (
            <div>
                {(this.state.editing)? editingTemplate : addTalkButton}
            </div>
        );
    }
}

export default AddTalk;