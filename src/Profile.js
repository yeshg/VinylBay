import React, { Component } from 'react'
import WebForm from "./Form"
import MenuBar from './MenuBar';
import { Button } from 'react-bootstrap'
import { Container } from 'react-bootstrap'


class Profile extends Component {

    submitClick = event => {
        event.preventDefault()
        alert("Form submitted")
    }
    render() {
        return (
            <div>
                <MenuBar></MenuBar>
                <h1 style={{ textAlign: "center" }}>Subscribe</h1>
                <hr></hr>
                <Container>
                    <WebForm></WebForm>
                </Container>
            </div>
        )
    }
}

export default Profile

