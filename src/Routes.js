import React, { Component } from 'react';
import App from './App'
import Buy from './Vinyl/Buy'
import Artists from './Artist/Artists'
import Sell from './Sell'
import VinylPage from './Vinyl/VinylPage'
import ArtistPage from './Artist/ArtistPage'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            username: ""
        };
    }

    handle_authentication = (username) => {
        this.setState({ authenticated: true, username: username });
        
    }

    handle_unauthentication = () => {
        this.setState({ authenticated: false, username: "" });
    }

    handle_redirect = () => {
        if(this.state.authenticated){
            return(
                <Redirect to='/buy' />
            )
        }
        else{
            return(
                <></>
            )
        }
    }

    generate_routes = () => {
        if (this.state.authenticated) {
            return (
                <>
                    <Route exact path={process.env.PUBLIC_URL + '/'} render={() => <App sendAuthentication={this.handle_authentication} unauthenticate={this.handle_unauthentication} />} />
                    <Route exact path={process.env.PUBLIC_URL + '/buy'} render={() => <Buy username={this.state.username} />} />
                    <Route exact path={process.env.PUBLIC_URL + '/sell'} render={() => <Sell username={this.state.username} />} />
                    <Route exact path={process.env.PUBLIC_URL + '/artists'} render={() => <Artists username={this.state.username} />}/>
                    <Route path={"/vinyl:id"} component={VinylPage} />
                    <Route path={"/artists:id"} component={ArtistPage} />
                </>
            );
        }
        else {
            return (
                <>
                    <Route exact path='*' render={() => <App sendAuthentication={this.handle_authentication} unauthenticate={this.handle_unauthentication}/>} />
                </>
            );
        }
    }


    render() {
        return (
            <Router>
                {this.generate_routes()}
                {this.handle_redirect()}
            </Router>
        );
    }
}

export default Routes;