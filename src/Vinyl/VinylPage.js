import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import NavigationBar from '../NavigationBar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Review from '../Review'
import Form from 'react-bootstrap/Form'
import {
    useParams
} from "react-router-dom";


class VinylPage extends Component {
    constructor(props) {

        super(props);
        this.state = {
            url_id: "", vinylID: "", name: "", genre: "", price: "", description: "", imageURL: "",
            reviewBody: "",
            reviews: [
                {
                    username: "Yigga",
                    reviewBody: "Trigga"
                },
                {
                    username: "Yigga",
                    reviewBody: "Quiga"
                }
            ]
        };
    }


    componentDidMount() {
        this.setState({ url_id: this.props.match.params.id })
        console.log(this.props.location)
        this.setState({login_name: this.props.location.state.username})
        this.fetch_vinyl(this.props.match.params.id)
        this.fetch_reviews(this.props.match.params.id)
    }

    fetch_vinyl = (id) => {
        fetch("https://flip2.engr.oregonstate.edu:15204/get_vinyl", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ vinylID: id }),
        })
            .then((response) => {
                response.json()
                    .then(
                        (result) => {
                            let data = result[0]
                            this.setState(data)
                        })
            }
            )
    }

    fetch_reviews = (id) => {
        fetch("https://flip2.engr.oregonstate.edu:15204/get_reviews", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ vinylID: id }),
        })
            .then((response) => {
                response.json()
                    .then(
                        (result) => {
                            this.setState({reviews: result})
                        })
            }
            )
    }

    refetch = () =>{
        fetch("https://flip2.engr.oregonstate.edu:15204/get_reviews", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ vinylID: this.state.url_id }),
        })
            .then((response) => {
                response.json()
                    .then(
                        (result) => {
                            this.setState({reviews: result})
                        })
            }
            )
    }

    add_review = (reviewBody, id) => {
        fetch("https://flip2.engr.oregonstate.edu:15204/add_review", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ vinylID: id, reviewBody: reviewBody, username: this.state.login_name}),
        })
            .then((response) => {
                this.fetch_reviews(id)
                // response.json()
                //     .then(
                //         (result) => {
                //             window.location.reload(true)
                //         })

            }
            )
    }

    render_review_cards = (login_name) => {
        return (
            this.state.reviews.map(
                (comment) => {
                    return (
                        <>
                        <Review username={comment.username} reviewBody={comment.reviewBody} reviewID = {comment.reviewID} editable={login_name == comment.username} refetch={this.refetch}></Review>
                        <br></br>
                        </>
                    )
                }
            )
        )
    }

    submit_review = () =>{
        if(this.state.reviewBody.length<1){
            alert("Arrey Bhongya")
        }
        else{
            this.add_review(this.state.reviewBody, this.state.vinylID)
        }
    }

    render() {
        return (
            <div>
                <NavigationBar username={this.state.login_name}></NavigationBar>
                <hr></hr>
                <h1 style={{ textAlign: "center" }}>{this.state.name}</h1>
                <hr></hr>
                <Container>
                    <Row>
                        <Col xs={6} md={4}>
                            <Image src={this.state.imageURL} />
                        </Col>
                    </Row>
                    <Row>
                        Genre: {this.state.genre}
                        <br></br>
                        Price : {this.state.price}
                        <br></br>
                    </Row>
                    <Row>
                        Description : {this.state.description}
                    </Row>
                    <Row>
                        Seller : {this.state.username}
                    </Row>
                    <Row>
                        <Button style={{ fontSize: "2em" }} variant="primary" onClick={this.deleteGaand}>
                            Buy
                        </Button>
                    </Row>
                    <hr></hr>
                    <h2 style={{ textAlign: "center" }}>Reviews</h2>
                    <hr></hr>
                    {this.render_review_cards(this.state.login_name)}
                    <hr></hr>
                    <h3 style={{ textAlign: "center" }}>Add a Review</h3>
                    <hr></hr>
                    <Form>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Your Review" name="review"  onChange={(e) => {this.setState({reviewBody: e.target.value})}} />
                    </Form.Group>
                    <Button variant="primary" type="reset" onClick={this.submit_review}>
                        Submit Review
                    </Button>
                </Form>
                </Container>
                {/* <div> */}
            </div>

        );
    }
}

export default VinylPage;
