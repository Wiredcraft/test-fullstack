import React, { useState, useRef } from 'react';
import './AddNewCommentModal.css';
import axios from 'axios';


const AddNewCommentModal = ({ handleClose, handleSuccess, show }) => {
  const showHideClassName = show ? "modal" : "hideModal";

  const [titleWarning, setTitleWarning] = useState(false);
  const [descWarning, setDescWarning] = useState(false);

  const titleRef = useRef();
  const descRef = useRef();


  function handleAbort(e) {
    titleRef.current.value = null;
    descRef.current.value = null;
    setDescWarning(false)
    setTitleWarning(false)
    handleClose()
  }
  function handlePost(e) {
    const title = titleRef.current.value;
    if (title === null || title === undefined || title === "") {
      setTitleWarning(true)
      return
    } else {
      setTitleWarning(false)
    }
    const desc = descRef.current.value;
    if (desc === null || desc === undefined || desc === "") {
      setDescWarning(true);
      return
    } else {
      setDescWarning(false)
    }
    console.log(title);
    console.log(desc);

    axios.post('http://localhost:3001/comment/create', {
      title: title,
      description: desc
    }, {
      headers: {
        Authorization: localStorage.getItem('token')
      },
    })
      .then(comments => {
        titleRef.current.value = null;
        descRef.current.value = null;
        handleSuccess();
      })
  }

  return (
   

        <div name="modal" className={showHideClassName}>
        <div className="modal-mask">
            <div className="modal-wrapper">
                <div className="modal-container" >
                <div className="modal-header">
  <h3 >Add New Comment </h3>
                </div>

                <div className="modal-body">
                    <label className="fieldName">Title</label>
                    <input ref={titleRef} className="filedValue"></input>
                    {
                        titleWarning ?
                        <label className="warning">Please enter a title for the comment</label> : 
                        null
                    }
                    
                
    
                    <label className="fieldName">Description</label>
                    <textarea ref={descRef} className="filedValue desc"></textarea>
                    {
                        descWarning ?
                        <label className="warning">Please enter a description for the comment</label>     : 
                        null
                    }
                    
                </div>

                <div className="modal-footer">
                    <div className="buttonsContainer">
                        <button className="bt grey" onClick={handleAbort}>ABORT</button>
                        <button className="bt black" onClick={handlePost}>POST</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </div>
  );
};

export default AddNewCommentModal;
