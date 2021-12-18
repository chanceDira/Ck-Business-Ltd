import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from "react-router-guard";
import log from "../../Assets/cucuwe.png";

export default class Navigation extends Component {
    render() {
        return (
            <div className="ibarizo-navBar">
                <div className="container-fluid">
                    <div className="container">
                        <Navbar expand="lg">
                            <Navbar.Brand href="#home"><Link to="/"><img src={log} alt="ibarizo" /></Link></Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="nav-top">
                                    <Nav.Link href="#home" className="mr-2"><Link to="/">Home</Link></Nav.Link>
                                    <Nav.Link href="#link" className="mr-2"><Link to="/about">About us</Link></Nav.Link>
                                    <Nav.Link href="#home" className="mr-2"><Link to="/gallery">Gallery</Link></Nav.Link>
                                    <Nav.Link href="#link" className="mr-2"><Link to="/product">Products</Link> </Nav.Link>
                                    <Nav.Link href="#link" className="mr-2"><Link to="/contact">Contact Us</Link></Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                </div>
            </div>
        )
    }
}
