import React from 'react';
import "./TalkItem.css"
import moment from 'moment';
import request from '../uility/request'

const TalkItem = (props)=>{
    const talkInfo = props.talkInfo

    const { doRefresh }=props

    const addRank = async()=>{
        await request.patch(talkInfo.id,'/api/talkList',{
            rankCount:parseInt(talkInfo.rankCount)+1
        })
        doRefresh()
    }
    return(
        <div className="divDetail">
            <div className='talkTitle'>
                <div className='spanStyle'>{talkInfo.title}</div>
                <div className='spanStyle'>
                    {talkInfo.authorName}
                    /
                    {moment.utc(talkInfo.createdAt).utcOffset(8).format('YYYY-MM-DD HH:mm:ss')}
                </div>
            </div>
            <div className='contentStyle'>
                <p className='contentLeft'>{talkInfo.content}</p>
                <div className='rankStyle'>
                    <div>{talkInfo.rankCount}</div>
                    <img onClick={addRank} className='imgStyle'src='/sharpicons_star-3.svg'></img>
                </div>
            </div>
        </div>
    )
}

export default TalkItem;