import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getPageData } from './actions'
import Container from './Container'
import Item from './components/Item'

class Ask extends Container {
 	componentWillMount() {
    const page = this.props.match.params.page;
    this.props.dispatch(getPageData('ask', page));
  }

  componentWillReceiveProps(nextProps) {
    const newPage = nextProps.match.params.page;
    const page = this.props.match.params.page;
    if (newPage !== page) {
      this.props.dispatch(getPageData('ask', newPage));
    }
  }

  render() {
    const { ask } = this.props;
    return <div>
      {this.renderList(ask)}
      {this.renderPage('ask')}
    </div>;
  }
}

const mapStateToProps = state => state.comment;

export default connect(mapStateToProps)(Ask);