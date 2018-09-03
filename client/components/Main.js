import React, {Component} from 'react';
import Topic from './Topic';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // not used anymore, data is sorted(by points) at server
  compare = orderBy => (a, b) => {
    let aValue, bValue;
    if (orderBy === "publishDate") {
      aValue = a.get("publishDate");
      bValue = b.get("publishDate")
    } else if (orderBy === "points") {
      aValue = a.get("voters").size;
      bValue = b.get("voters").size;
    }
    if( aValue > bValue) {return -1}
    if( aValue < bValue) {return 1}
    if( aValue === bValue) {return 0}
  };

  render() {
    // not necessarily, topic list is already sorted at server
    let topics = this.props.topics.sort(this.compare(this.props.orderBy));
    // low efficient. topics are better to be sorted in parent component.
    // this solution would cause 2 sets of topics, one in parent, one in child.
    return (
        <div className="content-wrapper">
          {topics.map((t, idx) => {
            if (!t.get("rootTopic")) {return}

            return <div key={t.get("_id")} style={{display: "flex"}}>
                  <span className="rank">{idx + 1}.</span>
                  <Topic t={t} profile={this.props.profile} updateProfile={this.props.updateProfile}
                         voteTopic={this.props.voteTopic} openAuthModal={this.props.openAuthModal}/>
                </div>
              }
          )}
        </div>
    )}
}

export default Main;
