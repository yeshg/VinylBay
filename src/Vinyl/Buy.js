import React, { Component } from 'react';
import VinylEntry from './VinylEntry'
import NavigationBar from '../NavigationBar'
import VinylFilter from './VinylFilter'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Button } from 'react-bootstrap'

const file = require("../assets/menu.txt")
// const items = require('./assets/items/get_vinyls.json')

class Buy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vinyls: [],
            filtered_vinyl: []
        };
    }

    fetch_vinyls = () => {
        fetch("http://flip2.engr.oregonstate.edu:15204/get_vinyls", {
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
                            this.setState({vinyls: result,
                            filtered_vinyl: result})
                        })
            }
            )
    }

    // handle_new_query = (query) => {
    //     let newitems = []
    //     for (let i = 0; i < items.length; i++) {
    //         let lower_album = items[i].album.toLowerCase()
    //         let lower_name = items[i].name.toLowerCase()
    //         let lower_artist = items[i].artist.toLowerCase()
    //         if (lower_name.includes(query) || lower_album.includes(query) || lower_artist.includes(query)) (
    //             newitems.push(items[i])
    //         )
    //     }
    //     this.setState({
    //         filtered_vinyl: newitems
    //     })
    // }

    render_vinyl_cards = () => {
        let split_items = [];
        let j = -1;
        for (let i = 0; i < this.state.filtered_vinyl.length; i++) {
            if (i % 4 === 0) {
                split_items.push([])
                j++
            }
            split_items[j].push(this.state.filtered_vinyl[i])
        }
        return split_items.map((row) => {
            return (
                <Row style={{ paddingBottom: "250px"}}>
                    {this.render_split_row(row)}
                </Row>
            )
        })
    }

    render_vinyl_card = (item) => {
        return (
            <Col style={{ maxHeight: "300px" }}>
                <VinylEntry id={item.vinylID} name={item.name} username={this.props.username} genre={item.genre} description={item.description} price={item.price} imageURL={item.imageURL}></VinylEntry>
            </Col>
        )
    }

    render_split_row = (row) => {
        return (
            row.map((item) => {
                return this.render_vinyl_card(item)
            })
        )
    }

    componentDidMount = () =>{
        this.fetch_vinyls()
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
                <h1 style={{ textAlign: "center" }}>Buy Vinyls</h1>
                <hr></hr>
                <Container>
                    <VinylFilter new_query={this.handle_new_query}></VinylFilter>
                </Container>

                <Container style={{ overflowY: "scroll" }}>

                    <hr></hr>
                    {this.render_vinyl_cards()}
                </Container>
            </div>
        );
    }
}

export default Buy;