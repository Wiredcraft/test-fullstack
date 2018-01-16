import React, { Component } from 'react'
import Form from './Form'
import { addTalk } from '../actions/actionCreators'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    talksToUpdate: state && state.talks
})

const mapDispatchToProps = (dispatch) => ({
    addTalk: (allTalks, talk) => dispatch(addTalk(allTalks, talk))
})

class FormContainer extends Component {
  state = {
    title: '',
    desc: '',
    user: ''
  }

  handleAddTalk = () => {
    console.log(this.props.talksToUpdate)
    this.props.addTalk(this.props.talksToUpdate, this.state)
  }

  handleInputChange = (field, e) => {
    this.setState({[field]: e.target.value})
  }
    
  render() {
    return (
      <Form
        onChange={this.handleInputChange}
        onSubmit={this.handleAddTalk}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
