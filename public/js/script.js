console.log('The file is loaded');

const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

//messageOne.textContent = 'test';

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const location = searchElement.value;
	messageTwo.textContent = 'Loading';
	messageOne.textContent = '';
	fetch('http://localhost:3000/weather?address=' + location).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				messageTwo.textContent = data.error;
			} else {
				messageOne.textContent = data.location;
				messageTwo.textContent = data.forecast;
			}
		});	
	});

});