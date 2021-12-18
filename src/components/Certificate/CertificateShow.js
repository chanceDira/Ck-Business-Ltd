import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from "react-router-guard";
import { databasecertificate as database } from "../../config/db";

export default class CertificateShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            certificate: ""
        }
    }
    async componentWillMount() {
        database.once("value").then(snap => this.setState({ certificate: snap.val() }))
        database.on("child_added", snap => {
            if (this.state.certificate) {
                const newCertificate = Object.assign(this.state.certificate, snap.val())
                this.setState({ certificate: newCertificate })
            }
        })

    }
    render() {
        const data = [];
        if (this.state.certificate) {
            Object.keys(this.state.certificate).forEach((key, index) => {
                this.state.certificate[key] ?
                    data.push({
                        id: key,
                        company: this.state.certificate[key].company,
                        description: this.state.certificate[key].description,
                        url: this.state.certificate[key].url
                    }
                    ) : data.push(this.state.certificate)
            });
        }

        return (
            <div>
                    <div class="row">
                        {
                            data.length > 0 &&
                            data.map((cert, index) => {
                                return (
                                    <div class="col-lg-3 col-sm-6  mt-2" key={index}>
                                        <Card >
                                            <Card.Img variant="top" src={cert.url} className="custom-pc"/>
                                            <Card.Body>
                                                <Card.Title>{cert.company}</Card.Title>
                                                <Card.Text>
                                                    {cert.description}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                )
                            })
                        }
                    </div>
                <div className="d-flex justify-content-center mt-5 mb-5">
                    <Button className="custom_button w-50" > <Link to="/trainer"> Register as Trainee </Link> </Button>
                </div>
            </div>
        )
    }
}
