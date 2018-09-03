import React, {Component} from 'react';
import Topic from '../Topic';
import Comment from '../Comment';
import axios from "axios/index";
import {fromJS} from "immutable";

let newline2Br = new RegExp('\r?\n','g');

let result = fromJS([]);
function reOrder(rootID, tree, indentLevel){
  let children = tree.filter(n => n.get("parentId") === rootID);
  if (children.size === 0) {
    return
  }

  children = children.sort((a, b) => {
    let aVal = a.get("voters").size;
    let bVal = b.get("voters").size;
    if (aVal < bVal) { return 1}
    if (aVal === bVal) {return 0}
    if (aVal > bVal) {return -1}
  });

  indentLevel++;
  children.forEach(c => {
    c.indentLevel = indentLevel;
    result = result.push(c);
    reOrder(c.get("_id"), tree, indentLevel)
  })
}

function getChildrenNum(nodeID, tree, result){
  let children = tree.filter(n => n.get("parentId") === nodeID);
  if (children.size === 0){
    return
  }

  children.forEach(c => {
    result.c++;
    getChildrenNum(c.get("_id"), tree, result)
  })
}

function isAncestorInHideList(nodeID, tree, hideList){
  let node = tree.find(n => n.get("_id") === nodeID);
  let parentID;
  for (;;){
    if (!node){
      return false
    }

    parentID = node.get("parentId");
    if (hideList.has(parentID)){
      return true
    }

    node = tree.find(n => n.get("_id") === parentID);
  }
}

class TopicDetail extends Component {
  constructor(props) {
    super(props);
    this.commentBoxRef = React.createRef();
    this.state = {
      topic: fromJS({}),
      comments: fromJS([]),
      commentHideList: fromJS({}), // key is commentID, value is the number of descendants(including itself)
    };
    this.topicID = props.match.params.id;
  }

  componentDidMount = () => {
    axios.get('/topic/' + this.topicID)
        .then(res => {
          let topicIdx = res.data.findIndex(t => t._id === this.topicID);
          if (topicIdx === -1){
            return
          }

          let topic = res.data.splice(topicIdx, 1)[0];

          reOrder(this.topicID, fromJS(res.data), 0);
          this.setState({
            topic: fromJS(topic),
            comments: result
          });
          result = fromJS([])
        })
        .catch(err => console.log("err getting topic: ", err));
  };

  voteTopic = topicID => {
    if (topicID === this.topicID){
      let voters = this.state.topic.get("voters");
      this.setState({
        topic: this.state.topic.set("voters", voters.push(this.props.profile.username))
      });
      return
    }

    let topicIdx = this.state.comments.findIndex(c => c.get("_id") === topicID);
    if (topicID !== -1){
      let voters = this.state.comments.getIn([topicIdx, "voters"]);
      let comments = this.state.comments.setIn([topicIdx, "voters"], voters.push(this.props.profile.username));
      reOrder(this.topicID, comments, 0);
      this.setState({comments: result});
      result = fromJS([]);
    }
  };

  showHideComment = evt => {
    let commentId = evt.target.id;
    if (this.state.commentHideList.has(commentId)){
      this.setState({
        commentHideList: this.state.commentHideList.delete(commentId)
      });
      return
    }

    let result = {c: 1};
    getChildrenNum(commentId, this.state.comments, result);
    this.setState({
      commentHideList: this.state.commentHideList.set(commentId, result.c)
    })
  };

  addComment = evt => {
    if (this.commentBoxRef.current.value === ""){
      return
    }

    let ancestorId = this.topicID;
    let parentId = this.topicID;
    axios.post('/topic/comment', {ancestorId, parentId, text: this.commentBoxRef.current.value}, {
      headers: {'Authorization': "Bearer " + localStorage.getItem("token")}
    })
        // .then(res => this.props.addComment(res.data)) // no need to call addComment, all data are in current state. Or just let addComment add comment counts which is used in index component
        .then(res => {
          this.commentBoxRef.current.value = "";
          res.data.text = res.data.text.replace(newline2Br, "<br />");
          res.data.publishDate = new Date(res.data.publishDate);
          this.setState({comments: this.state.comments.push(fromJS(res.data))})
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

  addReply = reply => {
    let comments = this.state.comments.push(fromJS(reply));
    reOrder(this.topicID, comments, 0);
    this.setState({comments: result});
    result = fromJS([]);
  };

  render() {
    if (!this.state.topic.get("_id")){
      return <div />
    }

    return (
        <div className="content-wrapper" style={{paddingLeft: "12px"}}>
          <Topic t={this.state.topic} profile={this.props.profile} updateProfile={this.props.updateProfile} voteTopic={this.voteTopic} openAuthModal={this.props.openAuthModal} showText={true}/>
          <textarea ref={this.commentBoxRef} rows="6" cols="60" style={{margin: "12px", width: "500px"}}/>
          <div style={{margin: "12px", fontSize:'12px', color: "#828282"}}>If you haven't already, would you mind reading about HN's approach to comments and site guidelines?</div>
          <button onClick={this.addComment} type="button" style={{marginLeft: "12px", marginBottom: "50px"}}>add comment</button>
          {
              this.state.comments.map(c => {
                let id = c.get("_id");
                let hide = isAncestorInHideList(id, this.state.comments, this.state.commentHideList);

                return hide ? null : <Comment key={id} c={c} ancestorId={this.topicID} showHideComment={this.showHideComment} commentHideList={this.state.commentHideList} addReply={this.addReply} profile={this.props.profile} updateProfile={this.props.updateProfile} voteTopic={this.voteTopic} openAuthModal={this.props.openAuthModal}/>
              })
          }


        </div>
        )
    }
}

export default TopicDetail;
