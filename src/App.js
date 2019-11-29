import React from 'react';
import './App.css';
import LightningTalk from './components/lightning-talk-component.js';
import Form from './components/form.js';

// initialized state of App to hold an empty lightningTalks compoennt. componentDidMount sets its state depends
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lightningTalks: []
    };
  }

// componentDidMount is called and sets the state of the lightningTalks array in constructor(props)
componentDidMount = () => {
  fetch("http://localhost:3000/talks.json")
  .then(response => response.json())
  .then((data) => {
      this.setState((state) => {
        return {
          lightningTalks: data
        };
      });
    });
  }
  // now the state of lightning talks depends on what is on the API. Below there is a loop(.map) which is set by componentDidMount
  render() {
    return (
      <div>
        <Form />
          <div className="talks">
            {this.state.lightningTalks.map((talk) => {
              return <LightningTalk lightningTalk={talk} />
            })}
          </div>
       </div>
    )
  }
}

export default App;
