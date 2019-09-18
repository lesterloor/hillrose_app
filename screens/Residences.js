import React, { Component } from 'react';
import Slideshow from 'react-native-image-slider-show';
export class Residences extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: 1,
            interval: null,
            dataSource: [
                {
                    title: '',
                    caption: '',
                    url: require('.././assets/images/home/01.jpg'),
                },
                {
                    title: '',
                    caption: '',
                    url: require('.././assets/images/home/02.jpg'),
                },
                {
                    title: '',
                    caption: '',
                    url: require('.././assets/images/home/03.jpg'),
                }
            ],
        };
    }
    startSlider = (playSlideshow) => {

        playSlideshow ?
            this.setState({
                interval: setInterval(() => {
                    this.setState({
                        position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
                    });
                }, 2000)
            }) : clearInterval(this.state.interval);

    }
    componentWillMount() {

        this.startSlider(this.props.playSlideshow)

    }
    componentWillReceiveProps(prevProps) {
        this.startSlider(prevProps.playSlideshow)

    }
    componentWillUnmount() {
        clearInterval(this.state.interval);
    }


    render() {
        return (
            <Slideshow
                height={1080}
                dataSource={this.state.dataSource}
                position={this.state.position}
                onPositionChanged={position => this.setState({ position })} />

        )
    }
}

export default Residences