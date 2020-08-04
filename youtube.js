// YouTube API CALL 
var key = "AIzaSyBihort7mkhzu-EAB_W3I-b1s6RIXYGgl8";
var queryURL = "https://www.googleapis.com/youtube/v3/search?maxResults=1&q=NASA&key=" + key;


function getYouTubeVideo() {

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    
    .then(function (response) {
        console.log(queryURL);
        console.log(response);
    });
}

