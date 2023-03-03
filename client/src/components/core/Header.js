import React from 'react'
import logo from '../../assets/images/logo.png'

function Header() {
  return ( 
<div className="navbar">
  <div className="container flex">
      <a className='logo' href='/'>
        <img src={logo} alt='scopaf' />
        {/* ScopAf */}
      </a>
    <nav>
        <ul>
            <li><a href="/contact">About Us</a></li>
        </ul>
    </nav>
  </div>
  </div>
  )
}

export default Header