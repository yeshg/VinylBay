import React, { Component } from 'react';
import MenuItem from './MenuItem'
import MenuBar from './MenuBar'
import MenuFilter from './MenuFilter'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Button } from 'react-bootstrap'

const file = require("./assets/menu.txt")
const items = require('./assets/items/items.json').items

class Buy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filtered_menu: items
        };
    }

    handle_new_query = (query) => {
        let newitems = []
        for (let i = 0; i < items.length; i++) {
            let lower_album = items[i].album.toLowerCase()
            let lower_name = items[i].name.toLowerCase()
            let lower_artist = items[i].artist.toLowerCase()
            if (lower_name.includes(query) || lower_album.includes(query) || lower_artist.includes(query)) (
                newitems.push(items[i])
            )
        }
        this.setState({
            filtered_menu: newitems
        })
    }

    render_menu_cards = () => {
        let split_items = [];
        let j = -1;
        for (let i = 0; i < this.state.filtered_menu.length; i++) {
            if (i % 4 === 0) {
                split_items.push([])
                j++
            }
            split_items[j].push(this.state.filtered_menu[i])
        }
        return split_items.map((row) => {
            return (
                <Row style={{ paddingBottom: "250px"}}>
                    {this.render_split_row(row)}
                </Row>
            )
        })
    }

    render_menu_card = (item) => {
        return (
            <Col style={{ maxHeight: "300px" }}>
                <MenuItem name={item.name} description={item.description} image={item.image} price={item.price} album={item.album} artist={item.artist}></MenuItem>
            </Col>
        )
    }

    render_split_row = (row) => {
        return (
            row.map((item) => {
                return this.render_menu_card(item)
            })
        )
    }

    render() {
        return (
            <div>
                <MenuBar></MenuBar>

                <h1 style={{ textAlign: "center" }}>Our Menu</h1>
                <hr></hr>
                <Container>
                    <MenuFilter new_query={this.handle_new_query}></MenuFilter>
                </Container>

                <Container style={{ overflowY: "scroll" }}>

                    <hr></hr>
                    {this.render_menu_cards()}
                </Container>
            </div>
        );
    }
}

export default Buy;