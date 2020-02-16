import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import logo from './assets/logo.jpg'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class NavigationBarMinimal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Navbar variant="dark" bg="danger">
                <Navbar.Brand style={{ paddingRight: "50px" }}>
                    {/* Customer Login Page */}
                    <Link to={process.env.PUBLIC_URL + '/'} >
                        <img src={logo} style={{ maxHeight: "75px", paddingRight: "20px" }}></img>
                        <span style={{ fontSize: "40px", fontFamily: "Comic Sans MS", color: "yellow" }}>VinylBay</span>
                    </Link>
                </Navbar.Brand>
            </Navbar>
        );
    }
}

export default NavigationBarMinimal;