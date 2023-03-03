import React from 'react'
import Footer from './Footer'
import Header from './Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlasses, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
export const Contact = () => {
  return (
    <>
    <Header />
    <div>
        <section className="features-head bg-primary py-3">
            <div className="container grid">
            <FontAwesomeIcon icon={faInfoCircle} className='fa-5x' width='200px' />
                <div>
                    <h1 className="xl">About Us</h1>
                    <p className="lead">
                    Scopaf is an acronym for Scope Africa, a subsidiary and product of Kiriikou Company Limited. Scopaf is designed and intended to provide to the outside world a holistic view and scope of the African continent in terms of what it produces, and while doing so, giving African SMEs involved in manufacturing an opportunity to showcase their products globally and have access to international clients and markets.
                    </p>
                </div>
                
                
            </div>
        </section>
        <section className="features-sub-head bg-light py-3">
            <div className="container grid">
            <FontAwesomeIcon icon={faGlasses} className='fa-5x' width={'200px'}/>
                <div>
                    <h1 className="md">MISSION:</h1>
                    <p className="lead">
                        - Be a source of credible and relevant information as it relates to the manufacturing industry in Africa. <br /> 
                        - Provide to African manufacturing SMEs educational and relevant content that enhances their business. <br />
                        - Contribute as much as possible to the elevation of African industry using the tool of ICT. <br />
                    </p>
                </div>
                
            </div>
        </section>
        <div className="features-main my-2">
            <div className="container grid grid-3">
                <div className="card flex">
                    <i className="fas fa-location fa-5x">
                    </i>
                    <p>
                        <address>
                            <b>ADDRESS: </b><br/>
                            <strong>
                                No. 2 Pumba street, <br />
                                Adenta, <br />
                                Accra Ghana <br /><br />
                            </strong> 
                            <b>Phone number: <br />
                            +233 (0) 20 637 4754</b>
                        </address>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <Footer />
    </>
  )
}
