import currentCityTemplate from '../templates/currentCity.hbs';
import debounce from 'lodash.debounce';
import fiveDays from './fiveDays';
import moreInfo from './moreInfo';




 const ref = {
    serchQuery: document.querySelector('.input_nav'),
     curentWeatherBlock: document.querySelector('.current_city_list'),
     fiveDaysWeatherBlock: document.querySelector('.five_days_list'),
    
};
ref.serchQuery.addEventListener('input', debounce(cityRequest,800));


function cityRequest(e) {
    let serchQuery = (e.target.value);
    if (serchQuery != '') {
        fetchCityWeather(serchQuery);
        fiveDays.fetchfiveDays(serchQuery);
        moreInfo.fetchMoreInfo(serchQuery);
        
    }
    
    
 }



function fetchCityWeather(serchQuery) {


    return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${serchQuery}&appid=2b30446187616e7178e0cd559ea22385&units=metric`)
        .then(res => res.json()).then(checkQuery).catch();
        
}
export default {fetchCityWeather, ref}


function checkQuery(data) {
    // console.log(data);
    if (data.cod === '404') {
        ref.curentWeatherBlock.innerHTML = '';


    }
    dataProcessing(data)
   

}

function dataProcessing({ name, sys: { country }, main: { temp, temp_min, temp_max }, weather }) {


    let roundTemp = Math.round(temp);
    let roundTemp_min = Math.round(temp_min);
    let roundTemp_max = Math.round(temp_max);
    let weatherDescription = (weather[0].description);
    let wearherIcon ='';
    if (weatherDescription === 'clear sky') {
        wearherIcon = './images/symbol-defs.svg#icon-clear_sky'
    } else if(weatherDescription === 'scattered clouds') {
        wearherIcon = './images/symbol-defs.svg#icon-scattered_clouds'
    } else if (weatherDescription === 'broken clouds') {
        wearherIcon = './images/symbol-defs.svg#icon-broken_clouds'
    } else if (weatherDescription === 'shower rain') {
        wearherIcon = './images/symbol-defs.svg#icon-shower_rain'
    } else if (weatherDescription === 'rain') {
        wearherIcon = './images/symbol-defs.svg#icon-rain'
    } else if (weatherDescription === 'thunderstorm') {
        wearherIcon = './images/symbol-defs.svg#icon-thunderstorm'
    } else if (weatherDescription === 'snow') {
        wearherIcon = './images/symbol-defs.svg#icon-snow'
    } else if (weatherDescription === 'mist') {
        wearherIcon = './images/symbol-defs.svg#icon-mist'
    } else {
        wearherIcon = './images/symbol-defs.svg#icon-few_clouds'
    }

        

        renderWeather(name,country,roundTemp,roundTemp_min,roundTemp_max, wearherIcon)
     
}





function renderWeather(name, country, temp, temp_min, temp_max, wearherIcon) {
    ref.curentWeatherBlock.innerHTML = currentCityTemplate({ name, country, temp, temp_min, temp_max, wearherIcon });
   }