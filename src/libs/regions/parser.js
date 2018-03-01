//This one is for openweathermap.org
export function parseRegionData(cityName,parent,apiKey) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid='+apiKey+'&units=metric').then(response => {
        return response.json();
    }).then(json => {
      if (parent.state.info!=json) parent.setState({'info':json});
      console.log(json);
    });
}
