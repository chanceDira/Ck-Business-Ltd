import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { database } from "../../config/db";
import { Link } from "react-router-guard"
import Skeleton from 'react-loading-skeleton';


export default class ProductShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: "",
            data: []
        }
    }

    async componentWillMount() {
        const data = this.state.data;
        database.on("child_added", snap => {
            data.push({
                id: snap.key,
                product: snap.val().data.product,
                price: snap.val().data.price,
                url: snap.val().data.url,
                category: snap.val().data.category
            }) 
            this.setState({ data: data })
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="container">
                    <div className="text-center mt-3">
                        <h1>
                            Product Show
                        </h1>
                    </div>
                    <div className="row mt-5">
                        {
                            this.state.data.length > 0 ?
                                this.state.data.map((product, index) => {
                                    return (<>
                                        {
                                            product && <div className="col-lg-4 col-sm-6  mt-3" key={index}>
                                                <Card>
                                                    <Card.Img variant="top" className="w-100 custom-pc" src={product.url ? product.url : "https://cdn.pixabay.com/photo/2015/06/19/21/33/beach-815303_960_720.jpg"} />
                                                    <Card.Body>
                                                        <Card.Text>
                                                            Product name: {product.product} <br /> Category:  {product.category} <br /><span > Price: {product.price}</span>
                                                        </Card.Text>
                                                        <button type="button" class="btn btn-info  w-100"><Link to={`/order/${product.id}`}> MAKE ORDER </Link></button>
                                                    </Card.Body>
                                                </Card>
                                            </div>
                                        }
                                    </>
                                    )
                                }).slice(this.state.data.length-6, this.state.data.length).reverse()
                                :
                                <>
                                    <div className="col-lg-4 mt-3">
                                        <Skeleton count={1} height={200} width={300} className="ml-2 mt-3" />
                                    </div>
                                    <div className="col-lg-4 mt-3">
                                        <Skeleton count={1} height={200} width={300} className="ml-2 mt-3" />
                                    </div>
                                    <div className="col-lg-4 mt-3">
                                        <Skeleton count={1} height={200} width={300} className="ml-2 mt-3" />
                                    </div>
                                    <div className="col-lg-4 mt-3">
                                        <Skeleton count={1} height={200} width={300} className="ml-2 mt-3" />
                                    </div>
                                    <div className="col-lg-4 mt-3">
                                        <Skeleton count={1} height={200} width={300} className="ml-2 mt-3" />
                                    </div>
                                    <div className="col-lg-4 mt-3">
                                        <Skeleton count={1} height={200} width={300} className="ml-2 mt-3" />
                                    </div>
                                </>
                        }
                    </div>
                    <div className="d-flex justify-content-center mt-5 mb-5">
                        <Button className="custom_button w-50" > <Link to="/product"> View More products </Link> </Button>
                    </div>
                </div>
            </div>
        )
    }
}
