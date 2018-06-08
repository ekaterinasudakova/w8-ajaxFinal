var YelpModule = (function(){

	const API_KEY = "2-eO6_aZS3e3d9Q35TFJ8OAyiFXsSS9X3jqYz_A2fMGZjwnckl6kDHcqJRuF-T261k7jC6qWLnEUIvi5-l-qw7JeHANXoNtnF3Y0VC02R-KJywyBqm5vI6TISGPiWnYx";

	const termEl = document.getElementById('term');
	const locationEl = document.getElementById('location');
	const searchBtn = document.getElementById('search');
	const resultsEl = document.getElementById('results');

	const results = [];



	searchBtn.addEventListener('click', function(e){
		e.preventDefault();
		const queryTerm = termEl.value;
		const location = locationEl.value;
		const prices = getCheckedValues(document.querySelectorAll('[name=price]:checked'));
		console.log(`The business type you entered is: `, queryTerm);
		console.log(`The location you entered is: `, location);

		searchYelp({
			'location': location,
			'term': queryTerm,
			'price': prices
		});

    })


    let resultContainer = document.querySelector('#results');


    resultContainer.addEventListener('click', function(event){
        var elClicked = event.target;
        console.log(elClicked);
        var title = elClicked.getAttribute('data-title');
        TwitterApi.search(title);
    });
    

	function getCheckedValues(checkedItems){
		console.log('checkedItems', checkedItems)


		const checkedValues = [...checkedItems].map(function(checkedItem){
			return checkedItem.value;
		})
		const allChecked = checkedValues.join(',');
		console.log('allChecked', allChecked)

		return allChecked
    }
    

//THIS IS WHERE YOU GRAB THE STUFF YOU NEED FROM THE INFORMATION YOU GRABBED FROM YELP
//THIS IS ALSO WHERE YOU APPEND THE ELEMENTS TO THE PAGE
	function displayArticle(article){
		console.log("THIS", article)
		const title = article.name;
		// pick any kind of default fallback image
		let thumbnail = article.image_url;
		const url = article.url;

		const liEl = document.createElement('li');
		const linkEl = document.createElement('a');
		const imgEl = document.createElement('img');

		const pOneEl = document.createElement('p');
		const pTwoEl = document.createElement('p');
        const pThreeEl = document.createElement('p');
        const button = document.createElement('button');

		

		const pEl = document.createTextNode(title);
		//url
		linkEl.href = url;
		//image
		imgEl.src = thumbnail;
		//address
		pOneEl.innerHTML = article.location.address1 + "," + "<br/>" + article.location.address2;
        //money
        if(article.price){
            pTwoEl.innerHTML = article.price;   
        }
		//rating
        pThreeEl.innerHTML = article.rating;
        
        button.innerHTML = "search twitter";
        button.setAttribute('data-title', title);

		liEl.appendChild(linkEl);
		linkEl.appendChild(pEl);
		liEl.appendChild(imgEl);
		liEl.appendChild(pOneEl);
		liEl.appendChild(pTwoEl);
        liEl.appendChild(pThreeEl);
        liEl.appendChild(button);

		resultsEl.appendChild(liEl);

		results.push({
			lat: article.coordinates.latitude,
			lng: article.coordinates.longitude
		})
	}

//THIS IS WHERE YOU LOOP THROUGH ALL YOUR RESULTS AND PULL OUT EACH RESULT TO THEN SEND
//TO DIFFERENT FUNCTION TO FIND ALL NEEDED ELEMENTS AND APPEND THEM
	function displayArticles(articleArray) {
		console.log("HeyO");
		console.log(articleArray.length);
		if (articleArray.length) {
			resultsEl.innerHTML = '';
			for (var i = 0; i <= articleArray.length - 1; i++) {
                var tempArrayElement = articleArray[i];	
                		
				displayArticle(tempArrayElement);
			}
			// now add the new results	
			console.log("Here I am")
		}	
	}

	function searchYelp(options){
		const searchParams = Object.assign({}, options, {
			'_ep': '/businesses/search',
		})
		console.log('searchParams', searchParams)

		axios.get('https://circuslabs.net/proxies/yelp-fusion-proxy/', {
  			params: searchParams,
  			headers: {
  				'Authorization': 'Bearer ' + API_KEY
  			}
  		})
		
		.then(function (response) {
			console.log('here is the response data from key:', response.data, response)

            displayArticles(response.data.businesses);
		})	
	}

		return{
			search: searchYelp
		} 

})()