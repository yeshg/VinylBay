import React, { Component } from 'react'
import WebForm from "./Form"
import MenuBar from './MenuBar';
import { Button } from 'react-bootstrap'
import { Container } from 'react-bootstrap'
import { Row, Col } from 'react-bootstrap'
import MenuItem from './MenuItem'
import { ListGroup } from 'react-bootstrap'
import logo from './assets/logo.png'


const items = require('./assets/items/items.json').items

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filtered_menu: items
        };
    }

    render_menu_card = (item) => {
        return (
            <Col style={{ maxHeight: "300px" }}>
                <MenuItem name={item.name} description={item.description} image={item.image} price={item.price} ingredients={item.ingredients}></MenuItem>
                <a href="https://www.mcdonalds.com/us/en-us/full-menu.html" download="menu">
                    <Button style={{ fontSize: "2em" }} variant="primary">
                        Order
                        </Button>
                </a>
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
                <Row style={{ paddingBottom: "250px" }}>
                    {this.render_split_row(row)}
                </Row>
            )
        })
    }

    render() {
        return (
            <div>
                <MenuBar></MenuBar>
                <Container>
                    <hr></hr>
                    <h1 style={{ textAlign: "center" }}>Our Menu</h1>
                    <hr></hr>
                    {this.render_menu_cards()}
                    <hr></hr>
                </Container>

            </div>
        )
    }
}

export default Order;

