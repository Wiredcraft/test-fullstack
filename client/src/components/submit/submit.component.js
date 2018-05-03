import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';

import './submit.css';
import Icon from '../../assets/icon.png';
import {createTalk, fetchTalks} from '../../actions/talks.actions';

class Submit extends Component {
    submitTalk(values) {
        const talk = {...values, username: this.props.auth.user.username, publishDate: new Date()};
        console.log(talk);
        this.props.createTalk(talk, () => {
            this.props.fetchTalks();
            this.props.history.push('/talks');
        });
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <div className="submit">
                <div className="table">
                    <div className="header">
                        <div className="column">
                            <Link to="/talks">
                                <img className="icon" src={Icon} alt="Icon"/>
                            </Link>
                        </div>
                        <div className="column title-column">
                            <span className="title">Submit</span>
                        </div>
                    </div>
                    <form name="submit-talk" onSubmit={handleSubmit(this.submitTalk.bind(this))} noValidate>
                        <div className="row">
                            <div className="column first-column">title</div>
                            <div className="column">
                                <Field className="form-field" name="title" component="input" type="text" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="column first-column">description</div>
                            <div className="column">
                                <Field className="form-field" name="description" component="textarea" rows="10" type="text" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="column first-column-offset">
                                <button type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({auth}) => {
    return {auth};
};

export default reduxForm({
    form: 'SubmitTalksForm'
})(connect(mapStateToProps, {createTalk, fetchTalks})(Submit));
