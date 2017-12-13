import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router-dom'
import Item from './components/Item'
import { loadingPic } from './public/loading'

export default class Container extends Component {
	constructor () {
		super()
    this.state = {
    	page: 1
    }
	}

	componentDidMount () {
		this.scrollTop()
	}

	scrollTop() {
    window.scrollTo(0, 0);
  }

  renderItem (data) {
		if (data && data.length > 0) {
			return data.map((itemData, index) => (
				<Item index={index} data={itemData} key={index} page={this.props.match.params.page} />
			))
		}  		
  }

  renderLoading () {
  	const { match } = this.props
  	const page = Number(match.params.page)
  	let element
  	if (page > 1) {
  		element = (
  			<div className="footer-page">
  				big brother, no data here, try to go prev page!
  			</div>
			)
  	} else {
  		element = (
  			<div className="loading">
  				<img src={loadingPic} alt="loading" />
  			</div>
			)
  	}

  	return element
  }

  renderList (data) {
    return (
      <div className="content">
        {
          (data && data.length) > 0 ?
            <ol>
              {this.renderItem(data)}
            </ol> :
            this.renderLoading()
        }
      </div>
    )
  }

  renderPage (type) {
    const match = this.props
    const page = Number(math.params.page)
    let newTypePrev
    let newTypeNext
    if (type) {
      newTypePrev = `/${type}/${(page - 1) > 1 ? page - 1 : 1}`
      newTypeNext = `/${type}/${page + 1}`
    } else {
      newTypePrev = `/${(page - 1) > 1 ? page - 1 : 1}`
      newTypeNext = `/${page + 1}`
    }
    return (
      <div className="footer-page">
        <Link to={newTypePrev} onClick={() => this.scrollTop()}>{'< prev ---'}</Link>
        <span>${page}</span>
        <Link to={newTypeNext} onClick={() => this.scrollTop()}>{' --- next > '}</Link>
      </div>
    )
  }

}	


