import React, { Component } from 'react';
import FastImage from 'react-native-fast-image';
import Routing from "./components/Routing"


console.disableYellowBox = true;
export class App extends Component {
  constructor() {
    super()
    this.state = {
    }
  }


  render() {
    return (
      <Routing />
    )
  }
}



export default App;
