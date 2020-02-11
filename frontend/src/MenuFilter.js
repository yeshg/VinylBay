import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'

class MenuFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handle_search_change = (event) => {
        this.props.new_query(event.target.value.toLowerCase())
    }

    render() {
        return (
            <Form>
                <Row>
                    <Col>
                        <Form.Control onChange = {this.handle_search_change} placeholder="Search"/>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default MenuFilter;