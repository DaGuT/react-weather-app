import React, {Component} from 'react';
import {parseRegionData} from "./parser";
import "./regions.css";
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
  }


  //additional funcs
  getValidationState() {
    if (this.state.info.cod === 200) {
      return 'success';
    } else {
      return 'error';
    }
  }


  handleChange(e) {
    let tv=e.target.value;
    this.setState({value: tv});
    //checkCity('http://api.openweathermap.org/data/2.5/weather?q='+e.target.value+'&appid=f1ca3d209100fe1ac19e5efcfd9033cf',this);
    if (this.timeoutVar) {
      clearTimeout(this.timeoutVar);
    }
      this.timeoutVar = setTimeout(()=>parseRegionData(tv,this,this.props.apiKey),2000);
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
    let city=this.props.city;
    if (city) {
        this.state.value=city;
        parseRegionData(city,this,this.props.apiKey);
    }
  }

  //upon updating, pass to parent
  componentDidUpdate() {
      this.passToParent();
  }

  render() {
    //let weather = this.state.info? this.state.info.weather : 'loading';
    return (<div className="Regions">
      <form>
        <FormGroup controlId="formBasicText" validationState={this.getValidationState()}>
          <ControlLabel>Please, write your city name here</ControlLabel>
          <FormControl type="text" value={this.state.value} placeholder="City name" onChange={this.handleChange}/>
          <FormControl.Feedback/>
        </FormGroup>
      </form>
    </div>);
  }
}

export default Regions;
