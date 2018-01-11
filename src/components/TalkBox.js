import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Input from './Input'
import './TalkBox.css'

class TalkBox extends Component {
  onChangeAuthor = (event) => {
    this.props.onChangeField('author', event.target.value)
  }

  onChangeTitle = (event) => {
    this.props.onChangeField('title', event.target.value)
  }

  onChangeDescription = (event) => {
    this.props.onChangeField('description', event.target.value)
  }

  onChangePublic = (event) => {
    this.props.onChangeField('isPublic', event.target.value === 'true')
  }

  onSubmit = (event) => {
    event.preventDefault()

    const {talkBox: {
      author: {value: author},
      title: {value: title},
      description: {value: description},
      isPublic: {value: isPublic},
    }} = this.props

    this.props.onSubmitBox({
      author,
      title,
      description,
      isPublic,
    })
  }

  render() {
    const {talkBox: {author, title, description, isPublic}} = this.props

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
          <Input
            id="TalkBox-author"
            className="TalkBox-input"
            value={author.value}
            violation={author.violation}
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
          <Input
            id="TalkBox-title"
            className="TalkBox-input"
            value={title.value}
            violation={title.violation}
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
          <Input
            tag="textarea"
            id="TalkBox-text"
            className="TalkBox-input"
            rows={8}
            value={description.value}
            violation={description.violation}
            onChange={this.onChangeDescription}
          />
        </div>

        <div className="TalkBox-field">
          <label
            className="TalkBox-label"
            htmlFor="TalkBox-isPublic"
          >
            public:
          </label>
          <Input
            tag="select"
            id="TalkBox-isPublic"
            className="TalkBox-input"
            value={isPublic.value}
            violation={isPublic.violation}
            onChange={this.onChangePublic}
          >
            <option value="" disabled> -- select an option -- </option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Input>
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

TalkBox.propTypes = {
  talkBox: PropTypes.object.isRequired,
  onChangeField: PropTypes.func.isRequired,
  onSubmitBox: PropTypes.func.isRequired,
}

export default TalkBox
