import React, {Component} from 'react'
import './TalkBox.css'

const emptyState = {
  author: '',
  title: '',
  description: '',
}

class TalkBox extends Component {
  state = emptyState

  onChangeAuthor = (event) => {
    this.setState({
      author: event.target.value
    })
  }

  onChangeTitle = (event) => {
    this.setState({
      title: event.target.value
    })
  }

  onChangeDescription = (event) => {
    this.setState({
      description: event.target.value
    })
  }

  onSubmit = (event) => {
    event.preventDefault()

    this.props.onAddTalk({
      ...this.state
    })

    this.setState(emptyState)
  }

  render() {
    const {author, title, description} = this.state

    return (
      <form
        className="TalkBox"
        onSubmit={this.onSubmit}
      >
        <h2>Submit a talk</h2>
        <div className="TalkBox-field">
          <label
            className="TalkBox-label"
            htmlFor="TalkBox-author"
          >
            your name:
          </label>
          <input
            autoFocus
            required
            id="TalkBox-author"
            className="TalkBox-input"
            value={author}
            onChange={this.onChangeAuthor}
          />
        </div>

        <div className="TalkBox-field">
          <label
            className="TalkBox-label"
            htmlFor="TalkBox-title"
          >
            title:
          </label>
          <input
            required
            id="TalkBox-title"
            className="TalkBox-input"
            value={title}
            onChange={this.onChangeTitle}
          />
        </div>

        <div className="TalkBox-field">
          <label
            className="TalkBox-label"
            htmlFor="TalkBox-text"
          >
            text:
          </label>
          <textarea
            id="TalkBox-text"
            className="TalkBox-input"
            rows={8}
            value={description}
            onChange={this.onChangeDescription}
          />
        </div>

        <div>
          <button
            className="TalkBox-submit"
            type="submit"
          >
            submit
          </button>
        </div>
      </form>
    )
  }
}

export default TalkBox
