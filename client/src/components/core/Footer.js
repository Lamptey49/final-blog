import React from 'react'

export default function Footer() {
  return (
    <div className="footer bg-dark py-5" >
        <div className="container grid grid-3">
            <div>
                <h1><a href='/'>ScopAf</a></h1>
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
                <a href="https://instagram.com/kiriikoub2b?igshid=YmMyMTA2M2Y="><i className="fab fa-instagram fa-2x"></i></a>
                <a href="https://twitter.com/kiriikou_b2b"><i className="fab fa-twitter fa-2x"></i></a>
            </div>
        </div>
    </div>
  )
}
