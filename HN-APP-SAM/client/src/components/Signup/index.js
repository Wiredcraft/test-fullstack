import React, { Component } from 'react'
import { pick } from 'lodash'
import axios from 'axios'
import Entry from '@/components/EntryForm'

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: '',
      password2: '',
    }
  }

  ruleMap = {
    name: 'Please input name',
    password: 'Please input password',
    password2: 'Please confirm password',
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

      if(obj.password !== obj.password2) {
        err.extra = "Please input correct password"
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
          .post('/api/user', data)
          .then((res) => {
            this.props.history.push('/login')
          })
      })
      .catch((err) => {
        alert(Object.values(err)[0])
      })
  }

  render() {
    return (
      <Entry type="signup" onChange={this.setData} onSubmit={this.onSubmit} />
    )
  }
}

export default Signup
