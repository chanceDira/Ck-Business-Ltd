import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { database } from "../../config/db";
import Footer from '../Footer/Footer';
import { Link } from "react-router-guard";
import Skeleton from 'react-loading-skeleton';


export default class AllProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: "",
            search: "",
            data: [],
            searched: []
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

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    search = (e) => {
        e.preventDefault();
        var pattern = this.state.search.toLowerCase().split("").map((x, index) => {
            return x;
        }).slice(0, 4).join("");
        let newPattern = `(?=.*${pattern})`
        const regex = new RegExp(`${newPattern}`, 'g');
        const searched = this.state.data.filter((reg) => {
            return reg?.product.toLowerCase().match(regex);
        }).slice(0, 6);
        this.setState({ searched: searched })
    }

    render() {

        return (
            <div className="ibarizo_home">
                <div className="text-center about-container" >
                    <div className="seach_content">
                        <h1 className="pt-5 text-white pb-4">
                            All available product in differrent category
                        </h1>
                        <div class="input-group mb-3 w-75 pb-4 m-auto">
                            <input
                                type="text"
                                class="form-control"
                                name="search"
                                onChange={this.handleChange}
                                placeholder="Search product"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                            />
                            <div class="input-group-append" onClick={this.search}>
                                <span class="input-group-text" id="basic-addon2"> Search </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="container">
                        <div className="row mt-5">
                            {
                                this.state.data.length > 0
                                    ? this.state.searched.length > 0 ?
                                        this.state.searched.map((product, index) => {
                                            return (<>
                                                {
                                                    product && <div className="col-lg-4 mt-3" key={index}>
                                                        <Card>
                                                            <Card.Img variant="top" className="w-100 custom-pc" src={product.url ? product.url : "https://cdn.pixabay.com/photo/2015/06/19/21/33/beach-815303_960_720.jpg"} />
                                                            <Card.Body>
                                                                <Card.Text>
                                                                    Product name: {product.product} <br /> Category:  {product.category} <br /><span > Price: {product.price}</span>
                                                                </Card.Text>
                                                                <button type="button" class="btn btn-info w-50"><Link to={`/order/${product.id}`}> MAKE ORDER </Link></button>
                                                            </Card.Body>
                                                        </Card>
                                                    </div>
                                                }
                                            </>
                                            )
                                        })
                                        :
                                        this.state.data.map((product, index) => {
                                            return (<>
                                                {
                                                    product && <div className="col-lg-4 mt-3" key={index}>
                                                        <Card>
                                                            <Card.Img variant="top" className="w-100 custom-pc" src={product.url ? product.url : "https://cdn.pixabay.com/photo/2015/06/19/21/33/beach-815303_960_720.jpg"} />
                                                            <Card.Body>
                                                                <Card.Text>
                                                                    Product name: {product.product} <br /> Category:  {product.category} <br /><span > Price: {product.price}</span>
                                                                </Card.Text>
                                                                <button type="button" class="btn btn-info w-50"><Link to={`/order/${product.id}`}> MAKE ORDER </Link></button>
                                                            </Card.Body>
                                                        </Card>
                                                    </div>
                                                }
                                            </>
                                            )
                                        }).reverse() :
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
                                    </>
                            }
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
