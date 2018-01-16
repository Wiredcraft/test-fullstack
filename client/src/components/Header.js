import React from 'react';
import '../assets/sass/Header.css'

const Header = (props) =>
  <div className='c-Header'> 
    <h1 className='c-Header__title'>Hacker Talks</h1>
    <button
      className='c-btn'
      onClick={props.onAddClick}
    >
      &#10133; add
    </button>
  </div>

export default Header;
