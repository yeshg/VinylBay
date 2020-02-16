import React, { Component } from 'react';
import { Form, Row, Col } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

class VinylFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handle_search_change = (event) => {
        this.props.new_query(event.target.value.toLowerCase())
    }

    render() {
        return (
            <div>
                <Form method="POST" action="http://web.engr.oregonstate.edu/~zhangluy/tools/class-content/form_tests/check_request.php">
                    <Form.Group controlId="formBasicEmail">
                    {/* <Form.Label>Search</Form.Label> */}
                            <Form.Control placeholder="Search by Vinyl Name" name="first" />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={this.submitClick}>
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

export default VinylFilter;