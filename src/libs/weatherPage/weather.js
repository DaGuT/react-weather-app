import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from "jquery";
import "./weather.css"
import Regions from "../regions/regions.js"
import "../forest/sketch.js"

class Weather extends Component {
  constructor() {

    super();

    this.state= {
      info:{
        main:{}
      }
    }
  }


  //make settings work
  settings() {
      $("#settings-popup").toggle();
  }

  getWeather = (data) => {
    //we change only upon some change
    if (this.state.info!=data) this.setState({'info':data});
    //$('#degrees').innerHTML=data.main.temp===undefined ? 'ops' : data.main.temp;
  }

  render() {
    return (<div className="Weather">
      <nav className="navbar navbar-expand-lg navbar-dark ">
        <a className="navbar-brand bg-red" href="#">DaGuT.Ru</a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <button className="nav-link" id="Sets" onClick={this.settings}>
              <svg className='settings' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                <g id='icons'>
                  <path d='M22.2,14.4L21,13.7c-1.3-0.8-1.3-2.7,0-3.5l1.2-0.7c1-0.6,1.3-1.8,0.7-2.7l-1-1.7c-0.6-1-1.8-1.3-2.7-0.7 L18,5.1c-1.3,0.8-3-0.2-3-1.7V2c0-1.1-0.9-2-2-2h-2C9.9,0,9,0.9,9,2v1.3c0,1.5-1.7,2.5-3,1.7L4.8,4.4c-1-0.6-2.2-0.2-2.7,0.7 l-1,1.7C0.6,7.8,0.9,9,1.8,9.6L3,10.3C4.3,11,4.3,13,3,13.7l-1.2,0.7c-1,0.6-1.3,1.8-0.7,2.7l1,1.7c0.6,1,1.8,1.3,2.7,0.7L6,18.9 c1.3-0.8,3,0.2,3,1.7V22c0,1.1,0.9,2,2,2h2c1.1,0,2-0.9,2-2v-1.3c0-1.5,1.7-2.5,3-1.7l1.2,0.7c1,0.6,2.2,0.2,2.7-0.7l1-1.7 C23.4,16.2,23.1,15,22.2,14.4z M12,16c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4s4,1.8,4,4C16,14.2,14.2,16,12,16z' id='settings'/>
                </g>
              </svg>
            </button>
          </li>
        </ul>
      </nav>

      <div className="container-fluid weather text-center">
        <span id="degrees">{this.state.info.main ? Math.round(this.state.info.main.temp) : "ops"}</span>&#8451;
      </div>

      <div id="settings-popup" >
          <div className="bg-trans" onClick={this.settings}></div>
        <Regions cb={this.getWeather} city="Tomsk" apiKey={this.props.apiKey}/>
      </div>

    </div>);
  }
}

export default Weather;
