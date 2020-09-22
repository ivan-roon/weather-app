const request = require('request');


const getForecast = (latitude, longtitude, callback) => {
	const url = 'http://api.weatherstack.com/current?access_key=c52e988e43ce47a3914c0c80b35daab9&query=' + latitude + ',' + longtitude;
	request({ url, json: true  }, (error, response) => {
		const { body } = response;
		if(error) {
			callback('Not possible to access weatherstack API');
		} else if (body.error) {
			callback(`error: ${response.body.error.code},${response.body.error.type} ${response.body.error.info}`);
		} else {
			const currentWeather = body.current;
			callback(undefined, 'It is ' + currentWeather.temperature + ' degrees Celcius. ' + 'Humidity is ' +  currentWeather.humidity + '%.');
		}
	});
}; 

module.exports = getForecast;
