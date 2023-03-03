import React from 'react'
import scopaf from '../../assets/images/logo.png'
export default function Footer() {
  return (
    <div className="footer bg-dark py-5" >
        <div className="container grid grid-3">
            <div>
                <h1><a className='logo' href='/'><img src={scopaf} alt='logo' /></a></h1>
                <p>Copyright &copy; {new Date().getFullYear()}</p>
            </div>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/contact">Contact</a></li>
                    
                </ul>
            </nav>
            <div className="social">
                <a href="http://facebook.com/kiriikoub2b?mibextid=LQQJ4d"><i className="fab fa-facebook fa-2x"></i></a>
                <a href="https://instagram.com/scopaf_b2b?igshid=YmMyMTA2M2Y="><i className="fab fa-instagram fa-2x"></i></a>
                <a href="https://twitter.com/scopaf_b2b"><i className="fab fa-twitter fa-2x"></i></a>
            </div>
        </div>
    </div>
  )
}
