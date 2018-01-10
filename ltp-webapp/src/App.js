import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <h1 className="app-title">Lighting Talk Polling</h1>
        <div className="app-topics">
          <div className="app-topic">
            <div className="app-topic-holder">
              <h2 className="app-topic-title">Topic 1</h2>
              <p className="app-topic-desc">Topic 1 content</p>
              <p className="app-topic-username">by Bain at 5 minutes ago</p>
            </div>
            <div className="app-topic-operation">
              <button>＋1</button>
              <div className="app-topic-score">10000</div>
              <button>－1</button>
            </div>
          </div>
          <div className="app-topic">
            <div className="app-topic-holder">
              <h2 className="app-topic-title">Topic 2</h2>
              <p className="app-topic-desc">Topic 1 content</p>
              <p className="app-topic-username">by Bain at 01月09日21:24:15</p>
            </div>
            <div className="app-topic-operation">
              <button>＋1</button>
                <div className="app-topic-score">10000</div>
              <button>－1</button>
            </div>
          </div>
          <div className="app-topic">
            <div className="app-topic-holder">
              <h2 className="app-topic-title"><a href="">Topic 3</a></h2>
              <p className="app-topic-desc">Topic 1 content</p>
              <p className="app-topic-username">by Bain at 01月09日21:24:15</p>
            </div>
            <div className="app-topic-operation">
              <button>＋1</button>
              <div className="app-topic-score">999</div>
              <button>－1</button>
            </div>
          </div>
          <div className="app-topic">
            <div className="app-topic-holder">
              <h2 className="app-topic-title">Topic 4</h2>
              <p className="app-topic-desc">Topic 1 content</p>
              <p className="app-topic-username">by Bain at 01月09日21:24:15</p>
            </div>
            <div className="app-topic-operation">
              <button>＋1</button>
              <div className="app-topic-score">10000</div>
              <button>－1</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
