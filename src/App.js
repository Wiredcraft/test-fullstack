import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getPageData } from './actions'
import Container from './Container'

class App extends Container {
  componentWillMount () {
    const page = this.props.match.params.page
    this.props.dispatch(getPageData('news', page))
  }

  componentWillReceiveProps (nextProps, nextState, context) {
    const newPage = nextProps.match.params.page
    const page = this.props.match.params.page
    if (newPage !== page) {
      this.props.dispatch(getPageData('news', newPage))
    }
  }

  render () {
    const { news } = this.props
    return (
      <div>
        { this.renderList(news) }
        { this.renderPage() }
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state);
  return state.comment
}

export default connect(mapStateToProps)(App);
