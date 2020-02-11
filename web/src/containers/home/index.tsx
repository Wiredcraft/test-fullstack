import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import fetch from 'isomorphic-unfetch';
import _ from 'lodash';
import {Poll} from '../../components/poll';
import { SERVER_PATH } from '../../config';
 
function Home():JSX.Element {
  let history = useHistory();
  const [socket, setSocket] = useState();
  const [list, setList] = useState([]);
  const [isUpdate, setIsUpdate] = useState(0);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    getPolls();
    connectWebsocket();
  }, [isUpdate]);

  async function getPolls() {
    const options = {
      "sort": {
        "poll": -1
      },
      "limit": 0,
      "page": 1,
      "populate": "desc"
    };
    const res = await fetch(`${SERVER_PATH}polls?query=${JSON.stringify(options)}`);
    const data = await res.json();
    setList(data.data);
  }

  async function deletePoll(id) {
    const res = await fetch(`${SERVER_PATH}polls/${id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    if(data._id === id) {
      sendToWebsocket({
        event: 'events',
        data: 'delete',
      });
    } else {
      alert('delete fail');
    }
  }


  async function votePoll(id, poll) {
    const res = await fetch(`${SERVER_PATH}polls/${id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        poll
      }),
    });
    const data = await res.json();
    if(data._id === id) {
      alert('vote success');
      sendToWebsocket({
        event: 'events',
        data: 'vote',
      });
    } else {
      alert('vote fail');
    }
  }

  function sendToWebsocket(params) {
    if(socket.readyState === 1) {
      setDisable(false);
      socket.send(
        JSON.stringify(params),
      );
    } else {
      setDisable(true);
      setTimeout(() => {
        setDisable(socket.readyState !== 1);
      }, 4000);
    }
  }

  function connectWebsocket() {
    const ws = new WebSocket('ws://localhost:8080');
    setSocket(ws);
    ws.onopen = function() {
      ws.send(
        JSON.stringify({
          event: 'events',
          data: 'init',
        }),
      );
      ws.onmessage = function(res) {
        const data = JSON.parse(res.data);
        if(data.data !== 'init'){
          setIsUpdate(isUpdate + 1)
        }
      };
      
      ws.onclose = () => {
        console.log('not Connected');
      }
    };
  }

  function onDeletePoll(e) {
    const id = e.target.getAttribute('id');
    deletePoll(id);
  }

  function onVotePoll(e) {
    const id = e.target.getAttribute('id');
    let poll = e.target.getAttribute('value') || 0;
    poll = parseInt(poll) + 1;
    votePoll(id, poll);
  }

  if(list && list.length > 0) {
    return (
      <div className="mod-polls">
        <Link to="/addPost">add a post</Link>
        {
          list.map((item: {_id: string}) => (
            <Poll 
              key={item._id}
              dataSource={item}
              isAdmin={true}
              disable={disable}
              onVote={onVotePoll}
              onDelete={onDeletePoll}
            ></Poll>
          ))
        }
      </div>
    );
  } else {
    return (
      <div className="mod-empty">
        <p>no data, you could add one</p>
        <Link to="/addPost">add a post</Link>
      </div>
    )
  }
}

export default Home;
