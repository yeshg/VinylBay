import React, { Component } from 'react';
import App from './App'
import Menu from './Menu'
import Contact from './Contact'
import Order from './Order'
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
                <Route exact path={process.env.PUBLIC_URL + '/menu'} component={Menu} />
                <Route exact path={process.env.PUBLIC_URL + '/order'} component={Order} />
                <Route exact path={process.env.PUBLIC_URL + '/contact'} component={Contact} />\
            </Router>
        );
    }
}

export default Routes;