import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import history from '../history';

class addNewTalk extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			errormsg_title: '',
			description: '',
			errormsg_description: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleChange(event) {
		const target = event.target;
		const name = target.name;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		this.setState(
			{
				[name]: value
			}
		);
	}
	
	handleSubmit(event) {
		event.preventDefault();
		let _this = this;
		_this.setState(
			{
				errormsg_title : '',
				errormsg_description : ''
			}
		);
		axios.defaults.headers.common["Authorization"] = this.props.userData.token;
		axios.post(
			'/api/talk',
			{
				title: this.state.title ? this.state.title : null,
				description: this.state.description ? this.state.description : null,
				user_id: this.props.userData.user_id
			}
		).then(
			res => {
				if ('undefined' != typeof res.data.error) {
					res.data.error.forEach(
						function(item, index) {
							let name = 'errormsg_'+item.field;
							_this.setState({
								[name]: item.message
							});
						}
					);
				} else if ('undefined' != typeof res.data.data && 'undefined' != typeof res.data.data.id && res.data.data.id && res.data.data.id != '') {
					history.push('/');
				}
        	}
		);
	}
	
	render() {
		return (
			<form id="TALK-FORM" className="form" onSubmit={this.handleSubmit}>
				<h2>Submit New Talk</h2>
				<ul>
					<li>
						<label>Title:</label>
						<input type="text" name="title" maxlength="128" value={this.state.title} onChange={this.handleChange} />
						<span className="error_msg">{this.state.errormsg_title}</span>
					</li>
					<li>
						<label>Description:</label>
						<textarea name="description" onChange={this.handleChange} value={this.state.description}></textarea>
						<span className="error_msg">{this.state.errormsg_description}</span>
					</li>
					<li className="btn_li">
						<input type="submit" value="Submit" />
					</li>
				</ul>
			</form>
		);
	}

}

const stateToProps = (state) => {
	return {
		userData: state.userData
	};
}

const dispatchToProps = (dispatch) => {
	return {
		setTalkData(talkData) {
			let action ={
				type: 'TALK',
				value: talkData
			}
			dispatch(action);
		}
	};
}

export default connect(stateToProps,dispatchToProps)(addNewTalk);