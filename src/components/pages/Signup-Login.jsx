import React from "react";
import './Signup-Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import request from '../../uility/request'

const SignUpLogin =()=>{
    const navigate = useNavigate()
    const [username,setUsername ] = useState("")
    const [password,setPassword ] = useState("")

    const handleUsernameChange = (e)=>{
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e)=>{
        setPassword(e.target.value)
    }
    
    const signUp = async()=>{
        const result = await request.post('/api/user/reg',{
            username,
            password
        })
        result&&login()
    }
    
    const login = async ()=>{
        const resultToken = await request.post('/api/auth',{
            username,
            password
        })
        if(resultToken){
            console.log("result",result)
            const result = resultToken.data.data
            sessionStorage.setItem("user",result.username)
            sessionStorage.setItem("token",result.token)
            sessionStorage.setItem("userId",result.userId)
            navigate('/')
        }
    }

    return (
        <React.Fragment>
            <div className="form">
                <div className="formItem">
                    <span style={{display:"inline-block",width:'100px'}}>user name:</span>
                    <input className="formInput" prefix="User Name" type="text" value={username} onChange={handleUsernameChange}></input><br/>
                </div>
                <div className="formItem">
                    <span style={{display:"inline-block",width:'100px'}}>password:</span>
                    <input className="formInput" type="text" value={password} onChange={handlePasswordChange}></input><br/>
                </div>
                <div className="formItem">
                    <button onClick={signUp}>sign up</button>
                    <button onClick={login}>login</button> 
                </div>
            </div>
        </React.Fragment>
    )
}

export default SignUpLogin;