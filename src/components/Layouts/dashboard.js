import React, { Component } from 'react'
import AdminNav from '../Navigation/AdminNav'

export default class Landing extends Component {
    render() {
        return (
            <div>
                    <AdminNav />
                    {this.props.children}
            </div>
        )
    }
}