import React from 'react'
import { PollsWrapper } from '../../../scss/poll';
import Item from './item'

export class PollsList extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      data: [],
      page: 0,
      rowsPerPage: 5
    }
  }
  
  componentDidMount = () => this.handleSetData(this.props.polls);

  handleSetData = polls => {
    if (!!polls) {
      const data = polls
      this.setState({
        data
      });
    }
  };

  render() {
    const { data, order, orderBy, rowsPerPage, page } = this.state;

    return (
      <PollsWrapper>
        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => {
          <Item
            item = {item}
            updatePollVote = {this.props.updatePollVote}
          />
        })}
      </PollsWrapper>
    )
  }
}

export default PollsList