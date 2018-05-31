
var TwitterApi = (function(options) {

	const btn = document.getElementById('btn1');
	const btn2 = document.getElementById('btn2');

	const queryEl = document.getElementById('query');
	const handleEl = document.getElementById('handle');

	const queryTerm = queryEl.value;
	const handleTerm = handleEl.value;


	var shared = {};
	// var options = options || {};

	function setupListeners() {
		console.log('setupListeners()');
        btn.addEventListener('click', function(e){
            e.preventDefault();
            search(e);
        });

        btn2.addEventListener('click', function(e){
            e.preventDefault();
            search_timeline(e);
        });
        
	}

	function processTheData (tweetArray, resultUl){
		
	}

	function search (e){
        
        axios.get(‘twitter-proxy.php’, {
            ‘op’:‘search_tweets’,
             ‘q’:queryTerm})

        .then(function(response){
            console.log(`response: `, response);
            processTheData(response.data);
        })

	}

	function search_timeline(e){
        evt.preventDefault();
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