import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import VinylPage from './VinylPage'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('../assets/items', false, /\.(png|jpe?g|svg)$/));

class VinylEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    showModal = () => {

    }

    handle_delete = () => {
        let request_body={
            vinylID: this.props.id,
        }
        fetch("https://flip2.engr.oregonstate.edu:15204/delete_vinyl", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( request_body ),
        })
            .then((response) => {
                console.log(response)
                this.props.refetch()
            }
        )
    }

    componentDidMount() {
        console.log(this.props.username)
    }

    render_delete() {
        if (this.props.deleteable) {
            return (
                <Button style={{ fontSize: "2em" }} variant="danger" onClick={this.handle_delete}>
                    Delete
            </Button>
            )
        }
    }

    render() {
        return (
            <Card style={{ width: "250px" }}>
                <Card.Img variant="top" src={[this.props.imageURL]} style={{ maxWidth: "300px" }} />
                <Card.Body>
                    <Card.Title>{this.props.name}</Card.Title>
                    <Card.Text>
                        <b>${this.props.price.toFixed(2)}</b>
                    </Card.Text>
                    <Card.Text>
                        ID : {this.props.id}
                    </Card.Text>
                    <Card.Text>
                        Genre : {this.props.genre}
                    </Card.Text>
                    {/* <Card.Text>
                        Description : {this.props.description}
                    </Card.Text> */}
                    {/* <VinylPage id={this.props.id} name={this.props.name} genre={this.props.genre} description={this.props.description} price={this.props.price} imageURL={this.props.imageURL}></VinylPage> */}
                    <Link to={{ pathname: process.env.PUBLIC_URL + '/vinyl' + this.props.id, state: { username: this.props.username } }}>
                        <Button style={{ fontSize: "2em" }} variant="primary">
                            Buy
                        </Button>
                    </Link>
                    {this.render_delete()}
                </Card.Body>
            </Card>
        );
    }
}

export default VinylEntry;