import React, { Component, useEffect } from 'react'
import {dbPromise} from '../database/database';
import { Talk, TalkServiceImpl } from '../backend/talkManagement';
import { useNavigate } from 'react-router-dom';
 
class List extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      talkList: Array<Talk>
    }
  }
  onClickAdd() {
    this.props.navigate('/talk');
  }
  onClickRate(data) {
    const talkService = TalkServiceImpl.createService();
    data.rate++;
    talkService.update(data).then(() => {
      this.queryAllTalks();
    })
  }
  componentDidMount() {
    dbPromise.then(() => {
      this.queryAllTalks();
    })
  }
  queryAllTalks() {
    const talkService = TalkServiceImpl.createService();
    talkService.queryAll().then((data) => {
      console.log(data)
      this.setState({
        talkList: data
      })
    })
  }
  render () {
    return (
      <div className="list">
        {
          this.state.talkList.length > 0
          ?
          this.state.talkList.map((t: Talk, key: React.Key | null | undefined)=> {
            return (<div key={key} className="item">
              <div className="title">{t.title} <button className="primary" onClick={this.onClickRate.bind(this, t)}>vote</button></div>
              <div className="desc">{t.description}</div>
              <div className="info"><span>{t.user}&nbsp;&nbsp;</span>{t.time}<span className="rate fr">rate: {t.rate}</span></div>
            </div>)
          })
          :
          <div className="empty_message">No lighting talk yet! <br/><br/>click the + button to create your topic!</div>
        }
        <button className="primary add_talk" onClick={this.onClickAdd.bind(this)}><span>+</span></button>
      </div>
    )
  }
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <List {...props} navigate={navigate} />
}

export default WithNavigate