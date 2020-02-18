import React, { Component } from 'react';
import NavigationBar from '../NavigationBar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Button, Form } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
const file = require("../assets/menu.txt")

class Artists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artists: [],
            new_name: ""
        };
    }

    handle_submit_artist = () => {
        fetch("http://flip2.engr.oregonstate.edu:15204/add_artist", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ name: this.state.new_name }),
        })
            .then((response) => {
                this.fetch_artists()
            }
            )
    }

    fetch_artists = () => {
        fetch("http://flip2.engr.oregonstate.edu:15204/get_artists", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then((response) => {
                response.json() 
                    .then(
                        (result) => {
                            this.setState({artists: result})
                        })
            }
            )
    }

    render_artist_cards = () => {
        return this.state.artists.map((artist) => {
            return (
                <Row>
                    {this.render_artist(artist)}
                </Row>
            )
        })
    }

    render_artist = (item) => {
        return (
            <Link to={{pathname: process.env.PUBLIC_URL + '/artists' + item.artistID, state:{username: this.props.username, artistname: item.name}}}>
            <h3 style={{ textAlign: "center" }}>{item.name}</h3>
            </Link>
        )
    }

    componentDidMount = () =>{
        this.fetch_artists()
    }

    submitClick = event => {
        event.preventDefault()
        alert("Form submitted")
    }

    render() {
        return (
            <div>
                <NavigationBar username={this.props.username}></NavigationBar>
                <hr></hr>
                <h1 style={{ textAlign: "center" }}>Artists</h1>
                <hr></hr>
                <Container style={{ overflowY: "scroll" }}>

                    <hr></hr>
                    {this.render_artist_cards()}
                    <hr></hr>
                    <h3 style={{ textAlign: "center" }}>Add an Artist</h3>
                    <hr></hr>
                    <Form>
                    <Form.Group>
                        <Form.Control type="text" placeholder="new artist name" name="new_name"  onChange={(e) => {this.setState({new_name: e.target.value})}} />
                    </Form.Group>
                    <Button variant="primary" type="reset" onClick={this.handle_submit_artist}>
                        Submit Artist
                    </Button>
                </Form>
                </Container>
            </div>
        );
    }
}

export default Artists;