import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import burger from './assets/burger.jpg'
import hummus from './assets/hummus.jpg'
import poutine from './assets/poutine.jpg'

class MenuCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Carousel>
                <Carousel.Item controls = {true}>
                    <img
                        className="d-block w-100"
                        src={burger}
                        alt="Burger"
                    />
                    <Carousel.Caption>
                        <h1>Try the original McBurger</h1>
                        <h3>Same great taste now with extra McPickles and new Secret-McSauce</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={hummus}
                        alt="Hummus"
                    />

                    <Carousel.Caption>
                        <h1 style={{color: "black"}}>For a limited time only! McHummus</h1>
                        <h3 style={{color: "black"}}>McChips not included</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={poutine}
                        alt="Poutine"
                    />

                    <Carousel.Caption>
                        <h1>McPoutine, Eh!</h1>
                        <h3>Only available at select Canadian locations</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        );
    }
}

export default MenuCarousel;