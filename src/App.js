import React from 'react';
import './App.css';
import LightningTalk from './components/lightning-talk-component.js'
import Form from './components/form.js'

// initialized lightningTalk object and returned lightningTalk component. It is displayed as App is exported to index where an HTML ID is selected. LightningTalk (the class) passes the properties (props) of lightningTalk from the child component

function App() {
  const lightningTalk = {
    title: 'Some title',
    description: 'Some description'
  }
  return (
    <div>
      < Form />
      < LightningTalk lightningTalk={lightningTalk} />
    </div>
  )
}

export default App;
