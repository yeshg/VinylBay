import React, { Component } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { InputGroup } from 'react-bootstrap'
import { FormGroup } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
class PostVinyl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sold: false,
            name: "",
            artists_text: "",
            genre: "",
            price: undefined,
            description: "",
            imageURL: "",
            username: this.props.username
        };
    }

    handleSubmit = (event) => {
        const form = event.currentTarget;
        console.log(form)
    };


    submit_vinyl = () => {

        let request_body = this.state

        request_body.artists = this.state.artists_text.split(",").map((e) => {return(e.trim())})

        fetch("http://flip2.engr.oregonstate.edu:15204/sell_vinyls", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( request_body ),
        })
            .then((response) => {
                console.log(response)
                this.setState({ sold: true })
            }
            )
    }

    handle_redirect = () => {
        if(this.state.sold){
            return(
                <Redirect to='/buy' />
            )
        }
        else{
            return(
                <></>
            )
        }
    }


    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>

                        <Form.Label>Name</Form.Label>
                        <Form.Control onChange={(e) => this.setState({ name: e.target.value })} placeholder="Vinyl Name" name="name" />

                        <Form.Label>Artist(s)</Form.Label>
                        <Form.Control onChange={(e) => this.setState({ artists_text: e.target.value })} placeholder="Artists" name="artists" />

                        <Form.Label>Genre</Form.Label>
                        <Form.Control onChange={(e) => this.setState({ genre: e.target.value })} placeholder="Genre" name="genre" />

                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" onChange={(e) => this.setState({ price: parseFloat(e.target.value) })} placeholder="23" name="price" />

                        <Form.Label>Description</Form.Label>
                        <Form.Control onChange={(e) => this.setState({ description: e.target.value })} placeholder="enter description" name="description" />

                        <Form.Label>Image URL</Form.Label>
                        <Form.Control onChange={(e) => this.setState({ imageURL: e.target.value })} placeholder="enter image url" name="imageURL" />
                    </FormGroup>

                    <Button variant="primary" onClick={this.submit_vinyl}>
                        Post New Vinyl
                </Button>
                </Form>
                {this.handle_redirect()}
            </div>
        )
    }
}

export default PostVinyl;
