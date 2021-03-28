import React, { Component } from 'react'
import { debounce, pick } from 'lodash'
import axios from 'axios'
class Detail extends Component {
  constructor(props) {
      super(props)
      this.state = {
        title: '',
        content: ''
      }
  }

  ruleMap = {
    title: 'Please input title',
    content: 'Please input content',
  }

  setData = ([k, v]) => {
    this.setState({
      [k]: v,
    })
  }

  validator = () => {
    return new Promise((resolve, reject) => {
      let obj = pick(this.state, Object.keys(this.ruleMap))
      let err = {}
      for (const k in this.ruleMap) {
        if (!obj[k]) {
          err[k] = this.ruleMap[k]
          break
        }
      }

      if (Object.keys(err).length === 0) {
        resolve(obj)
      } else {
        reject(err)
      }
    })
  }

  onSubmit = () => {
    this.validator()
      .then((data) => {
        axios
          .post('/api/news', data)
          .then((res) => {
            this.props.history.push('/news')
          })
      })
      .catch((err) => {
        alert(Object.values(err)[0])
      })
  }

  render() {
    return (
      <>
        <form>
          <label>
            <p>Title</p>
            <input
              style={{width: '100%'}}
              type="text"
              name="title"
              onChange={debounce((e) => {
                this.setData(['title', e.target.value])
              }, 300)}
            />
          </label>
          <br />
          <label>
            <p>Content</p>
            <textarea
              rows="4"
              cols="50"
              style={{width: '100%'}}
              type="text"
              name="content"
              onBlur={(e) => {
                this.setData(['content', e.target.value])
              }}
            />
          </label>
        </form>
        <br />
        <button onClick={this.onSubmit}>Submit</button>
      </>
    )
  }
}

export default Detail
