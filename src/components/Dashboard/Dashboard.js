import React, { Component } from 'react';
import { Form, Button, Spinner } from "react-bootstrap";
import Product from './Product';
import { database, storage } from "../../config/db";
import Order from './Order';
import { Redirect } from "react-router-dom";
import { message } from 'antd';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: '',
            price: '',
            category: '',
            file: '',
            error: '',
            loading: false,
            loading_: false,
            url: ''
        }
        this.register = this.register.bind(this);
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    changeFile = e => {
        let url = e.target.files[0];
        this.setState({ file: url, error: "" });
    }
    async register(e) {
        e.preventDefault();
        this.setState({ loading_: true })
        if (this.state.product && this.state.price && this.state.category && this.state.url) {
            const data = {
                product: this.state.product,
                price: this.state.price,
                category: this.state.category,
                url: this.state.url
            }
            await database.push().set({ data })
            this.setState({  url: "", error: "", loading_: false })
            message.success('Product uploaded successfull!');
            document.getElementById("reset-form").reset()
        } else {
            this.setState({ error: "All fields are required! Or please make sure you upload image first ", loading_: false })
        }

    }
    upload = async () => {
        this.setState({ loading: true })
        if (this.state.file && this.state.product) {
            const random = Math.random().toString(36).slice(2);
            await storage.ref(`product/${this.state.product}_${random}`).put(this.state.file)
            await storage.ref(`product/${this.state.product}_${random}`).getDownloadURL().then((url)=>{
                this.setState({ file: "", error: "", loading: false, url: url })
            })
        } else {
            this.setState({ error: "Please choose file first Or write product name ", loading: false })
        }
    }
    render() {
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user){
            return <Redirect to="/admin" />
        } 
        return (
            <div className="ibarizo_home">
                <div className="container-fluid">
                    <div className="container dashboard_container mt-4">
                        <div className="row">
                            <div className="col-lg-7 col-sm-12">
                                {this.state.error &&
                                    <div class="alert alert-danger" role="alert">
                                        {this.state.error}
                                    </div>
                                }
                                <div>
                                    <Form
                                        method="POST"
                                        onSubmit={this.register}
                                        id="reset-form"
                                    >
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Product</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="product"
                                                onChange={this.handleChange}
                                                placeholder="Enter Product"
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicprice">
                                            <Form.Label>Price</Form.Label>
                                            <Form.Control
                                                name="price"
                                                onChange={this.handleChange}
                                                type="text"
                                                placeholder="Enter Price"
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formBasiccategory">
                                            <Form.Label>Category</Form.Label>
                                            <Form.Control
                                                name="category"
                                                onChange={this.handleChange}
                                                type="text"
                                                placeholder="Enter category"
                                            />
                                        </Form.Group>
                                        <div className="mb-5">
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend" onClick={this.upload} style={{cursor: "pointer"}}>
                                                    <span class="input-group-text">{
                                                        this.state.loading && <Spinner size="sm" animation="border" />
                                                    }
                                                        Upload
                                                        </span>
                                                </div>
                                                <div class="custom-file" >
                                                    <input type="file" accept="image/*" onChange={this.changeFile} class="custom-file-input" id="inputGroupFile01" />
                                                    <label class="custom-file-label" for="inputGroupFile01">{this.state.file ? this.state.file.name : " Choose file "}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <Button variant="primary" className="w-25" type="submit">
                                            {
                                                this.state.loading_ ? <> <Spinner
                                                    as="span"
                                                    animation="grow"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                /> Loading... </>: " Submit"
                                            }
                                        </Button>
                                    </Form>
                                </div>
                            </div>
                            <div className="col-lg-5 col-sm-12" >
                                <Order />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5 mb-5">
                    <Product />
                </div>
            </div>
        )
    }
}
