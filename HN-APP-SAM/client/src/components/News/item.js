import React, { Component } from 'react'
import { getTimeGapInfo } from '@/utils/common'
import './index.css'
import 'lodash'
import { get } from 'lodash'

class Item extends Component {
  constructor(props) {
    super(props)
  }

  get bottomTip() {
    const { rate_points, latest } = this.props
    const rater = get(latest, 'rater.name', '')
    const rate_time = get(latest, 'rate_time', '')
    const timeGap = rate_time ? getTimeGapInfo(rate_time) : ''
    let tip = []
    tip.push(rate_points, rate_points > 1 ? 'points' : 'point')
    if (rate_points > 0) {
      rater && tip.push('by', rater)
      timeGap && tip.push(timeGap)
    }
    return tip.join(' ')
  }

  get arrowClass() {
    const { ratable } = this.props
    let arrowClass = 'arrow-up'
    if (!ratable) arrowClass = `${arrowClass} rated`
    return arrowClass
  }

  render() {
    const { number, title, onClick, _id, ratable } = this.props
    return (
      <div className="news-item" onClick={()=>{
          if (typeof onClick === 'function') onClick(_id, ratable)
      }}>
        <div>{number}</div>
        <div className={this.arrowClass}></div>

        <div>
          <p className="title">{title}</p>
          <p className="tip">{this.bottomTip}</p>
        </div>
      </div>
    )
  }
}


export default Item
