const animals = [
			'Elephant',
			'Eagle',
			'Fish',
			'Lion',
			'Dog',
			'Leopard',
			'Bat',
			'Cat',
			'Monkey',
			'Bongo',
			'Python',
			'Deer',
			'Whales',
			'Wolf',
			'Kangaroo',
			'sheep',
			'Camel'
		];

		//render html
		function renderAnimal() {
			//loop through the animal array to render the populate the page with the animal
			animals.forEach(animal => {
				//creates button for each animal in the array
				let item = $('<button>');
				item.addClass('animal')
					.attr('id', animal)
					.css({
						backgroundColor: 'blue',
						color: 'white',
						margin: '10px',
						width: '150px',
						padding: '10px',
						fontSize: '20px',

					})
					//apply hover color to the button
					.hover(function (e) {
						$(this).css('background-color', e.type === 'mouseenter' ? 'Teal' : 'blue');
					})

					.text(animal)
					//append the animals to the page
					.appendTo('#animal-buttons');
			});
		}

		$('#input-button').on('click', function (event) {
			//prevent browser default
			event.preventDefault();
			//empty the animal array
			$('#animal-buttons').empty();
			let animalAdded = $('#animal-input')
				.val()
				.trim();
			//check animal added is already exist or nothing is typed in the input box
			for (var i = 0; i < animals.length; i++) {
				if (animals.includes(animalAdded) || animalAdded.length === 0) {
					$('#animal-input').val('');
					$('#animal-buttons').empty();
					renderAnimal();
					return false;
				} else {
					//test
					console.log('Animal Added: ' + animalAdded);
					animals.push(animalAdded);
					renderAnimal();
					$('#animal-input').val('');
				}
			}
		});
		renderAnimal();

		$(document.body).on('click', '.animal', function () {
			//giphy api key
			const apiKey = 'vL5PfNP79JhSnylWQQIL9q21wNGcdgd5';
			//stores name of animal clicked
			let animalPick = $(this).attr('id');
			//test
			console.log('Animal Picked: ' + animalPick);

			//get giphy url
			let queryURL =
				'https:api.giphy.com/v1/gifs/search?api_key=' +
				apiKey +'&q=' + animalPick +'&limit=10&offset=0&rating=G&lang=en';

			// Performing our AJAX GET request
			$.ajax({
					url: queryURL,
					method: 'GET',
				})
				// After the data comes back from the API
				.then(function (response) {
					// Storing an array of results in the results variable
					var results = response.data;
					console.log(response)

					// Looping over every result item
					results.forEach(animal =>{

					
						// Only taking action if the photo has an appropriate rating
						if (animal.rating !== 'r' && animal.rating !== 'pg-13') {
							// Creating a div for the gif
							var gifDiv = $('<div>')
							gifDiv.css({
								border: '2px solid blue',
								color: 'black',
								margin: '3px',
								float: 'left'
							});

							// Storing the result item's rating
							var rating = animal.rating;

							// Creating a paragraph tag with the result item's rating
							var p = $('<p>').text('Rating: ' + rating);

							// Creating an image tag
							var animalImage = $('<img>');

							// Giving the image tag an src attribute of a proprty pulled off the
							// result item
							animalImage.attr('src', animal.images.fixed_height.url);

							// Appending the paragraph and personImage we created to the "gifDiv" div we created
							gifDiv.append(p);
							gifDiv.append(animalImage);

							// Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
							$('#images').prepend(gifDiv);
						}
					}) 
				});
		});