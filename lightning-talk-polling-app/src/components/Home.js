import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import Amplify, {Auth, API} from 'aws-amplify';
import config from '../aws-exports';
import Iframe from 'react-iframe';
import Moment from 'react-moment';
import 'moment-timezone';

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
            // A fix for 'X-Frame-Options' to 'SAMEORIGIN' error
            // so the video can show
            let url = item.url.replace("watch?v=", "embed/");
            return (
                <div
                    key={item.publishDate}
                    className="card col-sm-4 p-0">
                    <div className="view overlay">
                        <div className="embed-responsive embed-responsive-16by9">
                            <iframe className="embed-responsive-item" src={url}  allowFullScreen/>
                        </div>
                    </div>
                    <div className="card-body text-left">
                        <h4 className="card-title">{item.title}</h4>
                        <hr/>
                            <p className="card-text">{item.description}</p>

                    </div>
                    <div className="rounded-bottom mdb-color lighten-3 py-3 d-flex justify-content-between">
                        <i className="fa fa-clock-o pl-1"> <Moment format="LL" unix>{item.publishDate}</Moment></i>
                        <i className="fa fa-plus white-text"> {item.points}</i>
                        <i className="fa fa-user pr-1"> {item.username}</i>
                    </div>

                </div>
            )
        });

        return (
          <div  className="container mt-5">
              <div className="row d-flex justify-content-between">
                  {talks}
              </div>
              {/*<Link*/}
                  {/*to={'/submit-lightning-talk'}*/}
                  {/*label={'submit-lightning-talk'}*/}
              {/*>*/}
                  {/*Submit a lightning talk*/}
              {/*</Link>*/}
          </div>
        )

    }
}

export default withRouter(Home);