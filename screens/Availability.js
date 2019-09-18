import React, { Component } from 'react';
import Slideshow from 'react-native-image-slider-show';
export class Availability extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: 1,
            interval: null,
        };
    }

    componentWillMount() {


    }
    componentWillReceiveProps(prevProps) {

    }
    componentWillUnmount() {
    }


    render() {
        return (
            <Text>Available</Text>

        )
    }
}

export default Availability