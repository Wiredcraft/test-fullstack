import React, {Component} from 'react';
import timeAgo from '../utils/timeAgo';
import axios from "axios/index";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.replyBoxRef = React.createRef();
    this.state = {
      showReplyBox: false,
    };
  }

  toggleReplyBox = () => this.setState({showReplyBox: !this.state.showReplyBox});

  // todo: increment commentCount in Main view
  addReply = evt => { // counts of sub-sub reply are not added into ancestor. 因为统计用的是 voters.size, 这个size只记录next direct level
    if (this.replyBoxRef.current.value === ""){
      return
    }

    let ancestorId = this.props.ancestorId;
    let parentId = this.props.c.get("_id");
    axios.post('/topic/comment', {ancestorId, parentId, text: this.replyBoxRef.current.value}, {
      headers: {'Authorization': "Bearer " + localStorage.getItem("token")}
    })
        .then(res => {
          this.replyBoxRef.current.value = "";
          //res.data.text = res.data.text.replace(newline2Br, "<br />");
          res.data.publishDate = new Date(res.data.publishDate);
          this.props.addReply(res.data);
          this.toggleReplyBox()
        })
        .catch(err => {
          console.log("err in addComment: ", err);
          if (err.response.status === 401){
            this.props.updateProfile({username: ""});
            this.props.openAuthModal()
          } else {
            // console.log("err adding comment: ", err)
          }
        });
  };

  voteTopic = () => {
    if (this.props.profile.username === ""){
      this.props.openAuthModal();
      return
    }

    let topicID = this.props.c.get("_id");
    axios.post('/topic/vote', {topicID}, {
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
    let c = this.props.c;
    let id = c.get("_id");
    let indentWidth = (c.indentLevel - 1) * 20 + "px";
    let voteIcon;
    let username = this.props.profile.username;
    if (username === c.get("publishBy")){
      voteIcon = <span style={{color: "#ff6600", paddingRight: "6px", fontWeight: "bold"}}>*</span>;
    } else if (c.get("voters").includes(username)){
      voteIcon = <span style={{paddingRight: "14px"}}> </span>
    } else {
      voteIcon = <span onClick={this.voteTopic} className="vote-arrow">▲</span>
    }

    let hideChildren = this.props.commentHideList.has(id);
    let childrenNum = hideChildren ? this.props.commentHideList.get(id) : "-";
    return (
        <div style={{marginLeft: indentWidth}}>
          <div style={{fontSize: "11px", marginBottom: hideChildren ? "12px" : "0"}}>
            {voteIcon}<span>{c.get("publishBy")} </span>
            <span>{timeAgo(c.get("publishDate"))}</span>
            <span id={id} className="show-hide-comment" onClick={this.props.showHideComment}>[{childrenNum}]</span>
          </div>

          {hideChildren ? null :
              <div>
                <div className="comment-text">{c.get("text")}</div>
                <div onClick={this.toggleReplyBox} className="add-reply">reply</div>
                {
                  !this.state.showReplyBox ? null :
                      <div>
                        <textarea ref={this.replyBoxRef} rows="3" cols="40" style={{margin: "12px", width: "500px"}}/>
                        <div>
                          <button onClick={this.addReply} type="button" style={{marginLeft: "12px", marginBottom: "50px"}}>add reply</button>
                          <button onClick={this.toggleReplyBox} type="button" style={{marginLeft: "12px", marginBottom: "50px"}}>cancel</button>
                        </div>
                      </div>
                }
              </div>
          }

        </div>
    )}
}

export default Comment;
