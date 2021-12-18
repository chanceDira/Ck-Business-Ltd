import React, { Component } from 'react';
import { databaseContact as database } from "../../config/db";
import { Link, history } from 'react-router-guard';

export default class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ""
        }
        this.activateNavItem = this.activateNavItem.bind(this);
        this.active = this.active.bind(this);
    }
    async componentWillMount() {
        this.activateNavItem();
        database.once("value").then(snap => this.setState({ message: snap.val() }))
        database.on("child_added", snap => {
            if (this.state.message) {
                const newMessage = Object.assign(this.state.message, snap.val())
                this.setState({ message: newMessage })
            }
        })
    }
    componentDidUpdate() {
        this.activateNavItem();
    }
    activateNavItem() {
        const links = document.querySelectorAll('#sideNavv');

        links.forEach(el => {
            const path = el.children[0].getAttribute('href');
            if (path === history.location.pathname)
                el.classList.add('ussd_message_active');
            else
                el.classList.remove('ussd_message_active')
        });
    }
    active() {
        this.activateNavItem();
    }
    render() {
        const data = [];
        if (this.state.message) {
            Object.keys(this.state.message).forEach((key) => {
                this.state.message[key] ?
                    data.push({
                        id: key,
                        name: this.state.message[key].name,
                        email: this.state.message[key].email,
                        phone: this.state.message[key].phone,
                        message: this.state.message[key].message
                    }
                    ) : data.push(this.state.message)

            });
        }
        return (
            <div className="ibarizo_home">
                <div className="container-fluid">
                    <div className="container dashboard_container mt-4">
                        <div className="row">
                            <div className="col-lg-4  col-sm-6 border-right  pt-5">
                                <div className="mt-3">
                                    {
                                        data.length > 0 &&
                                        data.map((message, index) => {
                                            return (
                                                <div className="ussd_message_active" id="sideNavv" key={index}>
                                                    <Link to={`/dashboard/message/${message.id}`} className="text-dark">
                                                        <div>
                                                            <h5>{message.name}</h5>

                                                            <p>{message.message.slice(0, 30)}...</p>
                                                        </div>
                                                        <div class="dropdown-divider"></div>
                                                    </Link>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="col-lg-8 col-sm-6 p-3">
                                {
                                    data.length > 0 &&
                                    data.map((message, index) => {
                                        return (
                                            <div>
                                                {
                                                    this.props.match.params.id === message.id &&
                                                    <>
                                                        <div>
                                                            <h4>{message.name}</h4>
                                                            <p>{message.email}, {message.phone}</p>
                                                        </div>
                                                        <div class="dropdown-divider"></div>
                                                        <div class="alert alert-primary mt-5" role="alert">
                                                            {message.message}
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
