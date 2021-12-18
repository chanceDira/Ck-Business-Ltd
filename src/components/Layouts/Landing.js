import React, { Component } from 'react'
import Nav from '../Navigation/Nav'

export default class Landing extends Component {
    render() {

        return (
            <div>
                    <Nav />
                    {this.props.children}
                
            </div>
        )
    }
}
