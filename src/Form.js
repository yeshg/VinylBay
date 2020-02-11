import React, { Component } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

class WebForm extends Component {
    render() {
        return (
            <div>
                <Form method="POST" action="http://web.engr.oregonstate.edu/~zhangluy/tools/class-content/form_tests/check_request.php">
                    <Row>
                        <Col>
                            <Form.Label>First name</Form.Label>
                            <Form.Control placeholder="First name" name="first" />
                        </Col>
                        <Col>
                            <Form.Label>Last name</Form.Label>
                            <Form.Control placeholder="Last name" name="last" />
                        </Col>
                    </Row>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={this.submitClick}>
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}

export default WebForm;
