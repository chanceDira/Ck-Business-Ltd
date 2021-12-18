import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from "react-router-guard"
import { Redirect } from "react-router-dom";

export default class Navigation extends Component {
    render() {
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user){
            return <Redirect to="/login" />
        }
        return (
            <div className="ibarizo-navBar">
                <div className="container-fluid">
                    <div className="container">
                        <Navbar expand="lg">
                             <Navbar.Brand href="#home">Welcome Again </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="nav-top " style={{marginRight: '10%'}} >
                                <Nav.Link href="#link" className="mr-2" ><Link to="/dashboard/product">Product</Link></Nav.Link>
                                    <Nav.Link href="#link" className="mr-2" ><Link to="/dashboard/trainer">Trainer</Link></Nav.Link>
                                    <Nav.Link href="#link" className="mr-2" ><Link to="/dashboard/certificate">Certificate</Link></Nav.Link>
                                    <Nav.Link href="#link" className="mr-2" ><Link to="/dashboard/message/id">Message</Link></Nav.Link>
                                    <Nav.Link href="#link" className="mr-2" ><Link to="/" onClick={()=> localStorage.removeItem('user')}>Logout</Link></Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                </div>
            </div>
        )
    }
}
