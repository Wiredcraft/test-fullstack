import React, { useState, useRef } from "react";
import "./RegistrationModal.css";
import { HTTP, URLS } from "../network/http";

const RegistrationModal = ({ handleClose, handleSuccess, show }) => {
  const showHideClassName = show ? "modal" : "hideModal";

  const [nameWarning, setNameWarning] = useState(false);
  const [emailWarning, setEmailWarning] = useState(false);
  const [pwdWarning, setPwdWarning] = useState(false);
  const [rePwdWarning, setRePwdWarning] = useState(false);
  const [showLoginError, setLoginError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const nameRef = useRef();
  const emailRef = useRef();
  const pwdRef = useRef();
  const rePwdRef = useRef();

  function handleAbort(e) {
    emailRef.current.value = null;
    pwdRef.current.value = null;
    nameRef.current.value = null;
    rePwdRef.current.value = null;
    setPwdWarning(false);
    setEmailWarning(false);
    setLoginError(false);
    setRePwdWarning(false);
    setNameWarning(false);
    handleClose();
  }
  function handleRegistration(e) {
    const name = nameRef.current.value;
    if (name === null || name === undefined || name === "") {
      setNameWarning(true);
      return;
    } else {
      setNameWarning(false);
    }

    const email = emailRef.current.value;
    if (email === null || email === undefined || email === "") {
      setEmailWarning(true);
      return;
    } else {
      setEmailWarning(false);
    }
    const password = pwdRef.current.value;
    if (password === null || password === undefined || password === "") {
      setPwdWarning(true);
      return;
    } else {
      setPwdWarning(false);
    }

    const rePwd = rePwdRef.current.value;
    if (rePwd === null || rePwd === undefined || rePwd === "") {
      setRePwdWarning(true);
      return;
    } else {
      setRePwdWarning(false);
    }

    if (rePwd !== password) {
      setErrMsg("Please make sure the password matches");
      setLoginError(true);
      return;
    }


      HTTP.post(URLS.REGISTER, {
        email: email,
        password: password,
        name: name,
      })
      .then((response) => {
        console.log(response);
        localStorage.setItem("name", response.data.user.name);
        localStorage.setItem("email", response.data.user.email);
        localStorage.setItem("token", response.data.user.token);
        emailRef.current.value = null;
        pwdRef.current.value = null;
        nameRef.current.value = null;
        rePwdRef.current.value = null;
        setPwdWarning(false);
        setEmailWarning(false);
        setLoginError(false);
        setRePwdWarning(false);
        setNameWarning(false);
        handleSuccess();
      })
      .catch((err) => {
        setLoginError(true);
        var msg = "";
        try{
          msg = err.response.data.message
        }
        catch(e){
          msg = err.message
        }
        setErrMsg(msg|| "Failed to register");
      });
  }

  return (
    <div name="modal" className={showHideClassName}>
      <div className="modal-mask">
        <div className="modal-wrapper">
          <div className="modal-container">
            <div className="modal-header">
              <h3>REGISTER </h3>
            </div>

            <div className="modal-body">
              <label className="fieldName">Name</label>
              <input ref={nameRef} className="filedValue"></input>
              {nameWarning ? (
                <label className="warning">Please enter your full name</label>
              ) : null}

              <label className="fieldName">Email</label>
              <input ref={emailRef} className="filedValue"></input>
              {emailWarning ? (
                <label className="warning">
                  Please enter a valid email address
                </label>
              ) : null}

              <label className="fieldName">Password</label>
              <input
                ref={pwdRef}
                className="filedValue"
                type="password"
              ></input>
              {pwdWarning ? (
                <label className="warning">Please enter a password</label>
              ) : null}

              <label className="fieldName">Confirm Password</label>
              <input
                ref={rePwdRef}
                className="filedValue"
                type="password"
              ></input>
              {rePwdWarning ? (
                <label className="warning">
                  Please enter the password again
                </label>
              ) : null}

              {showLoginError ? (
                <label className="warning">{errMsg}</label>
              ) : null}
            </div>

            <div className="modal-footer">
              <div className="buttonsContainer">
                <button className="bt grey" onClick={handleAbort}>
                  ABORT
                </button>
                <button className="bt black" onClick={handleRegistration}>
                  REGISTER
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;
