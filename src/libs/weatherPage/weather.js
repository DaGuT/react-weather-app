import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import $ from "jquery";
import "./weather.css"
import Regions from "../regions/regions.js"
import "../forest/sketch.js"
import * as langs from "../languages"

class Weather extends Component {
  constructor(props) {

    super(props);

    //this is for settings default language
    let userLang = navigator.languages && navigator.languages[0] || // Chrome / Firefox
    navigator.language || // All browsers
    navigator.userLanguage; // IE <= 10
    //we need only two first letters
    window.curLang = userLang.substring(0, 2);
    //and we check if we have that language
    //if we dont, we switch to english
    if (!langs[window.curLang]) {
      window.curLang = 'en';
    }

    this.state = {
      //moreInfo is in state to let some1 add settings that will change state and auto trigger rerender :)
      moreInfo: this.props.moreInfo,
      info: {
        main: {}
      }
    }

  }

  //make settings work
  settings = () => {
    $("#settings-popup").toggle();
  }

  getInfo = (infoName, listNum) => {
    //by default we return first element of list
    listNum = listNum || 0;

    //in case if we have no loaded data yet, we just say 'ops'
    if (!this.state.info.list)
      return 'ops';

    //or then we draw everything
    //I'll do python like without switch
    if (infoName === "temp")
      return Math.round(this.state.info.list[listNum].main.temp) + String.fromCharCode(8451);
    if (infoName === "windSpeed")
      return Math.round(this.state.info.list[listNum].wind.speed);
    if (infoName === "windDir")
      return Math.round(this.state.info.list[listNum].wind.deg);
    if (infoName === "seaLevel")
      return Math.round(this.state.info.list[listNum].main.sea_level);
    if (infoName === "pressure")
      return Math.round(this.state.info.list[listNum].main.pressure);
    if (infoName === "humidity")
      return Math.round(this.state.info.list[listNum].main.humidity);
    if (infoName === "clouds")
      return this.state.info.list[listNum].clouds.all;
    if (infoName === "snow") {
      //there might be no snow
      if (this.state.info.list[listNum].snow)
        //due to json fancyness we should do this trick
        return this.state.info.list[listNum].snow['3h'] ? this.state.info.list[listNum].snow['3h'] : 0;
    }
    if (infoName === "rain") {
      //there might be no rain
      if (this.state.info.list[listNum].rain)
        return this.state.info.list[listNum].rain['3h'] ? this.state.info.list[listNum].rain['3h'] : 0;
    }

  }

  getWeather = (data) => {
    //we change only upon some change
    if (this.state.info != data)
      this.setState({'info': data});
      //$('#degrees').innerHTML=data.main.temp===undefined ? 'ops' : data.main.temp;
    }

  //this way we render more details based on moreInfo prop
  showMoreInfo = (list) => {
    //if we passed anything we draw otherwise we dont
    if (!list)
      return null;

    //little hack with scope so that we will not have to pass 'this' to addItem
    let that = this;
    function addItem(name, i) {
      console.log(name);
      if (name === "windSpeed")
        //why is KEY being removed from here upon compilation? :(
        return (<li className="nav-item" key={name}>
          {langs[window.curLang][name][0] + that.getInfo('windSpeed') + langs[window.curLang][name][1]}
        </li>);

      if (name === "windDir" || name === "seaLevel" || name === "pressure" || name === "humidity" || name === "clouds" || name === "snow" || name === "rain")
        return (<li className="nav-item" key={name}>
          {langs[window.curLang][name] + that.getInfo(name)}
        </li>);

      //just in case...
      return null;
    }

    //we daw whole list of what we've passed and button to open that list
    return ([
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>,
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav text-center">
          {list.map(addItem)}
        </ul>
      </div>
    ]);
  }

  render() {
    return (<div className="Weather">
      <nav className="navbar navbar-light">
        <a className="navbar-brand bg-red" href="#">DaGuT.Ru</a>

        <button className="nav-link" id="Sets" onClick={this.settings}>
          <svg className='settings' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <g id='icons'>
              <path d='M22.2,14.4L21,13.7c-1.3-0.8-1.3-2.7,0-3.5l1.2-0.7c1-0.6,1.3-1.8,0.7-2.7l-1-1.7c-0.6-1-1.8-1.3-2.7-0.7 L18,5.1c-1.3,0.8-3-0.2-3-1.7V2c0-1.1-0.9-2-2-2h-2C9.9,0,9,0.9,9,2v1.3c0,1.5-1.7,2.5-3,1.7L4.8,4.4c-1-0.6-2.2-0.2-2.7,0.7 l-1,1.7C0.6,7.8,0.9,9,1.8,9.6L3,10.3C4.3,11,4.3,13,3,13.7l-1.2,0.7c-1,0.6-1.3,1.8-0.7,2.7l1,1.7c0.6,1,1.8,1.3,2.7,0.7L6,18.9 c1.3-0.8,3,0.2,3,1.7V22c0,1.1,0.9,2,2,2h2c1.1,0,2-0.9,2-2v-1.3c0-1.5,1.7-2.5,3-1.7l1.2,0.7c1,0.6,2.2,0.2,2.7-0.7l1-1.7 C23.4,16.2,23.1,15,22.2,14.4z M12,16c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4s4,1.8,4,4C16,14.2,14.2,16,12,16z' id='settings'/>
            </g>
          </svg>
        </button>

        {this.showMoreInfo(this.state.moreInfo)}
      </nav>

      <div className="container-fluid weather text-center">
        <span id="degrees">{this.getInfo('temp')}</span>

      </div>

      <div id="settings-popup">
        <div className="bg-trans" onClick={this.settings}></div>
        <Regions cb={this.getWeather} city="Tomsk" apiKey={this.props.apiKey}/></div>
    </div>);
  }
}

export default Weather;
