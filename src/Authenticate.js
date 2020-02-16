import React, { Component } from 'react'
import { Form, Row, Col, FormGroup } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

class Authenticate extends Component {

    constructor(props) {

        super(props);
        this.state = {
            username: "",
            password: "",
            authenticated: false
        };
    }

    log_in_user = (username, password) => {
        fetch("http://flip2.engr.oregonstate.edu:15204/authenticate", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ username: username, password: password }),
        })
            .then((response) => {
                response.json()
                    .then(
                        (result) => {
                            if (result.authenticated == 0) {
                                this.setState({ authenticated: false })
                                alert("Invalid Login Credentials")
                            }
                            else {
                                this.setState({ authenticated: true })
                                this.props.sendAuthentication(username)
                            }
                        })
            }
            )
    }

    componentDidMount() {
        this.props.unauthenticate()
    }

    sign_up_user = (username, password) => {
        fetch("http://flip2.engr.oregonstate.edu:15204/sign_up", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ username: username, password: password }),
        })
            .then((response) => {
                this.log_in_user(username, password)
            }
        )
    }

    invalid_input = (username, password) => {
        console.log(username.length, password.length)
        if (! (username.length < 1) && ! (password.length < 1) ) {
            return false;
        }
        else {
            return true;
        }
    }

    login_user = () => {
        if (this.invalid_input(this.state.username, this.state.password)) {
            alert("Arrey Bhongya 2")
        }
        else {
            this.log_in_user(this.state.username, this.state.password)
        }
    }

    register_user = () => {
        if (this.invalid_input(this.state.username, this.state.password)) {
            alert("Arrey Bhongya 2")
        }
        else {
            this.sign_up_user(this.state.username, this.state.password)
        }
    }

    render() {
        return (
            <div>
                <Form>
                    <FormGroup>
                        <Form.Label>Username</Form.Label>
                        <Form.Control placeholder="username" name="username" onChange={(e) => { this.setState({ username: e.target.value }) }} />
                    </FormGroup >
                    <FormGroup>
                        <Form.Label>Password</Form.Label>
                        <Form.Control placeholder="password" type="password" name="password" onChange={(e) => { this.setState({ password: e.target.value }) }} />
                    </FormGroup>
                    <Button variant="primary" onClick={this.login_user} style={{ marginRight: "20px" }}>
                        Log In
                    </Button>
                    <Button variant="primary" onClick={this.register_user}>
                        Sign Up
                    </Button>
                </Form>
            </div>
        )
    }
}

export default Authenticate;
