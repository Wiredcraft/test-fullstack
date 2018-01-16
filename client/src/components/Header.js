import React from 'react';
import { Link } from 'react-router-dom'
import '../assets/sass/Header.css'

const Header = (props) =>
  <div className='c-Header'> 
    <h1 className='c-Header__title'>
      <Link to='/'>Hacker Talks</Link>
    </h1>
    <Link
      className='c-btn'
      to='/add'
    >
      &#10133; add
    </Link>
  </div>

export default Header;
