import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './submit.css';
import Icon from '../../assets/icon.png';
import { createTalk, fetchTalks } from '../../actions/talks.actions';

class Submit extends Component {
    constructor(props) {
        super(props);
        this.state = { title: '', description: '' }
    }

    handleSubmit() {
        console.log('submit');
        const talk = {...this.state, username: this.props.auth.user.username, publishDate: new Date()};
        console.log(talk, this.props);
        this.props.createTalk(talk, () => {
            this.props.fetchTalks();
            this.props.history.push('/talks');
        });
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value });
    }

    render() {
        return (
            <div className="submit">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="table">
                        <div className="header">
                            <div className="column">
                                <Link to="/talks">
                                    <img className="icon" src={Icon} alt="Icon" />
                                </Link>
                            </div>
                            <div className="column title-column">
                                <span className="title">Submit</span>
                            </div>
                        </div>
                        <div className="row submit-row">
                            <div className="column first-column">title</div>
                            <div className="column">
                                <input name="title" type="text" value={this.state.title} onChange={this.onChange.bind(this)} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="column first-column">description</div>
                            <div className="column">
                                <textarea name="description" value={this.state.description} onChange={this.onChange.bind(this)} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="column first-column-offset">
                                <button type="submit">Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = ({auth}) => {
    return { auth };
};

export default connect(mapStateToProps, { createTalk, fetchTalks })(Submit);
