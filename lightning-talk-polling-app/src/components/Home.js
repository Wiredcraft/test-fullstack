import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import Amplify, {Auth, API} from 'aws-amplify';
import config from '../aws-exports';

Amplify.configure(config);

class Home extends Component {
    state = {
        username: '',
        user: {},
        data: []
    }

    componentDidMount() {
        // Get use's info
        Auth.currentAuthenticatedUser().then(user => this.setState({user}));
        Auth.currentUserInfo()
            .then(user => {
                this.setState({username: user.username});
            })
            .catch(error => console.log('Error retrieving user\' info: ', error));
        this.fetch();
    }

    fetch = async () => {
        this.setState(() => {
            return {
                loading: true
            }
        });

        API.get('lightning-talk-pollingCRUD', '/lightning-talk-polling/all')
            .then(resp => {
                this.setState({
                    data: resp
                });
                console.log("response is : ", resp);
            })
            .catch (err => console.log(err));
    }

    render() {
        let talks = this.state.data.map((item) => {
            return <li key={item.publishDate}>{item.username}</li>
        });

        return (
          <div  className="container">
              <h3>Home page</h3>
              <h5>Welcome {this.state.username}</h5>
              <h5>List of lightning talks</h5>
              <Link
                  to={'/submit-lightning-talk'}
                  label={'submit-lightning-talk'}
              >
                  Submit a lightning talk
              </Link>
              <button
                  onClick={this.fetch}
              >
                  get talks
              </button>
              <div>
                <ul>
                    {talks}
                </ul>
              </div>
          </div>
        );
    }
}

export default withRouter(Home);