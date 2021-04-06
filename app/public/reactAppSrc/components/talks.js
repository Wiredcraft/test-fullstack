import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

import history from '../history';
import Pagination from "./pagination";

class talks extends Component {
	constructor(props) {
		super(props);
		let per_page = localStorage.getItem('pageCountForTalk');
		if (!per_page)
			per_page = 30;
		this.state = {
			page: 1,
			per_page: per_page,
			total_page: 0,
			talkData: []
		};
	}

	async componentDidMount() {
		axios.get(
			'/api/talk',
			{
				params: {
					page: this.state.page,
					per_page: this.state.per_page,
					sortby: 'vote_count',
					order: 'DESC',
					user_id: this.props.userData.user_id
				}
			}
		).then(response => response.data).then(
			(data) => {
				this.setState(
					{
						renderPage: true,
						total_page: data.meta.totalPage,
						talkData: data.data
					}
				);
			}
		);
	}
	
	talkList(list) {
		if (list.length > 0) {
			let _this = this;
			let per_page = localStorage.getItem('pageCountForTalk');
			if (!per_page)
				per_page = _this.state.per_page;
			let res = list.map((item, key) => {
				let vote_btn = item.voteRecordId ? ( 
					<button type="button" className="unvoteButton"
					onClick={() => {
						if (this.props.userData.token) {
							axios.defaults.headers.common["Authorization"] = this.props.userData.token;
							axios.put(
								"/api/talk/"+item.id,
								{
									vote: -1,
									user_id: this.props.userData.user_id,
									vote_record_id: item.voteRecordId
								}
							).then(
								res => {
									axios.get(
										'/api/talk',
										{
											params: {
												page: _this.state.page,
												per_page: per_page,
												sortby: 'vote_count',
												order: 'DESC',
												user_id: _this.props.userData.user_id
											}
										}
									).then(response => response.data).then(
										(data) => {
											_this.setState(
												{
													renderPage: true,
													total_page: data.meta.totalPage,
													talkData: data.data
												}
											);
										}
									);
					        	}
							);
						} else {
							history.push('/signIn');
						}
					}}
					>Unvote</button>
				) : (
					<button type="button" className="voteButton"
					onClick={() => {
						if (this.props.userData.token) {
							axios.defaults.headers.common["Authorization"] = this.props.userData.token;
							axios.put(
								"/api/talk/"+item.id,
								{
									vote: 1,
									user_id: this.props.userData.user_id
								}
							).then(
								res => {
									axios.get(
										'/api/talk',
										{
											params: {
												page: _this.state.page,
												per_page: per_page,
												sortby: 'vote_count',
												order: 'DESC',
												user_id: _this.props.userData.user_id
											}
										}
									).then(response => response.data).then(
										(data) => {
											_this.setState(
												{
													renderPage: true,
													total_page: data.meta.totalPage,
													talkData: data.data
												}
											);
										}
									);
					        	}
							);
						} else {
							history.push('/signIn');
						}
					}}
					>Vote</button>
				);
	            return (
	                <li className="talk_item" key={item.id}>
						<div className="vote_block">
							{vote_btn}
							<div className="voteCount">
								<span className="voteCountTitle">Vote Count: </span>
								<span className="voteCountNum">{item.vote_count}</span>
							</div>
						</div>
						<div className="item_block">
							<div className="context_block">
								<p className="title">{item.title}</p>
								<p className="description">{item.description}</p>
							</div>
							<div className="info_block">
								Submitted by <span className="info_username">{item.username}</span> at <span className="info_moment">{moment(item.created_at, "YYYYMMDD HH:mm:ss").fromNow()}</span>
							</div>
						</div>
	                </li>
	            )
	        });
	        return (
	            <ul>{res}</ul>
        	);
		} else {
			return (
				<p className="warning">No any TALKS yet! You can add one by click the 'Submit-New-Talk' button above</p> 	
			);
		}
    }
	
	render() {
		let _this = this;
		let Page = this.state.renderPage ? (
			<Pagination config = {{
				pageCurr: 1,
				pageCount: this.state.per_page,
				totalPage: this.state.total_page,
				async paging(pageObj) {
					axios.get(
						'/api/talk',
						{
							params: {
								page: pageObj.pageCurr,
								per_page: pageObj.pageCount,
								sortby: 'vote_count',
								order: 'DESC',
								user_id: _this.props.userData.user_id
							}
						}
					).then(response => response.data).then(
						(data) => {
							_this.setState(
								{
									page: data.meta.currentPage,
									total_page: data.meta.totalPage,
									talkData: data.data
								}
							);
						}
					);
				}
			}}
			/>
		) : "";
		
		return (
			<Fragment>
				<div className="list_block">
					{_this.talkList(_this.state.talkData)}
				</div>
				<div className="pagination_block">
					{ Page }
				</div>
			</Fragment>
		);
	}

}

const stateToProps = (state) => {
	return {
		userData: state.userData
	};
}

const dispatchToProps = (dispatch) => {
	return {};
}

export default connect(stateToProps,dispatchToProps)(talks);