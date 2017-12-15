import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getPageData } from './actions';
import Container from './Container';

class Show extends Container {
  componentWillMount() {
    const page = this.props.match.params.page;
    this.props.dispatch(getPageData('show', page));
  }

  componentWillReceiveProps(nextProps) {
    const newPage = nextProps.match.params.page;
    const page = this.props.match.params.page;
    if (newPage !== page) {
      this.props.dispatch(getPageData('show', newPage));
    }
  }

  render() {
    const { show, match } = this.props;
    const page = Number(match.params.page);
    return <div>
      {this.renderList(show)}
      {this.renderPage('show')}
    </div>;
  }
}

const mapStateToProps = state => state.comment;

export default connect(mapStateToProps)(Show);
