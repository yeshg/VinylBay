import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class MenuInfo extends Component {
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
                        <Link to={process.env.PUBLIC_URL + '/menu'} >
                            <Button style={{ fontSize: "2em" }} variant="primary">
                                View Our Menu
                        </Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default MenuInfo;