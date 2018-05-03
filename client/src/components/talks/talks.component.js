import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTalks } from '../../actions/talks.actions';
import { logout } from '../../actions/auth.actions';
import TalkRow from './talk-row/talk-row.component';
import './talks.css';
import Icon from '../../assets/icon.png';

class Talks extends Component {
    componentDidMount() {
        this.props.fetchTalks();
    }

    handleLogout() {
        this.props.logout();
    }

    render() {
        return (
            <div className="talks">
                <div className="table">
                    <div className="header">
                        <div className="column number-column">
                            <img className="icon" src={Icon} alt="Icon" />
                        </div>
                        <div className="column title-column">
                            <Link className="title" to="/news">Hacker Talks</Link>
                            <Link to="/submit">submit</Link>
                        </div>
                        <div className="column auth-column">
                            {!this.props.auth.user && <Link to="/login">login</Link>}
                            {this.props.auth.user && (
                                <div>
                                    <span className="username">{this.props.auth.user.username}</span>
                                    <span>| </span>
                                    <a className="logout" onClick={this.handleLogout.bind(this)}>logout</a>
                                </div>
                            )}
                        </div>
                    </div>
                    {this.props.talks.map((talk, index) => <TalkRow talk={talk} index={index} key={talk.id} history={this.props.history}/>)}
                    {this.props.talks.length === 0 && <div className="row empty-content"><h4>No talks here! Why not add one yourself?</h4></div>}
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({ talks, auth }) => {
    return { talks, auth };
};

export default connect(mapStateToProps, { fetchTalks, logout })(Talks);
