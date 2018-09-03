import React, {Component} from 'react';
import axios from 'axios'
import {Redirect} from 'react-router-dom';

let newline2Br = new RegExp('\r?\n','g');
let urlRegexp = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i;
const urlChecker = url => urlRegexp.test(url);

class NewTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      url: "",
      text: "",
      serverMsg: "",
      redirectToNewRoute: false,
    };
  }

  componentWillUnmount = () => {
    clearTimeout(this.timeoutID)
  };

  showErrMsg = msg => {
    if (this.timeoutID){ // clear the previous timeoutID
      clearTimeout(this.timeoutID)
    }

    this.setState({serverMsg: msg});
    this.timeoutID = setTimeout(() => this.setState({serverMsg: ""}), 8000)
  };

  textChangeHandler = evt => {
    this.setState({
      [evt.target.id]: evt.target.value || ""
    })
  };

  onSubmit = () => {
    let isURL = false;
    let {title, url, text} = this.state;
    if (url !== "" && !urlChecker(url)){
      this.showErrMsg("invalid URL");
      return
    } else if (url !== ""){
      isURL = true;
    }

    axios.post('/topic', {title, url, text, isURL}, {
      headers: {'Authorization': "Bearer " + localStorage.getItem("token")}
    })
        .then(res => {
          res.data.text = res.data.text.replace(newline2Br, "<br />");
          res.data.publishDate = new Date(res.data.publishDate);
          this.props.createTopic(res.data);
          this.setState({redirectToNewRoute: true});
        })
        .catch(err => {
          console.log("err from newTopic: ", err.response);
          if (err.response.status === 401){
            this.props.updateProfile({username: ""});
            this.props.openAuthModal()
          } else {
            // todo: 只有我定义的err才有 data.mesg,
            this.showErrMsg(err.response.data.message)
          }
        })
  };

  render() {
    let submitEnabled = this.state.title !== "" && (this.state.url !== "" || this.state.text !== "");
    if (this.state.redirectToNewRoute){
      return <Redirect to="/newest"/>
    }
    return (
          <div className="content-wrapper">{/* todo: apply this wrapper on every route */}
            <form id="form-new-topic">
              <div className="server-msg" style={{visibility: this.state.serverMsg === "" ? "hidden" : "visible", justifyContent: "flex-start"}}>
                <label style={{width: "unset", paddingLeft: "0", backgroundColor: "unset"}}>{this.state.serverMsg}</label>
              </div>

              <div className="form-field">
                <label htmlFor="text">title</label>
                <input type="text" id="title" name="title" value={this.state.title}
                       onChange={this.textChangeHandler} />
              </div>

              <div className="form-field">
                <label htmlFor="url">url</label>
                <input type="text" id="url" name="url" value={this.state.url}
                       onChange={this.textChangeHandler} />
              </div>

              <label><span style={{margin: '0 0 6px 35px', display: "inline-block", fontWeight: "bold", fontSize:"16px"}}>or</span></label>

              <div className="form-field">
                <label htmlFor="text">text</label>
                <textarea id="text" name="text" value={this.state.text} rows={4}
                          onChange={this.textChangeHandler}/>
              </div>

              <button type="button" onClick={this.onSubmit} style={{marginLeft: '35px'}} className={submitEnabled ? "btn btn-primary" : "btn btn-primary disabled"} disabled={!submitEnabled}>submit</button>

              <div style={{margin: "10px 0 10px 35px", paddingBottom:"10px", lineHeight:'2em', fontSize: '14px', color: '#828282'}}>
                Leave url blank to submit a question for discussion. If there is no url, the text (if any) will appear at the top of the thread.<br/>
                You can also submit via bookmarklet.
              </div>
            </form>
          </div>

    )}
}

export default NewTopic;
