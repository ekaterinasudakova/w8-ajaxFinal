
var TwitterApi = (function(options) {

	const btn = document.getElementById('btn1');
	const btn2 = document.getElementById('btn2');

	const queryEl = document.getElementById('query');
    const handleEl = document.getElementById('handle');
    const resultsUl = document.getElementById('results');

	
	


	var shared = {};
	// var options = options || {};

	function setupListeners() {
		console.log('setupListeners()');
        btn.addEventListener('click', function(e){
            e.preventDefault();
            const handleTerm = handleEl.value;
            search_timeline(handleTerm);
        });

        btn2.addEventListener('click', function(e){
            e.preventDefault();
            const queryTerm = queryEl.value;
            search(queryTerm);
        });
        
    }
    
    function displayData(tweet){

        let tweetText = tweet.text;
        console.log(`tweetText: `, tweetText);
        let tweetScreenName = tweet.user.screen_name;
        // console.log(`tweetUser: `, tweetUser);
        let tweetUserName = tweet.user.name;
        // console.log(`tweetUserName: `, tweetUserName);
        let tweetUserImgUrl = tweet.user.profile_image_url;
        // console.log(tweet.user.profile_image_url);
        let tweetTimeStamp = tweet.created_at;
        // console.log(`tweet time stamp: `, tweetTimeStamp);
        const liEl = document.createElement('li');
        const imgEl = document.createElement('img');

        const textPEl = document.createElement('p');
        const screenNamePEl = document.createElement('p');
        const userNamePEl = document.createElement('p');
        const timeStampPEl = document.createElement('p');

        imgEl.src = tweetUserImgUrl;
        textPEl.innerHTML = tweetText;
        screenNamePEl.innerHTML = `Screen Name: ` + tweetScreenName;
        userNamePEl.innerHTML = `User Name: ` + tweetUserName;
        timeStampPEl.innerHTML = `Time Stamp: ` + tweetTimeStamp;

        liEl.appendChild(imgEl);
        liEl.appendChild(textPEl);
        liEl.appendChild(screenNamePEl);
        liEl.appendChild(userNamePEl);
        liEl.appendChild(timeStampPEl);

        resultsUl.appendChild(liEl);



    }
    //shared.displayData = displayData

	function processTheData (tweetArray, resultsUl){
		if (tweetArray.length) {
			resultsUl.innerHTML = '';
			for (var i = 0; i <= tweetArray.length - 1; i++) {
                var tempArrayElement = tweetArray[i];
                // console.log(tempArrayElement);			
				displayData(tempArrayElement);
            }
        }
	}

	function search (queryTerm){
        
        axios.get('twitter-proxy.php', {
            params: {
              'op': 'search_tweets',
              'q': queryTerm
            }
          }).then(function(response){
            console.log(`searching tweets response: `, response);
            processTheData(response.data.statuses, resultsUl);
        })

	}

	function search_timeline(handleTerm){
       
        axios.get('twitter-proxy.php', {
            params: {
              'op': 'user_timeline',
              'screen_name': handleTerm
            }
          }).then(function(response){
            console.log(`searching timelines response: `, response);
            processTheData(response.data, resultsUl);
        })

    }

	//our entry point to make everything work
	var init = function() {
        console.log('init()');
        setupListeners();
	};

	//assigning the init function to the shared object makes it public
	shared.init = init;
	//return the object
	return shared;
}());

TwitterApi.init();