import React, { Component } from 'react'
import Footer from '../Footer/Footer'
import { Form, Button} from 'react-bootstrap';
import { database, databaseOrder } from "../../config/db";

export default class Order extends Component {
    constructor(props){
        super(props);
        this.state={
            name: '',
            phone: '',
            quantity: '',
            location: '',
            data: '',
            error: ''
        }
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
   async componentWillMount(){
      await database.orderByKey().equalTo(this.props.match.params.id ).once('value', snap =>{
          Object.keys(snap.val()).forEach(key =>{
              this.setState({data: snap.val()[key].data})
          });
      })
    }
    order = async (e) =>{
        e.preventDefault();
          if(this.state.name && this.state.phone && this.state.quantity && this.state.location && this.state.data){
              const data = {
                  name: this.state.name,
                  phone: this.state.phone,
                  quantity: this.state.quantity,
                  location: this.state.location,
                  product_name: this.state.data.product,
                  price: this.state.data.price,
                  url: this.state.data.url
              }
               await databaseOrder.push().set({data})
               document.getElementById("reset-form").reset()
          } else {
              this.setState({error: "All field are required!"})
          }
    }
    render() {
        return (
            <div className="ibarizo_home">
                <div className="container-fluid">
                    <div className="container">
                        <div className="row mt-4">
                            <div className="col-lg-5 pt-5">
                              { this.state.data &&  <img src={this.state.data.url} className="w-100 mt-5" alt="introduct pic" />} 
                              {  this.state.data && 
                                  <div class="alert alert-primary mt-4" role="alert">
                                    Product Name: {this.state.data.product} <span className="ml-5">Price : {this.state.data.price}</span>
                                </div>
                              }
                            </div>
                            <div className="col-lg-7">
                                <div className="p-5">
                            <h2 className="text-center">Complete order</h2>
                            {this.state.error &&
                                    <div class="alert alert-danger" role="alert">
                                        {this.state.error}
                                    </div>
                                }
                            <Form onSubmit={this.order} id="reset-form">
                                <Form.Group controlId="formGroupEmail">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Name" name="name" onChange={this.handleChange} />
                                    </Form.Group>
                                    <Form.Group controlId="formGroupEmail">
                                        <Form.Label>Phone number</Form.Label>
                                        <Form.Control type="text" placeholder="Enter phone number"   name="phone" onChange={this.handleChange}/>
                                    </Form.Group>
                                    <Form.Group controlId="formGroupPassword">
                                        <Form.Label>Quantity</Form.Label>
                                        <Form.Control type="text" placeholder="Quantity"  name="quantity" onChange={this.handleChange} />
                                    </Form.Group>
                                    <Form.Group controlId="formGroupPassword">
                                        <Form.Label>Location </Form.Label>
                                        <Form.Control type="text" placeholder="Location"   name="location" onChange={this.handleChange}/>
                                    </Form.Group>
                                    <Button variant="info" type="submit" className="w-25">Submit</Button>
                                </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
