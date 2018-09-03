import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import timeAgo from '../utils/timeAgo';
import axios from "axios/index";

class Topic extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  voteTopic = () => {
    if (this.props.profile.username === ""){
      this.props.openAuthModal();
      return
    }

    let topicID = this.props.t.get("_id");
    axios.post('/HN/topic/vote', {topicID}, {
      headers: {'Authorization': "Bearer " + localStorage.getItem("token")}
    })
        .then(res => {
          this.props.voteTopic(topicID)
        })
        .catch(err => {
          console.log("err: ", err);
          if (err.response.status === 401) {
            this.props.updateProfile({username: ""});
            this.props.openAuthModal()
          }
        })
  };

  render() {
    let {t, profile, showText} = this.props;
    let url = "/HN/item/" + t.get("_id");
    let domain = "";
    if (t.get("isURL")){
      url = t.get("url");
      if (url.substr(0, 4) !== "http"){
        url = "http://" + url
      }
      domain = url.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];
    }

    let title = t.get("title");
    let points = t.get("voters").size;
    let publishBy = t.get("publishBy");
    let publishDate = t.get("publishDate");
    let commentNum = t.get("commentNum"); // take plural into account

    let pointPlural = points > 1 ? "s" : "";
    let publishByWhen = `${points} point${pointPlural} by ${publishBy} ${timeAgo(publishDate)} ago`;
    let discussLink ="/HN/item/" + t.get("_id");

    let voteIcon;
    let username = profile.username;
    if (username === publishBy){
      voteIcon = <span style={{color: "#ff6600", paddingRight: "6px", fontWeight: "bold"}}>*</span>;
    } else if (t.get("voters").includes(username)){
      voteIcon = <span style={{paddingRight: "14px"}}> </span>
    } else {
      voteIcon = <span onClick={this.voteTopic} className="vote-arrow">▲</span>
    }
    return (
        <div>
          <div className="topic-title">
            {voteIcon}
            {/* <a className="topic-link" href={url}>{title}</a> */}
            <Link to={url}>{title}</Link>
            {!domain ? null : <span className="topic-domain">({domain})</span>}
          </div>
          <ul className="subtext">
            <li>{publishByWhen}</li>
            <li>hide</li>
            <li>past</li>
            <li>web</li>
            <li className="topic-link"><Link to={discussLink}>{commentNum > 0 ? `${commentNum} comments` : "discuss"}</Link></li>
          </ul>
          {!showText ? null : <div className="topic-text">{t.get("text")}</div> }
        </div>
    )}
}

export default Topic;
