import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {INews} from'./HackerNews';
interface INewsListProps {
  news:INews[];
  onVote: (news:INews) => void;
}
interface INewsListState {
  news:INews[];
}

class NewsList extends React.Component<INewsListProps,INewsListState>{
  constructor(props) {
    super(props);
    this.state = {
      news:this.props.news,
    }
  }
  static getDerivedStateFromProps(props, state) {
    if ( state.news !== props.news) {
      return { news : props.news }
    }
  }
  render() {
    return (
      <div>
        {this.state.news.map((news, i) =>
        <div className='news'>
          <div className='news-user'>
            <span>{news.user} </span>：
          </div>
          <p>{news.topic}</p>
          <div className='news-like-button'>
          <button
            onClick={this.handleVotes.bind(this,i)}>
            Like {news.votes}
          </button>
      </div>
        </div>
        )}
      </div>
    )
  }
 
  public handleVotes (index) {
    if (this.props.onVote) {
      this.props.onVote(index);
    }
  }
}

export default NewsList