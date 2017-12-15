import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getPageData } from './actions';
import Container from './Container';

class Jobs extends Container {
  componentWillMount() {
    const page = this.props.match.params.page;
    this.props.dispatch(getPageData('jobs', page));
  }

  componentWillReceiveProps(nextProps) {
    const newPage = nextProps.match.params.page;
    const page = this.props.match.params.page;
    if (newPage !== page) {
      this.props.dispatch(getPageData('jobs', newPage));
    }
  }

  render() {
    const { jobs } = this.props;
    return <div>
      {this.renderList(jobs)}
      {this.renderPage('jobs')}
    </div>;
  }
}

const mapStateToProps = state => state.comment;

export default connect(mapStateToProps)(Jobs);
