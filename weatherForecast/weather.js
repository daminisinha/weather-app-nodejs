const request = require('request');

const weatherForecastFunction = (results,callback)=>{
let weatherUrl = require('../playground/weatherForecast'); 
let weather =  weatherUrl.weather+results.latitude+","+results.longitude; 
request({
    url:weather,
    json:true
},(error,response,body)=>{
    if(!error && response.statusCode ===200){
        callback(undefined,{
         temperature:body.currently.temperature,
         apparentTemperature:body.currently.apparentTemperature
        });                            
    }
    else {
        callback('Unable to fetch weather.');
    }                                                           
})
};

module.exports.weatherForecastFunction =weatherForecastFunction;