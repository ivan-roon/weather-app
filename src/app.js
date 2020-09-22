const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const getForecast = require('./utils/forecast');

const app = express();

//Define configs for Express
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Set up views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Set up static assets
app.use(express.static(publicDirectory));


app.get('/', (req, res) => {
	res.render('index', {
		title: 'Main',
		name: 'Ivan',
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		name: 'Ivan',
		title: 'About',
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		name: 'Ivan',
		appName: 'WeatherApp',
	})
});

app.get('/weather', (req, res) => {
	console.log(req.query);
	if(!req.query.address) {
		return res.send({
			error: 'No address set',
		});
	}
	
	geocode(req.query.address, (error, { longtitude, latitude, location } = {}) => {
		if (error) {
			return res.send({ error });
		}

		getForecast(latitude, longtitude, (error, forecastData) => {
			if (error) {
				return res.send({ error  });
			}

			res.send({
				forecast: forecastData,
				location,
				address: req.query.address,
			})
		});
	});
});


app.get('/help/*', (req, res) => {
	res.render('404', {
		title: 'Error',
		name: 'Ivan',
		message: 'This help page does not exist',
	});	
});

app.get('*', (req, res) => {
	res.render('404', {
		title: 'Error',
		name: 'Ivan',
		message: 'Page not found',
	})
});

app.listen(3000, () => {
	console.log('Server is up on port 3000');
});
