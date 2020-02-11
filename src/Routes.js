import React, { Component } from 'react';
import App from './App'
import Buy from './Buy'
import Profile from './Profile'
import Sell from './Sell'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MenuInfo from './MenuInfo';

class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Router>
                <Route exact path={process.env.PUBLIC_URL + '/'} component={App} />
                <Route exact path={process.env.PUBLIC_URL + '/buy'} component={Buy} />
                <Route exact path={process.env.PUBLIC_URL + '/sell'} component={Sell} />
                <Route exact path={process.env.PUBLIC_URL + '/profile'} component={Profile} />\
            </Router>
        );
    }
}

export default Routes;