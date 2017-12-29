import React, {Component} from 'react';
import { Card, Rating, Confirm } from 'semantic-ui-react';
import axios from 'axios';

class Talk extends Component {
    constructor(props){
        super(props);
        this.state = {
            item: props.item,
            showRateConfirmation: false,
            submitRating: 0
        }
    }
    
    showConfirmRate = (e, {rating, maxRating}) => {
        this.setState({ showRateConfirmation: true, submitRating: rating });
    }

    handleRateCancel = () => this.setState({showRateConfirmation: false})

    handleRateConfirm = () => {
        axios.request({
            method: 'post',
            url: '/api/talks/vote',
            data: {id: this.state.item.id, vote: this.state.submitRating}
        })
        .then(response =>{
            this.setState({showRateConfirmation: false});
            this.props.callback(
                {type: 'success',
                header: 'You have voted ' + this.state.submitRating + ' for ' + this.state.item.title
                });
        })
        .catch(err => {
            this.props.callback(
                {type: 'negative',
                header: 'Vote unsuccessful',
                content: err
                });
        });        
    }

    render(){
        return (
            <div>
                <Card raised fluid link>
                <Card.Content>
                    <Card.Header>
                        {this.state.item.title}
                    </Card.Header>
                    <Card.Description>
                        {this.state.item.description}
                    </Card.Description>
                </Card.Content>
                    <Card.Content extra>
                    <div className="left floated">
                        <Rating icon='star' defaultRating={this.state.item.voteAverage.toFixed(1)} maxRating={5} onRate={this.showConfirmRate} />
                        ({this.state.item.voteAverage.toFixed(1)})
                    </div>
                    <div className="right floated">
                        {this.state.item.username}
                    </div>
                    </Card.Content>
                </Card>
                <Confirm
                    open={this.state.showRateConfirmation}
                    onCancel={this.handleRateCancel}
                    onConfirm={this.handleRateConfirm}
                    cancelButton="No"
                    confirmButton="Yes"
                    header="Review"
                    content={"Submit review with score " + this.state.submitRating + " for " + this.state.item.title + "?"}
                />
            </div>
        )
    }
}

export default Talk;