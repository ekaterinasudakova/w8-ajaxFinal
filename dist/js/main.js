'use strict';

var TwitterApi = function (options) {

    var btn = document.getElementById('btn1');
    var btn2 = document.getElementById('btn2');

    var queryEl = document.getElementById('query');
    var handleEl = document.getElementById('handle');
    var resultsUl = document.getElementById('results');

    var shared = {};
    // var options = options || {};

    // function setupListeners() {
    // 	console.log('setupListeners()');
    //     btn.addEventListener('click', function(e){
    //         e.preventDefault();
    //         const handleTerm = handleEl.value;
    //         search_timeline(handleTerm);
    //     });

    //     btn2.addEventListener('click', function(e){
    //         e.preventDefault();
    //         const queryTerm = queryEl.value;
    //         search(queryTerm);
    //     });

    // }

    function displayData(tweet) {

        var tweetText = tweet.text;
        console.log('tweetText: ', tweetText);
        var tweetScreenName = tweet.user.screen_name;
        // console.log(`tweetUser: `, tweetUser);
        var tweetUserName = tweet.user.name;
        // console.log(`tweetUserName: `, tweetUserName);
        var tweetUserImgUrl = tweet.user.profile_image_url;
        // console.log(tweet.user.profile_image_url);
        var tweetTimeStamp = tweet.created_at;
        // console.log(`tweet time stamp: `, tweetTimeStamp);
        var liEl = document.createElement('li');
        var imgEl = document.createElement('img');

        var textPEl = document.createElement('p');
        var screenNamePEl = document.createElement('p');
        var userNamePEl = document.createElement('p');
        var timeStampPEl = document.createElement('p');

        imgEl.src = tweetUserImgUrl;
        textPEl.innerHTML = tweetText;
        screenNamePEl.innerHTML = 'Screen Name: ' + tweetScreenName;
        userNamePEl.innerHTML = 'User Name: ' + tweetUserName;
        timeStampPEl.innerHTML = 'Time Stamp: ' + tweetTimeStamp;

        liEl.appendChild(imgEl);
        liEl.appendChild(textPEl);
        liEl.appendChild(screenNamePEl);
        liEl.appendChild(userNamePEl);
        liEl.appendChild(timeStampPEl);

        resultsUl.appendChild(liEl);
    }
    //shared.displayData = displayData

    function processTheData(tweetArray, resultsUl) {
        if (tweetArray.length) {
            resultsUl.innerHTML = '';
            for (var i = 0; i <= tweetArray.length - 1; i++) {
                var tempArrayElement = tweetArray[i];
                // console.log(tempArrayElement);			
                displayData(tempArrayElement);
            }
        }
    }

    function search(queryTerm) {

        axios.get('twitter-proxy.php', {
            params: {
                'op': 'search_tweets',
                'q': queryTerm
            }
        }).then(function (response) {
            console.log('searching tweets response: ', response);
            processTheData(response.data.statuses, resultsUl);
        });
    }

    shared.search = search;

    // function search_timeline(handleTerm){

    //     axios.get('twitter-proxy.php', {
    //         params: {
    //           'op': 'user_timeline',
    //           'screen_name': handleTerm
    //         }
    //       }).then(function(response){
    //         console.log(`searching timelines response: `, response);
    //         processTheData(response.data, resultsUl);
    //     })

    // }

    //our entry point to make everything work
    var init = function init() {
        console.log('init()');
        setupListeners();
    };

    //assigning the init function to the shared object makes it public
    shared.init = init;
    //return the object
    return shared;
}();

TwitterApi.init();
//# sourceMappingURL=main.js.map
