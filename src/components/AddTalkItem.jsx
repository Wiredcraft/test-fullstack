import React from 'react';
import "./AddTalkItem.css"
import request from '../uility/request'
import { useState } from 'react';

const AddTalkItem = (props)=>{
    const [title,setTitle ] = useState("")
    const [content,setContent ] = useState("")

    const handleSetTitleChange = (e)=>{
        setTitle(e.target.value)
    }

    const handleContentChange = (e)=>{
        setContent(e.target.value)
    }
    
    const { doCancel }=props
    const doSubmit = async()=>{
        if(!title){
            alert("Please input title!")
            return
        }

        const realData = {
            title,
            rankCount:0,
            authorName:sessionStorage.getItem("user")
        }
        if(content){
            Object.assign(realData,{content})
        }
        const result = await request.post("/api/talkList",realData)
        if(result){
            doCancel()
        }
    }
    return(
        <div className="divDetail">
            <div className='talkTitle'>
                <div className='input1'>
                    <input style={{height:"60%",margin:"10px",borderRadius:"5px",borderColor:"#4867AA"}} type="text" placeholder='Title' 
                        value={title} onChange={handleSetTitleChange}
                    />  
                </div>
            </div>
            <div className='contentStyle'>
                <div className='input2'>
                    <textarea style={{width:"inherit",height:"75%",margin:"10px",borderRadius:"5px",borderColor:"#4867AA", resize:"none"}} type="text" placeholder='Content' 
                        value={content} onChange={handleContentChange}
                    />  
                </div>
                <div className='contentRight'>
                    <button onClick={doSubmit}>Submit</button>
                    <button onClick={doCancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default AddTalkItem;