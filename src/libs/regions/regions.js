import React, {Component} from 'react';
import {parseRegionData} from "./parser";
import "./regions.css";
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as langs from "../languages"

class Regions extends Component {
  constructor() {
    super();

    this.timeoutVar;

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: '',
      info: {
        main: {},
        cod: 200
      }
    };

    this.parserInterval=setInterval(()=>{parseRegionData(this.state.value, this, this.props.apiKey)},1800*1000);
  }

  //additional funcs
  getValidationState() {
    if (this.state.info.list) {
      return 'success';
    } else {
      return 'error';
    }
  }

  handleChange(e) {
    let tv = e.target.value;
    this.setState({value: tv});
    //checkCity('http://api.openweathermap.org/data/2.5/weather?q='+e.target.value+'&appid=f1ca3d209100fe1ac19e5efcfd9033cf',this);
    if (this.timeoutVar) {
      clearTimeout(this.timeoutVar);
    }
    this.timeoutVar = setTimeout(() => parseRegionData(tv, this, this.props.apiKey), 2000);
  }

  //we return data to parent via callback
  passToParent() {
    if (this.props.cb) {
      //this.props.cb.setState('info':data);
      this.props.cb(this.state.info);
    }
  }

  //Built--in functions
  componentDidMount() {
    let city = this.props.city;
    if (city) {
      this.state.value = city;
      parseRegionData(city, this, this.props.apiKey);
    }
  }

  //upon updating, pass to parent
  componentDidUpdate() {
    //first, we pass our data to app, so that it can draw weather
    this.passToParent();
    //then we pass wind to window, so that sketch can properly use wind force
    if (this.state.info.main) {
      window.wind = this.state.info.wind.speed;
    }
    //and then we change title of our page, so that ppl could see temperature just by looking at page titile in tabs
    document.title = this.state.info.list
      ? Math.round(this.state.info.list[0].main.temp) + String.fromCharCode(8451)
      : "No data";
  }

  render() {
    //let weather = this.state.info? this.state.info.weather : 'loading';
    return (<div className="Regions">
      <form>
        <FormGroup controlId="formBasicText" validationState={this.getValidationState()}>
          <ControlLabel>{langs[window.curLang].selectCityText}</ControlLabel>
          <FormControl type="text" value={this.state.value} placeholder="City name" onChange={this.handleChange}/>
          <FormControl.Feedback/>
        </FormGroup>
      </form>
    </div>);
  }
}

export default Regions;
