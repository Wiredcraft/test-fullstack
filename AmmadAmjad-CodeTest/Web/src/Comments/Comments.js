import React, { Component } from "react";
import "./Comments.css";

import NewCommentWidget from "../NewCommentWidget/NewCommentWidget";
import AddNewCommentModal from "../AddNewCommentModal/AddNewCommentModal";

import UserIcon from "../resources/icons/ic_user.png";
import TimeIcon from "../resources/icons/ic_time.png";
import VoteIcon from "../resources/icons/ic_vote.png";

import moment from "moment";

import { HTTP, URLS } from "../network/http";

export default class Comments extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      comments: [],
      count: 0,
      showAddModal: false,
      type: 0,
      isLoggedIn: props.props.isLoggedIn,
    };

    this.onShowPopularClicked = this.onShowPopularClicked.bind(this);
    this.onShowLatestClicked = this.onShowLatestClicked.bind(this);
    this.modalOpen = this.modalOpen.bind(this);
    this.modalClose = this.modalClose.bind(this);
    this.handleAddNewCommentSuccess = this.handleAddNewCommentSuccess.bind(
      this
    );
    this.handleAddNewCommentError = this.handleAddNewCommentError.bind(this);
    this.vote = this.vote.bind(this);
    this.cancelVote = this.cancelVote.bind(this);
    this.showError = this.showError.bind(this);
  }

  componentDidMount() {
    this.getComments();
  }

  showError(msg) {
    console.log("MSG REC");
    console.log(msg);
    this.props.onShowMsgOnHome(msg);
  }

  getComments() {
    HTTP.get(
      URLS.COMMENTS.replace(
        ":sortBy",
        this.state.type === 1 ? "votes" : "createdAt"
      ),
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((response) => {
        this.setState({
          comments: response.data.rows,
          count: response.data.count,
        });
      })
      .catch((error) => {
        var msg = "";
        try {
          msg = error.response.data.message;
        } catch (e) {
          msg = error.message;
        }
        this.props.onShowMsgOnHome(
          msg || "Failed to fetch comments. Please try again later"
        );
      });
  }

  modalOpen() {
    if (this.state.isLoggedIn) {
      this.setState({ showAddModal: true });
    } else {
      this.props.onShowMsgOnHome(
        "Please login or register before adding new comment"
      );
    }
  }

  modalClose() {
    this.setState({
      showAddModal: false,
    });
  }

  handleAddNewCommentSuccess() {
    this.setState({
      showAddModal: false,
    });
    this.getComments();
    this.props.onShowMsgOnHome("Commented added successfully");
  }

  handleAddNewCommentError(msg) {
    this.props.onShowMsgOnHome(msg);
  }

  onShowPopularClicked(e) {
    this.setState({
      type: 0,
    });
    this.getComments();
  }

  onShowLatestClicked(e) {
    this.setState({
      type: 1,
    });
    console.log(this.state.type);
    this.getComments();
  }

  vote(comment) {
    if (comment.voted === 1) {
      this.props.onShowMsgOnHome(
        "You have already voted for this comment. You can only vote once per comment"
      );
      return;
    }

    const commentId = comment.id;
    if (commentId < 0) {
      this.props.onShowMsgOnHome(
        "Invalid comment ID , please contact administrator"
      );
      return;
    }


    HTTP.post(
      URLS.VOTE.replace(
        ":commentId",
        commentId
      ),
      {},
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((response) => {
        this.getComments();
      })
      .catch((error) => {
        var msg = "";
        try {
          msg = error.response.data.message;
        } catch (e) {
          msg = error.message;
        }

        this.props.onShowMsgOnHome(
          msg || "Failed to cast vote. Please try again later"
        );
      });
  }

  cancelVote(comment) {
    if (comment.voted === 0) {
      this.props.onShowMsgOnHome(
        "You have not voted for this comment before. Cannot cancel the vote"
      );
      return;
    }

    const commentId = comment.id;
    if (commentId < 0) {
      this.props.onShowMsgOnHome(
        "Invalid comment ID , please contact administrator"
      );
      return;
    }
    
    HTTP.delete(
      URLS.VOTE.replace(
        ":commentId",
        commentId
      ),
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((response) => {
        this.getComments();
      })
      .catch((error) => {
        var msg = "";
        try {
          msg = error.response.data.message;
        } catch (e) {
          msg = error.message;
        }
        this.props.onShowMsgOnHome(
          msg || "Failed to cancel vote. Please try again later"
        );
      });
  }

  render() {
    const listItems = this.state.comments.map((comment) => (
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

              <label className="value">
                {moment(comment.createdAt).format(
                  "ddd , DD MMM YYYY , HH:MM:ss"
                )}
              </label>
            </div>
            <div className="property">
              <img className="icon" alt="" src={VoteIcon}></img>
              <label className="value">{comment.votes}</label>
            </div>
            {this.state.isLoggedIn ? (
              <div className="btContainer">
                {comment.voted === 0 ? (
                  <button
                    className="btVote"
                    onClick={(e) => {
                      this.vote(comment);
                    }}
                  >
                    Vote For This Comment
                  </button>
                ) : (
                  <button
                    className="btVote"
                    onClick={(e) => {
                      this.cancelVote(comment);
                    }}
                  >
                    Recind Vote
                  </button>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    ));

    return (
      <div>
        <div onClick={this.modalOpen}>
          <NewCommentWidget />
        </div>
        <div className="filtersView">
          <button
            className={this.state.type === 0 ? "filter selected" : "filter"}
            onClick={this.onShowPopularClicked}
          >
            Show popular first
          </button>
          <button
            className={this.state.type === 1 ? "filter selected" : "filter"}
            onClick={this.onShowLatestClicked}
          >
            Show latest first
          </button>
        </div>

        {this.state.count > 0 ? (
          <div className="list"> {listItems} </div>
        ) : (
          <label className="noComments">
            No comments yet. You can login/register to add a comment
          </label>
        )}

        <AddNewCommentModal
          show={this.state.showAddModal}
          handleClose={(e) => this.modalClose(e)}
          handleSuccess={(e) => this.handleAddNewCommentSuccess(e)}
          handleError={(e) => this.handleAddNewCommentError(e)}
        />
      </div>
    );
  }
}
