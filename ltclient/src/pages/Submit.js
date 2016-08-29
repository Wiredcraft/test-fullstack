import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Loading from '../components/Loading';
import Icon from '../components/Icon';
import { submit } from '../actions';

class Submit extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    const title = this.title.value.trim();
    const speaker = this.speaker.value.trim();
    const cover = this.cover.value.trim();
    const description = this.description.value.trim();
    this.props.dispatch(submit({
      title,
      speaker,
      cover,
      description,
    }));
  }

  render = () => {
    const { isFetching, userId } = this.props;
    if (isFetching) {
      return <Loading />;
    }
    if (!userId) {
      return (
        <div className="main">
          <div className="submit prompt">
            <p>Sorry</p>
            <p>you need to login first to submit a talk</p>
            <Icon name="lt" />
          </div>
        </div>
      );
    }
    return (
      <div className="main">
        <div className="form form--submit">
          <div className="form__header">
            <h3>Submit a talk</h3>
          </div>

          <form role="form" onSubmit={this.handleSubmit}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              ref={c => { this.title = c; }}
              placeholder="The title of the talk"
            />
            <label htmlFor="speaker">Speaker</label>
            <input
              type="text"
              ref={c => { this.speaker = c; }}
              placeholder="The speaker of the talk"
            />
            <label htmlFor="cover">Cover Picture</label>
            <input
              type="text"
              ref={c => { this.cover = c; }}
              placeholder="The URL of the cover picture"
            />
            <label htmlFor="description">Description</label>
            <textarea
              name="textarea"
              rows="15"
              ref={c => { this.description = c; }}
              placeholder="Write your informative description here"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

Submit.propTypes = {
  dispatch: PropTypes.func,
  isFetching: PropTypes.bool,
  userId: PropTypes.number,
};


function mapStateToProps(state) {
  return {
    userId: state.user.userId,
    isFetching: state.talks.isFetching,
  };
}

export default connect(mapStateToProps)(Submit);
