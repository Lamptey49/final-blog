import React from 'react'
import logo from '../../assets/images/logo.png'

function Header() {
  return ( 
<div className="navbar">
  <div className="container flex">
      <p className='logo'>
        <img src={logo} alt='scopaf' />
        {/* ScopAf */}
      </p>
    <nav>
        <ul>
            <li><a href="/">Contact</a></li>
        </ul>
    </nav>
  </div>
  </div>
  )
}

export default Header