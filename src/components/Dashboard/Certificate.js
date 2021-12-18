import React, { Component } from 'react';
import { Form, FormControl, Spinner, Card } from "react-bootstrap";
import { databasecertificate as database, storage } from "../../config/db";

export default class Certificate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            url: "",
            company: "",
            description: "",
            file: "",
            error: "",
            loading_: false,
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
        database.on('child_removed', snap =>{
            if(this.state.certificate){
                const { [snap.key]: certificate,  ...newCertificate}  = this.state.certificate;
                this.setState({certificate: newCertificate})
            }
        })

    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    changeFile = e => {
        let url = e.target.files[0];
        this.setState({ file: url, error: "" });
    }
    deleteProduct = async (id) => {
        await database.child(id).remove();
     }
    upload = async () => {
        this.setState({ loading: true })
        const random = Math.random().toString(36).slice(2);
        if (this.state.file && this.state.company) {
            await storage.ref(`certificate/${this.state.company}_${random}`).put(this.state.file)
            await storage.ref(`certificate/${this.state.company}_${random}`).getDownloadURL().then((url) => {
                this.setState({ file: "", error: "", loading: false, url: url })
            })
        } else {
            this.setState({ error: "Please choose file first Or write Company name ", loading: false })
        }
    }
    save = async (e) => {
        e.preventDefault();
        this.setState({ loading_: true })
        if (this.state.url && this.state.company && this.state.description) {
            await database.push().set({ company: this.state.company, description: this.state.description, url: this.state.url })
            this.setState({ url: "", error: "", loading_: false })
            document.getElementById("reset-form").reset()
        } else {
            this.setState({ error: "All fields are required! Or please make sure you upload image first ", loading_: false })
        }

    }
    render() {
        const data = [];
        if (this.state.certificate && data.length <1) {
            Object.keys(this.state.certificate).forEach((key) => {
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
                <div className="about-container">
                    <div className="ibarizo_about">
                        <div className="abaut_content">
                            <div className="bg-white w-75  m-auto">
                                <Form
                                    method="POST"
                                    id="reset-form"
                                    className="w-75 pt-5 m-auto"
                                    onSubmit={this.save}
                                >
                                    <div className="text-center text-dark mt-3 mb-3">
                                        <h5>
                                            Upload certificate
                                       </h5>
                                        {
                                            this.state.error && <div class="alert alert-danger" role="alert">
                                                {this.state.error}
                                            </div>
                                        }
                                    </div>
                                    <Form.Group controlId="formGroupCertificate " >
                                        <Form.Label className="text-dark">Company name</Form.Label>
                                        <FormControl
                                            type="text"
                                            name="company"
                                            onChange={this.handleChange}
                                            placeholder="Write a company name" />
                                    </Form.Group>
                                    <Form.Group controlId="formGroupPassword " >
                                        <Form.Label className="text-dark">Description</Form.Label>
                                        <FormControl
                                            as="textarea"
                                            aria-label="With textarea"
                                            name="description"
                                            onChange={this.handleChange}
                                            placeholder="Write a description" />
                                    </Form.Group>
                                    <div className="mb-2">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend" onClick={this.upload} style={{ cursor: "pointer" }}>
                                                <span className="input-group-text">{
                                                    this.state.loading && <Spinner size="sm" animation="border" />
                                                }
                                               Upload
                                            </span>
                                            </div>
                                            <div className="custom-file" >
                                                <input type="file" accept="image/*" onChange={this.changeFile} className="custom-file-input" id="inputGroupFile01" />
                                                <label className="custom-file-label" for="inputGroupFile01">{this.state.file ? this.state.file.name : " Choose file "}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <button type="submit" className="btn btn-info w-50 mb-3">
                                            {
                                                this.state.loading_ && <Spinner size="sm" animation="border" />
                                            }
                                            SAVE</button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mb-5">
                    <div className="text-center mt-5">
                        <h5>All Product</h5>
                    </div>
                    <div className="row mt-4">
                        {
                            data.length > 0 &&
                            data.map((product, index) => {
                                return (<>
                                    {
                                        product && <div className="col-lg-3 col-sm-6 mt-3" key={index}>
                                            <Card>
                                                <Card.Img variant="top" className="w-100 custom-pc" style={{ height: "30vh" }} src={product.url && product.url } />
                                                <Card.Body>
                                                    <Card.Title>{product.company}</Card.Title>
                                                    <Card.Text>
                                                        {product.description}
                                                    </Card.Text>
                                                    <button type="button" class="btn btn-warning w-100" onClick={this.deleteProduct.bind(this, product.id)}>DELETE</button>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    }

                                </>
                                )
                            }).reverse()

                        }
                    </div>
                </div>
            </div>
        )
    }
}
