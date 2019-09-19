import React, { Component } from 'react';
import Slideshow from 'react-native-image-slider-show';
var TVEventHandler = require('TVEventHandler');

export class Residences extends Component {
    _tvEventHandler: any;

    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
            position: 0,
            interval: null,
            dataSource: [
                {
                    title: '',
                    caption: '',
                    url: require('.././assets/images/residences/01.jpg'),
                },
                {
                    title: '',
                    caption: '',
                    url: require('.././assets/images/residences/02.jpg'),
                },
                {
                    title: '',
                    caption: '',
                    url: require('.././assets/images/residences/03.jpg'),
                },
                {
                    title: '',
                    caption: '',
                    url: require('.././assets/images/residences/04.jpg'),
                },

            ],
        };
    }

    _enableTVEventHandler() {
        const totalImages = this.state.dataSource.length
        this._tvEventHandler = new TVEventHandler();
        this._tvEventHandler.enable(this, (cmp, evt) => {
            if (evt.eventType === 'swipeRight') {
                if (this.state.showMenu) {
                    console.log("menu is opened")
                } else {
                    this.setState(prevState => {
                        return { position: this.state.position === totalImages ? 0 : prevState.position + 1 }
                    })
                }
            }
            else if (evt.eventType === 'swipeLeft') {
                if (this.state.showMenu) {
                    console.log("menu is opened")
                } else {
                    this.setState(prevState => {
                        return { position: this.state.position === 0 ? 0 : prevState.position - 1 }
                    })
                }

            }
        });
    }
    _disableTVEventHandler() {
        if (this._tvEventHandler) {
            this._tvEventHandler.disable();
            delete this._tvEventHandler;
        }
    }
    componentDidMount(props) {
        this._enableTVEventHandler();
    }

    componentWillReceiveProps = (prevProps) => {
        this.setState({ showMenu: prevProps.showMenu })
    }
    componentWillUnmount() {
        this._disableTVEventHandler();
    }


    render() {
        return (
            <Slideshow
                indicatorSize={0}

                arrowSize={0}
                height={1080}
                dataSource={this.state.dataSource}
                position={this.state.position}
                onPositionChanged={position => this.setState({ position })} />

        )
    }
}

export default Residences