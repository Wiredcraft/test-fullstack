import React, {Component} from 'react';
import Talk from './Talk';
import PrimaryMenu from "./PrimaryMenu";
import axios from 'axios';
class Talks extends Component {
    constructor() {
        super();
        this.state = {
            talks: [],
            msgType: '',
            msgHeader: '',
            msgContent: '',
            msgShow: false
        }
    }

    getTalks() {
        this.setState({talks: []});
        axios.get('/api/talks?filter[order]=voteAverage%20DESC')
        .then(response => {
            this.setState({talks: response.data})
        })
        .catch(err => console.log(err));
    }

    componentWillMount() {
        this.getTalks();
    }

    showMessage(messageItem){
        this.setState({msgType: messageItem.type, msgHeader: messageItem.header, msgContent: messageItem.content, msgShow: true})
        this.getTalks();
    }

    render() {
        const talkItems = this.state.talks.map((talk,i) => {
            return(
                <div key={talk.id}><Talk key={talk.id} item={talk} callback={(messageItem) => this.showMessage(messageItem)}/><br/></div>
            )
        })
        return (
            <div className="ui raised container segment">
                <h1 className="ui header">Lighting Talks</h1>
                <div className={"ui " + (this.state.msgShow ? 'visible ' : 'hidden ') + this.state.msgType + " message"}>
                    <div className="header">
                        {this.state.msgHeader}
                    </div>
                    <p>{this.state.msgContent}</p>
                </div>
                <PrimaryMenu callback={(messageItem) => this.showMessage(messageItem)} />
                <br />
                {talkItems}
            </div>
        )
    }
}

export default Talks;