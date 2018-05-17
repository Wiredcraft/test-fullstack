import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {Auth} from 'aws-amplify';

class Home extends Component {
    state = {
        username: '',
        user: {},
    }

    componentDidMount() {
        Auth.currentAuthenticatedUser().then(user => this.setState({user}));
        Auth.currentUserInfo()
            .then(user => {
                this.setState({username: user.username});
            })
            .catch(error => console.log('Error retrieving user\' info: ', error));
    }

    render() {
        return (
          <div>
              <h3>Home page</h3>
              <h5>Welcome {this.state.username}</h5>
              <Link
                  to={'/lightning-talks'}
                  label={'lightning-talks'}
              >
                  List of lightning talks
              </Link>
          </div>
        );
    }
}

class LightningTalks extends Component {
    render() {
        return (
            <div>
                <h1>List of lightning talks</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        Auth.signOut()
                            .then(() => {this.props.history.push('/authenticate')})
                            .catch(error => console.log('Error signing out: ', error));
                    }}
                >
                    Sign out
                </button>
            </div>
        );
    }
}

Home = withRouter(Home);
LightningTalks = withRouter(LightningTalks);

export {
    Home,
    LightningTalks
}