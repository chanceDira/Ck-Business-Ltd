import React, { Component } from 'react';
import { Card, Button, Dropdown } from 'react-bootstrap';
import { Link } from "react-router-guard"
import {Facebook, Instagram, Twitter, YouTube} from "@material-ui/icons"
export default class Footer extends Component {

     
    
    render() {
        // document.body.scrollTop = 0; // For Safari
        // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        return (
            <div className="container-fluid footer_container">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <Card className="text-center custom_card">
                                <Card.Body>
                                    <Card.Title>C.K Business is here for you!</Card.Title>
                                    <Card.Text>
                                       Any idea to share with C.K business
                                    </Card.Text>
                                    <Button className="custom_button"><Link to="/contact"> Get in Touch </Link></Button>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
                <div className="container mb-5">
                    <div className="row">
                        <div className="col-lg-4">
                            <h4 className="text-white mb-4">QUICK LINKS</h4>
                            <a href="/about" className="text-white"><h5 className="text-white">About Us</h5></a>
                            <a href="/product" className="text-white"><h5 className="text-white">Product Show</h5></a>
                            <a href="/gallery" className="text-white"><h5 className="text-white">Gallery</h5></a>
                        </div>
                        <div className="col-lg-4">
                            <h4 className="text-white mb-4">CONTACT US</h4>
                            <a href="#about" className="text-white"><h5 className="text-white">Whatsapp: +250788613986</h5></a>
                            <a href="#help" className="text-white"><h5 className="text-white">Tel: +250788856443</h5></a>
                            <a href="#feedbacks" className="text-white"><h5 className="text-white">E-mail: ckbusinessltd3@gmail.com</h5></a>
                        </div>
                        <div className="col-lg-4 text-white">
                            <h4 className="text-white mb-4">FOLLOW US</h4>
                            <Facebook />
                            <Instagram className="ml-2"/>
                            <Twitter className="ml-2"/>
                            <YouTube className="ml-2"/>
                        </div>
                    </div>
                </div>
                <div className="pt-5 text-white pb-2">
                    <Dropdown.Divider />
                    <p>Copyright © 2020 C.K Business Reserved. Developed by <a href="https://github.com/chanceDira" >Chance Desire IRADUKUNDA</a></p>
                </div>
            </div>
        )
    }
}
