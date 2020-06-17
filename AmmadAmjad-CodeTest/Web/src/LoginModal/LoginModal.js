import React, { useState, useRef } from 'react';
import './LoginModal.css';
import axios from 'axios';


const LoginModal = ({ handleClose, handleSuccess, show }) => {
  const showHideClassName = show ? "modal" : "hideModal";

  const [emailWarning, setEmailWarning] = useState(false);
  const [pwdWarning, setPwdWarning] = useState(false);
  const [showLoginError, setLoginError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const emailRef = useRef();
  const pwdRef = useRef();


  function handleAbort(e) {
    emailRef.current.value = null;
    pwdRef.current.value = null;
    setPwdWarning(false)
    setEmailWarning(false)
    setLoginError(false)
    handleClose()
  }
  function handleLogin(e) {
    const email = emailRef.current.value;
    if (email === null || email === undefined || email === "") {
      setEmailWarning(true)
      return
    } else {
      setEmailWarning(false)
    }
    const password = pwdRef.current.value;
    if (password === null || password === undefined || password === "") {
      setPwdWarning(true);
      return
    } else {
      setPwdWarning(false)
    }


    axios.post('http://localhost:3001/user/login', {
      email: email,
      password: password
    })
      .then(response => {
        console.log(response);
        localStorage.setItem('name', response.data.user.name);
        localStorage.setItem('email', response.data.user.email);
        localStorage.setItem('token', response.data.user.token);
        emailRef.current.value = null;
        pwdRef.current.value = null;
        setPwdWarning(false)
        setEmailWarning(false)
        setLoginError(false)

        handleSuccess();
      })
      .catch(err => {
        setLoginError(true);
        setErrMsg(err.response.data.error);
      })
  }

  return (
   

        <div name="modal" className={showHideClassName}>
        <div className="modal-mask">
            <div className="modal-wrapper">
                <div className="modal-container" >
                <div className="modal-header">
  <h3 >LOGIN </h3>
                </div>

                <div className="modal-body">
                    <label className="fieldName">Email</label>
                    <input ref={emailRef} className="filedValue"></input>
                    {
                        emailWarning ?
                        <label className="warning">Please enter a valid email address</label> : 
                        null
                    }
                    
                
    
                    <label className="fieldName">Password</label>
                    <input ref={pwdRef} className="filedValue" type="password"></input>
                    {
                        pwdWarning ?
                        <label className="warning">Please enter a password</label>     : 
                        null
                    }


                    {
                        showLoginError ?
                      <label className="warning">{errMsg}</label>     : 
                        null
                    }
                    
                </div>

                <div className="modal-footer">
                    <div className="buttonsContainer">
                        <button className="bt grey" onClick={handleAbort}>ABORT</button>
                        <button className="bt black" onClick={handleLogin}>LOGIN</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </div>
  );
};

export default LoginModal;
