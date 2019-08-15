//This one is for openweathermap.org
export function parseRegionData(cityName,parent,apiKey) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid='+apiKey+'&units=metric').then(response => {
        return response.json();
    }).then(json => {
      if (parent.state.info!=json) parent.setState({'info':json});
      console.log(json);
    });
}

export function parseLocation(parent) {
  fetch('http://api.ipstack.com/check?access_key=724ea5e383b001b81c97e079143c1e5f').then(response => {
          console.log(response);
      return response.json();
  }).then(json => {
    if (parent.state.value!=json.city) parent.setState({'value':json.city});
    parseRegionData(parent.state.value,parent,parent.props.apiKey); //yeah, that's not cool, however this is the simplest way
    //WE DO THIS BECAUSE WE only call this function in component did mount :)
    console.log(json);
  });
}
