import React, { Component } from 'react'
import axios from '@/http'
import { removeToken } from '@/utils/auth'
import Item from './item'
import './index.css'
import 'lodash'

class News extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newsList: [],
    }
  }
  componentDidMount() {
    this.fetchData()
  }
  fetchData = () => {
    axios.get('/api/news').then((res) => {
      this.setState({
        newsList: res.data,
      })
    })
  }

  fetchRate = (_id, ratable) => {
    const url = !ratable
      ? `/api/news/${_id}/del_rate`
      : `/api/news/${_id}/add_rate`
    axios.post(url).then((res) => {
      this.fetchData()
    })
  }

  onLogOut = () => {
    removeToken()
    this.props.history.push('/login')
  }

  onAdd = () => {
    this.props.history.push('/detail')
  }

  render() {
    const { newsList } = this.state
    return (
      <>
        <header>
          <button className="add" onClick={this.onAdd}>
            Add news
          </button>
          <span>HN-APP</span>
          <button className="logout" onClick={this.onLogOut}>
            Log out
          </button>
        </header>
        <main>
          {newsList.length > 0 ? (
            newsList.map((item, index) => (
              <Item
                key={index}
                {...item}
                number={index + 1}
                onClick={this.fetchRate}
              />
            ))
          ) : (
            <h1 className="hint">Try to add news</h1>
          )}
        </main>
      </>
    )
  }
}

export default News
