import React, { Component } from 'react';
import PostVinyl from './PostVinyl'
import VinylEntry from './Vinyl/VinylEntry'
import NavigationBar from './NavigationBar'
import VinylFilter from './Vinyl/VinylFilter'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Button } from 'react-bootstrap'

const file = require("./assets/menu.txt")
const items = require('./assets/items/get_vinyls.json')

class Sell extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <NavigationBar username={this.props.username}></NavigationBar>
                <hr></hr>
                <h1 style={{ textAlign: "center" }}>Sell Your Vinyl</h1>
                <hr></hr>
                <Container>
                    <PostVinyl username={this.props.username}></PostVinyl>
                </Container>
            </div>
        );
    }
}

export default Sell;