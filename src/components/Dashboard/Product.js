import React, { Component } from 'react'
import { database } from "../../config/db";
import { Card } from 'react-bootstrap';

export default class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: ""
        }
    }

    async componentWillMount() {
        database.once("value").then(snap => this.setState({ product: snap.val() }))
        database.on("child_added", snap => {
            if (this.state.product) {
                const newProduct = Object.assign(this.state.product, snap.val())
                this.setState({ product: newProduct })
            }
        })
        database.on('child_removed', snap =>{
            if(this.state.product){
                const { [snap.key]: product,  ...newProduct}  = this.state.product;
                this.setState({product: newProduct})
            }
        })
    }
    deleteProduct = async (id) => {
       await database.child(id).remove();
    }
    render() {
        const data = [];
        if (this.state.product){
             Object.keys(this.state.product).forEach((key) => {
                this.state.product[key].data ? 
                  data.push({
                    id: key,
                    product: this.state.product[key].data.product,
                    price: this.state.product[key].data.price,
                    url: this.state.product[key].data.url
                  }
                ) : data.push(this.state.product.data)

                });
        }
         
        return (
            <div className="container">
                <div className="text-center mt-5">
                    <h5>All Product</h5>
                </div>
                <div className="row mt-4">
                    {
                        data.length > 0 &&
                        data.map((product, index) => {
                            return ( <>
                            {
                                   product &&<div className="col-lg-3 col-sm-6 mt-3" key={index}>
                                    <Card>
                                        <Card.Img variant="top" className="w-100 custom-pc"  src= {product.url ? product.url : "https://cdn.pixabay.com/photo/2015/06/19/21/33/beach-815303_960_720.jpg"} />
                                        <Card.Body>
                                            <Card.Text>
                                                Product name: { product.product} <br/><span> Price: {product.price}</span>
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
        )
    }
}