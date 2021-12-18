import React, { Component } from 'react'
import {  databaseOrder } from "../../config/db";
import{Clear } from '@material-ui/icons';

export default class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: ""
        }
    }

    async componentWillMount() {
        databaseOrder.once("value").then(snap => this.setState({ order: snap.val() }))
        databaseOrder.on("child_added", snap => {
            if (this.state.order) {
                const newOrder = Object.assign(this.state.order, snap.val())
                this.setState({ order: newOrder })
            }
        })
        databaseOrder.on('child_removed', snap =>{
            if(this.state.order){
                const { [snap.key]: Order,  ...newOrder}  = this.state.order;
                this.setState({order: newOrder})
            }
        })
    }
    deletetrainer = async (id) => {
        await databaseOrder.child(id).remove();
     }
    render() {
        const data = [];
        if (this.state.order) {
            Object.keys(this.state.order).forEach((key) => {
                this.state.order[key].data ?
                    data.push({
                        id: key,
                        name: this.state.order[key].data.name,
                        phone: this.state.order[key].data.phone,
                        quantity: this.state.order[key].data.quantity,
                        location: this.state.order[key].data.location,
                        product_name: this.state.order[key].data.product_name,
                        price: this.state.order[key].data.price,
                        url: this.state.order[key].data.url
                    }
                    ) : data.push(this.state.order.data)

            });
        }
        return (
            <div className="pl-5">
                <h6 className="pb-3">Placed Order</h6>

                {
                    data.length > 0 &&
                    data.map((order, index) => {
                        return (
                            < >
                                {
                                    order && <>
                                        <p key={index}>
                                            <a data-toggle="collapse" href={`#collapseExample${index}`} role="button" aria-expanded="false" aria-controls={`collapseExample${index}`}>
                                                <div class="alert alert-success" role="alert">
                                                    {order.name} From {order.location} want  {order.product_name}
                                                </div>
                                            </a>
                                        </p>
                                        <div class="collapse" id={`collapseExample${index}`}>
                                            <div class="card card-body mb-3">
                                                <div className="row">
                                                    <div className="col-lg-4">
                                                        <img src={order.url} className="w-100" alt="introduct pic" />
                                                        <button type="button" class="btn btn-warning w-100" onClick={this.deletetrainer.bind(this, order.id)}><Clear/></button> 
                                                    </div>
                                                    <div className="col-lg-8">
                                                        Name: {order.name}<br />
                                                        Phone: {order.phone}<br />
                                                        Location: {order.location}<br />
                                                        Product: {order.product_name}<br />
                                                        Quantity: {order.quantity}<br />
                                                        Price: {order.price}<br />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }

                            </>
                        )
                    })
                }

            </div>
        )
    }
}
