// YouTube API CALL 
    var key = "AIzaSyBihort7mkhzu-EAB_W3I-b1s6RIXYGgl8";
    var queryURL = "https://www.googleapis.com/youtube/v3/search?maxResults=1&q=NASA&key=" + key;
    var backgroundURL;


function getYouTubeVideo() {
    var queryURL = "https://api.nasa.gov/planetary/apod?api_key=" + nasakey;
   
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(response => {

        console.log(response);
    });

    //   function loadClient() {
    //     gapi.client.setApiKey("AIzaSyBihort7mkhzu-EAB_W3I-b1s6RIXYGgl8");
    //     return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    //         .then(function() { console.log("GAPI client loaded for API"); },
    //               function(err) { console.error("Error loading GAPI client for API", err); });
    //   }
    //   // Make sure the client is loaded and sign-in is complete before calling this method.
    //   function execute() {
    //     return gapi.client.youtube.search.list({
    //       "part": [
    //         "snippet"
    //       ],
    //       "maxResults": 3,
    //       "q": "NASA"
    //     })
    //         .then(function(response) {
    //                 // Handle the results here (response.result has the parsed body).
    //                 console.log("Response", response);
    //               },
    //               function(err) { console.error("Execute error", err); });
    //   }

}

$(document).ready(x => {
    getAPOD();
    getEPIC();
    getMars();
});
