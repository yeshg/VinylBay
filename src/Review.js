import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

class Review extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviewBody: this.props.reviewBody,
            editing: false
        }
    }

    handle_update = () => {
        this.setState({ editing: true })
    }

    handle_delete = () => {
        
        let request_body={
            reviewID: this.props.reviewID,
        }
        fetch("http://flip2.engr.oregonstate.edu:15204/delete_review", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( request_body ),
        })
            .then((response) => {
                console.log(response)
                this.props.refetch()
            }
        )
    }

    submit_update = () => {

        let request_body={
            reviewID: this.props.reviewID,
            reviewBody: this.state.reviewBody,
        }
        fetch("http://flip2.engr.oregonstate.edu:15204/edit_review", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( request_body ),
        })
            .then((response) => {
                console.log(response)
                this.setState({ editing: false })
                this.props.refetch()
            }
            )
    }

    render_reviewBody = () => {
        if (this.state.editing == false) {
            return (
                <>
                    {this.state.reviewBody}
                </>
            )
        }
        else {
            return (
                <Form.Control type="text" placeholder="Your Review" name="review" onChange={(e) => {this.setState({reviewBody: e.target.value})}} />
            )
        }
    }

    render_buttons = () => {
        if (this.props.editable) {
            if (this.state.editing) {
                return (
                    <>
                        <Button bg="success" onClick={this.submit_update} style={{ marginRight: "20px" }}>Save</Button>
                    </>
                )
            }
            else {
                return (
                    <>
                        <Button bg="success" onClick={this.handle_update} style={{ marginRight: "20px" }}>Update</Button>
                        <Button bg="danger" onClick={this.handle_delete}>Delete</Button>
                    </>
                )
            }
        }
        else {
            return (
                <></>
            )
        }
    }

    render() {
        return (
            <Card>
                <Card.Header>{this.props.username}</Card.Header>
                <Card.Body>
                    {this.render_reviewBody()}
                </Card.Body>
                <Card.Footer>
                    {this.render_buttons()}
                </Card.Footer>
            </Card>
        );
    }
}

export default Review;