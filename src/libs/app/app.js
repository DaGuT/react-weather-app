import React, { Component } from 'react';
//import "../forest/sketch.js"
import Weather from "../weatherPage/weather.js"

class App extends Component {
  render() {
    return (

          //u can put more info inside of that array to display them by default
          //available items:
          //windSpeed
          //WindForce
          //seaLevel
          //pressure
          //humidity
          //clouds
          //snow||rain
          <Weather apiKey='2c84f4e22d32fcf93b9cbe13612db96a' moreInfo={[]} />

    );
  }
}

export default App;
