import React, {Component} from 'react';
import {NavLink, Route, BrowserRouter as Router} from 'react-router-dom';
import {fromJS} from 'immutable';
import AuthModal from './AuthModal';

import Comments from './routes/Comments';
import Show from './routes/Show';
import Ask from './routes/Ask';
import Jobs from './routes/Jobs';
import NewTopic from './routes/NewTopic';
import TopicDetail from './routes/TopicDetail';

import Main from './Main';
import axios from "axios/index";

import '../../public/stylesheets/style.css'

let newline2Br = new RegExp('\r?\n','g');

class App extends Component {
  constructor(props) {
    super(props);
    console.log(  );
    this.state = {
      profile: {username: ""},
      authModalOpen: false,
      topics: fromJS([]),
    };
  }

  toggleModal = () => { // todo: rename to toggleAuthModal
    this.setState({authModalOpen: !this.state.authModalOpen})
  };

  updateProfile = profile => this.setState({profile});
  logout = () => {
    localStorage.removeItem("token");
    this.updateProfile({username: ""})
  };

  createTopic = newTopic => this.setState({
    topics: this.state.topics.push(fromJS(newTopic))
  });

  voteTopic = topicID => {
    let idx = this.state.topics.findIndex(t => t.get("_id") === topicID);
    if (idx !== -1){
      let voters = this.state.topics.getIn([idx, "voters"]);
      this.setState({
        topics: this.state.topics.setIn([idx, "voters"], voters.push(this.state.profile.username))
      })
    }
  };

  // todo: commentNum of parent topic need to be incremented
  // not used anymore.
  addComment = comment => this.setState({topics: this.state.topics.push(fromJS(comment))})  ;

  componentDidMount = () => {
    let token = localStorage.getItem("token");
    if (!token) {
      return
    }
    axios.get('/topic')
        .then(res => {
          console.log("topic list in App.js: ", res);
          res.data.forEach(t => {
            t.text = t.text.replace(newline2Br, "<br />");
            t.publishDate = new Date(t.publishDate);
          });
          this.setState({topics: fromJS(res.data)});
        })
        .catch(err => console.log("err getting topic: ", err));

    axios.post('/checkAuth', null, {
      headers: {'Authorization': "Bearer " + localStorage.getItem("token")}
    })
        .then(res => this.updateProfile({username: res.data.username}))
        .catch(err => console.log("invalid token: ", err))
  };

  render() {
    let modal = this.state.authModalOpen ? <AuthModal closeModal={this.toggleModal} updateProfile={this.updateProfile}/> : null;
    return (
        <Router>
          <div>

            <ul className="nav">
              <li><img src="/public/images/y18.gif" style={{display: "inline-block", border: '1px solid #FFF', position: "relative", top: '1px'}}/></li>

              <li style={{fontWeight: "bold"}}>
                <NavLink to='/' exact>Hacker News</NavLink>
              </li>
              <li><NavLink to='/newest' activeClassName="active-route">new</NavLink></li>
              <li><NavLink to='/comments' activeClassName="active-route">comments</NavLink></li>
              <li><NavLink to='/show' activeClassName="active-route">show</NavLink></li>
              <li><NavLink to='/ask' activeClassName="active-route">ask</NavLink></li>
              <li><NavLink to='/jobs' activeClassName="active-route">jobs</NavLink></li>
              <li><NavLink to='/submit' activeClassName="active-route">submit</NavLink></li>
              {<AuthAction profile={this.state.profile} openAuthModal={this.toggleModal} logout={this.logout} />}
            </ul>

            <div id="overlay" className={modal === null ? "" : "show"}>
              {modal}
            </div>

            {/* todo: wrap openAuthModal, updateProfile, profile into a single obj */}
            <Route path="/" exact={true} render={props => <Main {...props} orderBy="points" topics={this.state.topics} voteTopic={this.voteTopic} openAuthModal={this.toggleModal} updateProfile={this.updateProfile} profile={this.state.profile}/>}/>
            <Route path="/newest" render={props => <Main {...props} orderBy="publishDate" topics={this.state.topics} voteTopic={this.voteTopic} openAuthModal={this.toggleModal} updateProfile={this.updateProfile} profile={this.state.profile}/>}/>
            <Route path="/item/:id" render={ props => <TopicDetail {...props} addComment={this.addComment} updateProfile={this.updateProfile} profile={this.state.profile} voteTopic={this.voteTopic} openAuthModal={this.toggleModal} />} />
            <Route path="/comments" component={Comments} />
            <Route path="/show" component={Show} />
            <Route path="/ask" component={Ask} />
            <Route path="/jobs" component={Jobs} />
            <Route path="/submit" render={props => <NewTopic {...props} createTopic={this.createTopic} openAuthModal={this.toggleModal} updateProfile={this.updateProfile} profile={this.state.profile}/>}/>
          </div>
        </Router>
    )
  }
}

export default App;

const AuthAction = props => {
  let li1, li2;
  if (props.profile.username){
    li1 = <li>{props.profile.username}</li>;
    li2 = <li onClick={props.logout}>logout</li>
  } else {
    li1 = <li onClick={props.openAuthModal}>login</li>
  }
  return (
      <li className="auth-action">
        <ul>
          {li1}{li2}
        </ul>
      </li>
  )
};
