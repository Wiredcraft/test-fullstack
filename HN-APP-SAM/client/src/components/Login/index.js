import React, { Component } from 'react'
import { pick } from 'lodash'
import axios from '@/http'
import { useHistory } from 'react-router-dom'
import Entry from '@/components/EntryForm'
import { setToken } from '@/utils/auth'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: '',
    }
  }

  setData = ([k, v]) => {
    this.setState({
      [k]: v,
    })
  }

  ruleMap = {
    name: 'Please input name',
    password: 'Please input password',
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
        axios .post('/api/user/login', data).then((res) => {
          setToken(res.data.token)
          this.props.history.push('/news')
        })
      })
      .catch((err) => {
        alert(Object.values(err)[0])
      })
  }

  render() {
    return (
      <Entry type="login" onChange={this.setData} onSubmit={this.onSubmit} history={this.props.history} />
    )
  }
}

export default Login
