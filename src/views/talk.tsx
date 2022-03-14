import React, { Component } from 'react'
import { TalkServiceImpl } from '../backend/talkManagement';
import { useNavigate } from 'react-router-dom';
 
class Talk extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      title: '',
      description: ''
    }
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onClickSubmit() {
    const talkService = TalkServiceImpl.createService();
    let data = {
      title: this.state.title,
      description: this.state.description,
      time: new Date().toLocaleString(),
      user: 'testuser',
      rate: 0
    }
    talkService.insert(data).then(() => {
      this.props.navigate('/');
    })
  }
  render () {
    return (
      <div className="talk">
        <div className="title">
          Create a topic
        </div>
        <input type="text" placeholder="title" name="title" onChange={this.onChange.bind(this)} required={true} />
        <textarea placeholder="description" name="description" onChange={this.onChange.bind(this)} required={true} />
        <button type="button" className="primary" onClick={this.onClickSubmit.bind(this)} >Submit</button>
      </div>
    )
  }
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <Talk {...props} navigate={navigate} />
}

export default WithNavigate;