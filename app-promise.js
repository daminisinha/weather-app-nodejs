const yargs = require('yargs');
const axios = require('axios');

const argv = yargs 
        .options({
            a:{
                demand:true,
                alias:'address',
                describe:'Address to fetch weather for',
                string:true
            }
        })
        .help()
        .alias('help','h')
        .argv;

const encodedInput = encodeURIComponent(argv.address);  
let url = require('./playground/map');
url = url +`&address=${encodedInput}`;

axios.get(url).then((response)=>{
    if(response.data.status ==='ZERO_RESULTS'){
        throw new Error('Unable to find that address.')
    } 
var latitude = response.data.results[0].geometry.location.lat;
var longitude = response.data.results[0].geometry.location.lng;
let weatherUrl = require('./playground/weatherForecast'); 
let weather =  weatherUrl.weather+latitude+","+longitude;  
    console.log(`Address : ${response.data.results[0].formatted_address}`);
    return axios.get(weather);
}).then((response)=>{
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`)
}).catch((e) =>{ 
    if(e.code === 'ENOTFOUND'){
        console.log('Unable to connect to API servers.')
    }else{
        console.log(e.message);
    }
});

       
