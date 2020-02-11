import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class OrderInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Container>
                <hr></hr>
                <Row>
                    <Col style={{ textAlign: "center" }}>
                        <Link to= {process.env.PUBLIC_URL + '/order'}>
                            <Button style={{ fontSize: "2em" }} variant="primary">
                                Order Now!
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default OrderInfo;