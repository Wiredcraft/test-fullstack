import React, { Component } from 'react';

class App extends Component {
  state = {data: []}
  componentDidMount() {
    fetch('/api/lightingTalks', {method: 'GET'})
      .then(res => res.json())
      .then(data => {
        this.setState({ data })
        console.log(data)
      });
  }

  render() {
    return (
      <div className='App'>
        <h1>data</h1>
        {
          this.state.data.map(user => (<span key={user.id}>
            <div>userName: {user.username}</div>
            <div>title: {user.username}</div>
            <div>description: {user.description}</div>
            <hr />
          </span>))
        }
      </div>
    );
  }
}

export default App