import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'




function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('./assets/items', false, /\.(png|jpe?g|svg)$/));



class MenuItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Card style={{ width: "250px", height: "525px" }}>
                <Card.Img variant="top" src={images[this.props.image]} style={{ maxWidth: "300px" }} />
                <Card.Body>
                    <Card.Title>{this.props.name}</Card.Title>
                    <Card.Text>
                        <b>${this.props.price.toFixed(2)}</b>
                    </Card.Text>
                    <Card.Text>
                        Artist: {this.props.artist}
                        <br></br>
                        Album : {this.props.album}
                    </Card.Text>
                    <a href="https://www.mcdonalds.com/us/en-us/full-menu.html" download="menu">
                    <Button style={{ fontSize: "2em" }} variant="primary">
                        Order
                        </Button>
                </a>
                </Card.Body>
            </Card>
        );
    }
}

export default MenuItem;