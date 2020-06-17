import React, { Component } from 'react'
import './Comments.css';

import axios from 'axios';
import NewCommentWidget from '../NewCommentWidget/NewCommentWidget';
import AddNewCommentModal from '../AddNewCommentModal/AddNewCommentModal';

import UserIcon from '../resources/icons/ic_user.png';
import TimeIcon from '../resources/icons/ic_time.png';
import VoteIcon from '../resources/icons/ic_vote.png';

import moment from 'moment';


export default class Comments extends Component {



    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            comments: [],
            count: 0,
            showAddModal: false,
            type: 0,
            isLoggedIn: props.props.isLoggedIn
        }
        console.log(this.state.isLoggedIn);

        this.onShowPopularClicked = this.onShowPopularClicked.bind(this);
        this.onShowLatestClicked = this.onShowLatestClicked.bind(this);
        this.modalOpen = this.modalOpen.bind(this);
        this.modalClose = this.modalClose.bind(this);
        this.handleAddNewCommentSuccess = this.handleAddNewCommentSuccess.bind(this);
        this.vote = this.vote.bind(this);
        this.cancelVote = this.cancelVote.bind(this);
    }

    componentDidMount() {
        this.getComments();
    }


    getComments() {
        axios.get(`http://localhost:3001/comment/list/all?sortBy=${this.state.type === 1 ? 'votes' : 'createdAt'}`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then(response => {
                this.setState({
                    comments: response.data.rows,
                    count: response.data.count
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    modalOpen() {
        this.setState({ showAddModal: true });
    }

    modalClose() {
        this.setState({
            showAddModal: false
        });
    }

    handleAddNewCommentSuccess() {
        this.setState({
            showAddModal: false
        });
        this.getComments();
        this.props.onAddNewComment()
    }

    onShowPopularClicked(e) {
        this.setState({
            type: 0
        });
        this.getComments();
    }

    onShowLatestClicked(e) {
        this.setState({
            type: 1
        });
        console.log(this.state.type);
        this.getComments();
    }

    vote(comment) {
        if (comment.voted === 1) return;
        axios.post(`http://localhost:3001/comment/${comment.id}/vote`, {}, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then(response => {
                this.getComments()
            })
            .catch(error => {
                console.log(error);
            });
    }

    cancelVote(comment) {
        if (comment.voted === 0) return;
        axios.delete(`http://localhost:3001/comment/${comment.id}/vote`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then(response => {
                this.getComments()
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const listItems = this.state.comments.map((comment) =>
        <div key={comment.id}>
            <div className="commentCard">
                <label className="title">{comment.title}</label>
                <label className="description">{comment.description}</label>
                <div className="bottom">
                    <div className="property">
                        <img className="icon" alt="" src={UserIcon}></img>
                        <label className="value">{comment.author.name}</label>
                    </div>
                    <div className="property">
                        <img className="icon" alt="" src={TimeIcon}></img>
                        
                        <label className="value">{moment(comment.createdAt).format('ddd , DD MMM YYYY , HH:MM:ss')}</label>
                    </div>
                    <div className="property">
                        <img className="icon" alt="" src={VoteIcon}></img>
                        <label className="value">{comment.votes}</label>
                    </div>
                    {
                        this.state.isLoggedIn ? 
                        <div className="btContainer">
                            {
                                comment.voted === 0 ?
                                <button className="btVote" onClick={e => {this.vote(comment);}}>Vote For This Comment</button> :
                                <button className="btVote" onClick={e => {this.cancelVote(comment);}}>Recind Vote</button>
                            }
                        </div> : 
                        null

                    }
                    
                    
                </div>
            </div>
        </div>
      );

       

       
        return (
            <div>
                <div onClick={this.modalOpen}>
                <NewCommentWidget />
                </div>
                <div className="filtersView">
                    <button className={this.state.type === 0 ? 'filter selected' : 'filter'} onClick={this.onShowPopularClicked} >Show popular first</button>
                    <button className={this.state.type === 1 ? 'filter selected' : 'filter'} onClick={this.onShowLatestClicked} >Show latest first</button>
                </div>


                {
                    this.state.count > 0 ?
                    <div className="list"> {listItems} </div> : 
                    <label className="noComments">No comments yet. You can login/register to add a comment</label>
                }
                

                <AddNewCommentModal show={this.state.showAddModal} handleClose={e => this.modalClose(e)} handleSuccess={e => this.handleAddNewCommentSuccess(e)}/>

            </div>
        )
    }
}
