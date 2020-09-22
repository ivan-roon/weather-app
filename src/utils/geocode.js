const request = require('request');

const geocode = (address, callback) => {
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaXZhbi1rbCIsImEiOiJja2V4Ymt4ZTkzcWlsMnptcXU0eWZrOG5jIn0.EoKLWIJj9a8LlM6r8H19Lg';
	request({ url, json: true  }, (error, response) => {
		const { body } =  response;
		if(error) {
			callback('Unable to connect to location services');
		}
		else if (body.features.length === 0) {
			callback('Location not found');
		}
		else {
			const locationFeatures = body.features[0];
			callback(undefined, {
				latitude: locationFeatures.center[1],
				longtitude: locationFeatures.center[0],
				location: locationFeatures.place_name,
			});
		}
	});
};


module.exports = geocode;
