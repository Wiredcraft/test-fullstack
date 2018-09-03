import React, {Component} from 'react';
import axios from 'axios'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      serverMsg: "",
    };
  }


  // todo: make username selected after didMount
  componentDidMount = () => { };

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

  onKeyDown = evt => {
    if (this.state.username === "" || this.state.password === ""){
      return
    }

    if (evt.keyCode === 13){
      this.onSubmit();
    }
  };

  onSubmit = () => {
    let {username, password} = this.state;
    axios.post('/HN/login', {username, password})
        .then(res => {
          localStorage.setItem('token', res.data.token);
          this.props.updateProfile({username: res.data.username});
          this.props.closeModal();
        })
        .catch(err => {
          console.log("err: ", err);
          // todo: 只有我定义的err才有 data.mesg,
          this.showErrMsg(err.response.data.message)
        })
  };

  render() {
    let loginEnabled = this.state.username !== "" && this.state.password !== "";
    return (
          <form id="login-signup-form" className="popup">
            <a className="close" onClick={this.props.closeModal}>&times;</a>
            <fieldset>
              <div className="server-msg" style={{visibility: this.state.serverMsg === "" ? "hidden" : "visible"}}>
                <label>{this.state.serverMsg}</label>
              </div>

              <div className="form-field" >
                <input type="text" placeholder="username" id="username" name="username" value={this.state.username}
                       onKeyDown={this.onKeyDown} onChange={this.textChangeHandler} className="form-control username" />
              </div>

              <div className="form-field">
                <input type="password" placeholder="password" id="password" name="password" value={this.state.password}
                       onKeyDown={this.onKeyDown} onChange={this.textChangeHandler} className="form-control password"/>
              </div>

              <button type="button" onClick={this.onSubmit} className={loginEnabled ? "btn btn-primary" : "btn btn-primary disabled"} disabled={!loginEnabled}>登 录</button>

            </fieldset>
          </form>

    )}
}

export default Login;
