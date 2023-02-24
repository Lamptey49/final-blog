import React from 'react'
import Footer from './Footer'
import Header from './Header'

export const Contact = () => {
  return (
    <>
    <Header />
    <div>
        <section className="features-head bg-primary py-3">
            <div className="container grid">
                <div>
                    <h1 className="xl">About Us</h1>
                    <p className="lead">
                        To keep in touch with us, We are available on all social media platforms
                    </p>
                </div>
                <img src="images/server.png" alt=""/>
            </div>
        </section>
        <section className="features-sub-head bg-light py-3">
            <div className="container grid">
                <div>
                    <h1 className="md">The Scopaf Platform</h1>
                    <p className="lead">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos nihil officiis obcaecati sit, deserunt excepturi nostrum libero quos, amet aperiam nemo cumque corporis nobis nisi quis magni ratione quam! Soluta?
                    </p>
                </div>
                
            </div>
        </section>
        <div className="features-main my-2">
            <div className="container grid grid-3">
                <div className="card flex">
                    <i className="fas fa-location fa-3x">
                    </i>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem deserunt vero sint, optio alias ex!</p>
                </div>
            </div>
        </div>
    </div>
    <Footer />
    </>
  )
}
