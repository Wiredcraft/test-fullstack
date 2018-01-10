import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Input from './Input'
import './TalkBox.css'

const violationTypes = {
  REQUIRED_EMPTY: {
    value: 'REQUIRED_EMPTY',
    text: () => 'Please fill out the field.',
  },
  LENGTH_TOO_LONG: {
    value: 'LENGTH_TOO_LONG',
    text: (data) => `Exceed words limit by ${data.exceedBy}`,
  },
}

const validationRules = {
  author: {
    required: true,
    maxLength: 19,
  },
  title: {
    required: true,
    maxLength: 59,
  },
  description: {
    required: true,
    maxLength: 599,
  },
}

const emptyState = {
  author: '',
  authorViolation: null,
  title: '',
  titleViolation: null,
  description: '',
  descriptionViolation: null,
}

class TalkBox extends Component {
  state = emptyState

  onChangeAuthor = (event) => {
    this.setState({
      author: event.target.value,
    }, () => {
      this.validate('author')
    })
  }

  onChangeTitle = (event) => {
    this.setState({
      title: event.target.value,
    }, () => {
      this.validate('title')
    })
  }

  onChangeDescription = (event) => {
    this.setState({
      description: event.target.value,
    }, () => {
      this.validate('description')
    })
  }

  validate = (fieldName) => {
    const {required, maxLength} = validationRules[fieldName]
    const value = this.state[fieldName]
    const violationKey = `${fieldName}Violation`
    let violation = null

    if (required && !value) {
      violation = {
        type: violationTypes.REQUIRED_EMPTY.value,
      }
    } else if (maxLength < value.length) {
      violation = {
        type: violationTypes.LENGTH_TOO_LONG.value,
        data: {
          exceedBy: value.length - maxLength,
        },
      }
    }

    this.setState({
      [violationKey]: violation,
    })

    return !violation
  }

  validateAll = () => {
    return Object.keys(validationRules).reduce((result, field) => {
      return this.validate(field) && result
    }, true)
  }

  onSubmit = (event) => {
    event.preventDefault()

    if (this.validateAll()) {
      this.props.onAddTalk({
        ...this.state
      })

      this.setState(emptyState)
    }
  }

  render() {
    const {author, authorViolation, title, titleViolation, description, descriptionViolation}
      = this.state
    const authorViolationText = authorViolation &&
      violationTypes[authorViolation.type].text(authorViolation.data)
    const titleViolationText = titleViolation &&
      violationTypes[titleViolation.type].text(titleViolation.data)
    const descriptionViolationText = descriptionViolation &&
      violationTypes[descriptionViolation.type].text(descriptionViolation.data)

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
            value={author}
            violation={authorViolationText}
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
            value={title}
            violation={titleViolationText}
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
            value={description}
            violation={descriptionViolationText}
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

TalkBox.propTypes = {
  onAddTalk: PropTypes.func.isRequired,
}

export default TalkBox
