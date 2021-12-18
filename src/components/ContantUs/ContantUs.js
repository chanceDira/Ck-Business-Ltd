import React, { Component } from 'react';
import { Form, Button, FormControl, Spinner } from 'react-bootstrap';
import Footer from '../Footer/Footer';
import { LocationOn } from "@material-ui/icons";
import { databaseContact as database } from "../../config/db";

export default class ContantUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            message: '',
            error: '',
            loading: false,
        }
    }
    componentWillMount(){
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value, error: "" });
    }
    send = async (e) => {
        e.preventDefault();
        this.setState({ loading: true })
        if (this.state.name && this.state.email && this.state.phone && this.state.message) {
            await database.push().set({
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone,
                message: this.state.message,
            })
            this.setState({loading: false})
            document.getElementById("reset-form").reset()
        } else {
            this.setState({ error: "All fields are required! ", loading: false })
        }
    }
    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="container ibarizo_home">
                        <div className="row mt-5 mb-5">
                            <div className="col-lg-6">
                                <div>
                                    <h2> <LocationOn className="text-info mr-2" />Address</h2><br/>
                                         <h4> Company’s Office </h4>
                                        Gasabo District<br/>
                                        Gisozi Sector<br/>
                                        Cell of Musezero (Agakinjiro)<br/>
                                        Samantha House, 2nd Floor<br/><br/>
                                        <h4>  Workshop location </h4>
                                        Gasabo District<br/>
                                        Gisozi Sector<br/>
                                        Cell of Musezero (Agakinjiro)<br/>
                                        Behind of Umukindo Complex 

                                </div>

                            </div>
                            <div className="col-lg-6">
                                <h2>Contact us</h2>
                                {this.state.error &&
                                    <div class="alert alert-danger" role="alert">
                                        {this.state.error}
                                    </div>
                                }
                                <Form
                                    method="POST"
                                    onSubmit={this.send}
                                    id="reset-form"
                                >

                                    <Form.Group controlId="formGroupEmail">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            onChange={this.handleChange}
                                            placeholder="Enter Name" />
                                    </Form.Group>
                                    <Form.Group controlId="formGroupEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            onChange={this.handleChange}
                                            placeholder="Enter email" />
                                    </Form.Group>
                                    <Form.Group controlId="formGroupPassword">
                                        <Form.Label>Whatsapp</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="phone"
                                            onChange={this.handleChange}
                                            placeholder="Whatsapp number" />
                                    </Form.Group>
                                    <Form.Group controlId="formGroupPassword">
                                        <Form.Label>Message</Form.Label>
                                        <FormControl
                                            as="textarea"
                                            name="message"
                                            onChange={this.handleChange}
                                            aria-label="With textarea"
                                            placeholder="Write a message" />
                                    </Form.Group>
                                    <Button variant="info" type="submit" className="w-50">
                                        {
                                            this.state.loading ? <> <Spinner
                                                as="span"
                                                animation="grow"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            /> Loading... </> : " Send"
                                        }
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
