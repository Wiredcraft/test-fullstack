import React from 'react';

const Header = (props) =>
  <div className='c-Header'> 
    <h1>Hacker Talks</h1>
    <button onClick={props.onAddClick}>add talk</button>
  </div>

export default Header;
