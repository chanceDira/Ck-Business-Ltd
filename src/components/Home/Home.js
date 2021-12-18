import React, { Component } from 'react';
import Slideshow from '../SlideShow/SlideShow';
import ProductShow from '../ProductShow/ProductShow';
import Footer from '../Footer/Footer';
import CertificateShow from "../Certificate/CertificateShow"


export default class Home extends Component {
    render() {
        return (
            <div className="ibarizo_home">
                <Slideshow />
                <div className="container-fluid">
                    <div className="container">
                        <div className="text-center mt-3">
                            <h1>C.K Business</h1>
                        </div>
                        <div className="row mt-4">
                            <div className="col-lg-5">
                                <img src="https://cdn.pixabay.com/photo/2016/11/21/12/59/couch-1845270_960_720.jpg" className="w-100" alt="introduct pic" />
                            </div>
                            <div className="col-lg-7">
                                
                                <h6> Executive Summary </h6>
                                C.K Business Ltd is a domestic company registered by Rwandan commercial law from
                                2015 under company cod No 103515995. It’s owned to KAMBABAZI CHARLOTTTE
                                whom is the solely shareholder of the company. The company has been started by an ideal
                                focusing to create job in the purpose against the jobless by searching solutions and
                                defeating disability’s understanding.<br/><br/>
                                <h6>Vision</h6>
                                To become a leading company in furniture industry, electrical and electronics.<br/><br/>

                               <h6>Mission statement</h6> 
                                <p>
                                Producing quality innovative furniture, import and installation of electrical and electronics
                                stuffs 
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <ProductShow />
                <CertificateShow />
                <Footer />
            </div>
        )
    }
}
