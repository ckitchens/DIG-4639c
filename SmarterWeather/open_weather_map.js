const WEATHER_API_KEY = "bbeb34ebf60ad50f7893e7440a1e2b0b";
const API_STEM = "http://api.openweathermap.org/data/2.5/weather?";

function zipUrl(zip) {
  return `${API_STEM}q=${zip}&units=imperial&APPID=${WEATHER_API_KEY}`;
}

function latLonUrl(lat, lon, fahrenheit) {
  return `${API_STEM}lat=${lat}&lon=${lon}&units=${fahrenheit?"imperial":"metric"}&APPID=${WEATHER_API_KEY}`;
}

function fetchForecast(url) {
  return fetch(url)
    .then(response => response.json())
    .then(responseJSON => {
      return {
        main: responseJSON.weather[0].main,
        description: responseJSON.weather[0].description,
        temp: responseJSON.main.temp
      };
    })
    .catch(error => {
      console.error(error);
    });
}


function fetchZipForecast(zip) {
  return fetchForecast(zipUrl(zip));
}

function fetchLatLonForecast(lat, lon, fahrenheit) {
  return fetchForecast(latLonUrl(lat, lon, fahrenheit));
}

export default {
  fetchZipForecast: fetchZipForecast,
  fetchLatLonForecast: fetchLatLonForecast
};
