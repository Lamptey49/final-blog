import React from 'react'

export default function Footer() {
  return (
    <div className="footer bg-dark py-5" >
        <div className="container grid grid-3">
            <div>
                <h1>ScopAf</h1>
                <p>Copyright &copy; {new Date().getFullYear()}</p>
            </div>
            <nav>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="features.html">Contact</a></li>
                    
                </ul>
            </nav>
            <div className="social">
                <a href="/"><i className="fab fa-github fa-2x"></i></a>
                <a href="/"><i className="fab fa-facebook fa-2x"></i></a>
                <a href="/"><i className="fab fa-instagram fa-2x"></i></a>
                <a href="/"><i className="fab fa-twitter fa-2x"></i></a>
            </div>
        </div>
    </div>
  )
}
