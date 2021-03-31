import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {INews} from'./HackerNews';

interface INewsInputProps {
  onSubmit: (news:INews) => void;
}

interface INewsInputState {
  user:string;
  topic:string;
}
class NewsInput extends React.Component<INewsInputProps,INewsInputState>{
    constructor (props) {
    super(props);
    this.state = {
      user: "",
      topic: "",
    }
  }
  render () {
    return (
      <div className='news-input'>
        <div className='news-field'>
          <span className='news-field-name'>User</span>
          <div className='news-field-input'>
             <input
                value={this.state.user}
                onChange={this.handleuserChange.bind(this)} />
          </div>
        </div>
        <div className='news-field'>
          <span className='news-field-name'>Topic</span>
          <div className='news-field-input'>
           <textarea
            value={this.state.topic}
            onChange={this.handleTopicChange.bind(this)} />
          </div>
        </div>
       <div className='news-field-button'>
        <button
          onClick={this.handleSubmit.bind(this)}>
          Submit
        </button>
      </div>
      </div>
    )
  }
  public handleuserChange (event) {
    this.setState({
      user: event.target.value
    })
  }

  public handleTopicChange (event) {
    this.setState({
      topic: event.target.value
    })
  }
  
  public handleSubmit () {
    if (this.props.onSubmit) {
      this.props.onSubmit({user:this.state.user, topic:this.state.topic,votes:0});
    }
    this.setState({ topic: "",user:"" })
  }
}

export default NewsInput