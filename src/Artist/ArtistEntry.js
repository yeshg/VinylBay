import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('../assets/items', false, /\.(png|jpe?g|svg)$/));

class ArtistEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    showModal = () => {

    }

    componentDidMount() {
        console.log(this.props.username)
    }

    render() {
        return (
            <Card style={{ width: "250px" }}>
                <Card.Img variant="top" src={[this.props.imageURL]} style={{ maxWidth: "300px" }} />
                <Card.Body>
                    <Card.Title>{this.props.name}</Card.Title>
                    {/* List out the vinylls here */}
                </Card.Body>
            </Card>
        );
    }
}

export default ArtistEntry;