import React from 'react';
import './TalkList.css';
import AddTalkItem from '../AddTalkItem';
import TalkItem from '../TalkItem';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import request from '../../uility/request'

const TalkList =()=>{
    const navigate = useNavigate()
    const [list,setList]=useState([])
    const [sortBy,setSortBy]=useState("createdAt")
    const [showAddListItem,setShowAddListItem]=useState(false)
    useEffect(async()=>{
        if(sessionStorage.getItem('user')){
            await getTalkList(sortBy)
        }
    },[])

    const getTalkList = async (sortBy)=>{
        const result = await request.find('/api/talkList',
            {
                params:{sortBy:sortBy}
            }
        )
        console.log(sortBy,result.data.data)
        setList(result.data.data)
    }
    const doCancel=async ()=>{
        setShowAddListItem(false)
        await getTalkList(sortBy)
    }
    const doClick=()=>{
        if(sessionStorage.getItem("token")){
            setShowAddListItem(true)
        }else{
            alert("Please login first.")
            navigate('/user')
        }
    }

    const handleSortChange = async(e)=>{
        setSortBy(e.target.value)
        await getTalkList(e.target.value)
    }

    const doRefresh=async()=>{
        await getTalkList(sortBy)
    }

    return (
        <React.Fragment>
            <div className="divStyle">
                {!sessionStorage.getItem("token")&&<div className="divItem">
                    <span>A lightning talk is a very short presentation lasting only a few minutes,</span>
                    <span>given at a conference or a meetup etc. Login and enjoy it!</span>
                </div>}
                {(sessionStorage.getItem("token")&&list.length===0)&&<div className="divItem">
                    <span>There is no talk. Click add and share it!</span>
                </div>}
                {showAddListItem&&<div className="divItem">
                    <AddTalkItem doCancel={doCancel}></AddTalkItem>
                </div>}
                {list.length>0&&<div className="selectItem">
                    <span>SortBy:</span>
                    <select value={sortBy} style={{fontSize:"16px"}} onChange={handleSortChange}>
                        <option value="createdAt">createdAt</option>
                        <option value="rankCount">rankCount</option>
                    </select>
                </div>}
                <div className="divItem">
                    {list.map(item=>
                        <TalkItem key={`${item.id}_${item.title}`} talkInfo={item}
                        doRefresh={doRefresh}
                        ></TalkItem>
                    )} 
                </div>
            </div>
            <div className="addbtnStyle">
                <button onClick={doClick}>Add</button>
            </div>
        </React.Fragment>
    )
}

export default TalkList;