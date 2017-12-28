import React, {Component} from 'react';
import { Button, Modal } from 'semantic-ui-react';
import TalkForm from './TalkForm';

class PrimaryMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false
        }
    }

    callbackResponse(response){
        this.props.callback(response);
        this.setState({openModal: false});
    }

    clickOpenModal(e){
        this.setState({openModal: true});
    }

    render(){
        return (
            <div>
                <Button basic color="green" icon="plus" content="Add" onClick={this.clickOpenModal.bind(this)}/>
                <Modal open={this.state.openModal}>
                    <Modal.Header>Submit a new lighting talk</Modal.Header>
                    <Modal.Content>
                        <TalkForm action='/api/talks' callback={(response) => this.callbackResponse(response)} />
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}

export default PrimaryMenu;