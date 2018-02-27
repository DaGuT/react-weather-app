import React, { Component } from 'react';
//import "../forest/sketch.js"
import Weather from "../weatherPage/weather.js"

class App extends Component {
  render() {
    return (

          <Weather apiKey='2c84f4e22d32fcf93b9cbe13612db96a' />

    );
  }
}

export default App;
