import React, { Component } from 'react'
import Gallery from 'react-grid-gallery';
import Footer from '../Footer/Footer';
import { database } from "../../config/db";

export default class Galler extends Component {
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
    render() {
        const data = [];
        console.log(this.state.product);
        if (this.state.product){
             Object.keys(this.state.product).forEach((key) => {
                this.state.product[key].data ? 
                  data.push({
                    id: key,
                    product: this.state.product[key].data.product,
                    price: this.state.product[key].data.price,
                    url: this.state.product[key].data.url,
                    category: this.state.product[key].data.category
                  }
                ) : data.push(this.state.product.data)

                });
        }
        const IMAGES = data.map(product => {
            return {
                src: product.url,
                thumbnail: product.url,
                thumbnailWidth: 320,
                thumbnailHeight: 212,
                tags: [{ value: product.category, title: product.category}],
                caption: `${product.product} for ${product.category}`
            }
        })
        return (
            <div>
            <div className="container-fluid">
                <div className="container">
                    <div className="ibarizo_home ">
                        <div className="mt-5">
                           <Gallery images={IMAGES} />    
                        </div>
                    </div>
                </div>
            </div>
            <div style={{marginTop: "100%"}}>
            <Footer/>
            </div>
            </div>

        )
    }
}
