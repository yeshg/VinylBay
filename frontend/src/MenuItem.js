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

    render_ingredients() {
        return this.props.ingredients.map((ingredient) => {
            return <li>{ingredient}</li>
        })
    }

    render() {
        return (
            <Card style={{ maxWidth: "300px" }}>
                <Card.Img variant="top" src={images[this.props.image]} style={{ maxWidth: "300px" }} />
                <Card.Body>
                    <Card.Title>{this.props.name}</Card.Title>
                    <Card.Text>
                        {this.props.description}
                    </Card.Text>
                    <Card.Text>
                        <b>${this.props.price.toFixed(2)}</b>
                    </Card.Text>
                    <Card.Text>
                        Ingredients:
                    </Card.Text>
                    <ul>
                        {this.render_ingredients()}
                    </ul>
                </Card.Body>
            </Card>
        );
    }
}

export default MenuItem;