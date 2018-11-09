const geocode = require('./geocode/geocode');
const weather = require('./weatherForecast/weather');
const request = require('request');
const yargs = require('yargs');

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

       geocode.geocodeAddress(argv.a, (errorMessage,results) => {
            if(errorMessage){
                console.log(errorMessage)
            }else{
                console.log(results.address);
                weather.weatherForecastFunction(results,(errorMessage,message)=>{
                    if(errorMessage){
                        console.log(errorMessage)
                    }else{
                        console.log(`It's currently ${message.temperature}. It feels like ${message.apparentTemperature}`)
                    }
                });
                
            };
        });
    

       
