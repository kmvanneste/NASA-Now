$(document).ready((x) => {
  // YouTube API CALL
  var key = "AIzaSyDSRviXZqJhq-NfohY5q1hhxdjdbnqnPc4";
  // "AIzaSyBihort7mkhzu-EAB_W3I-b1s6RIXYGgl8";
  // AIzaSyDSRviXZqJhq-NfohY5q1hhxdjdbnqnPc4
  var queryURL =
    "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=video&q=NASA&key=" +
    key;

  $.ajax({
    url: queryURL,
    method: "GET",
  })
  .then(function (response) {
    console.log(queryURL);
    console.log(response);

    onYouTubeIframeAPIReady();
    onPlayerReady(event);
    stopVideo();
    youTubeModal();

  });

    // YouTube Provided iFrame
      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: 'R_mO5uu853I',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }
      }
      function stopVideo() {
        player.stopVideo();
      }

      function youTubeModal() {
        var trigger = $("body").find('[data-toggle="modal"]');
        trigger.click(function () {
            var theModal = $(this).data("target"),
                videoSRC = $(this).attr("data-theVideo"),
                videoSRCauto = videoSRC + "?autoplay=1";
            $(theModal + ' iframe').attr('src', videoSRCauto);
        });
    }
  
});


// // SAVING BUT PROB DONT NEED

// $(document).ready((x) => {
//   // YouTube API CALL
//   var key = "AIzaSyDSRviXZqJhq-NfohY5q1hhxdjdbnqnPc4";
//   // "AIzaSyBihort7mkhzu-EAB_W3I-b1s6RIXYGgl8";
//   // AIzaSyDSRviXZqJhq-NfohY5q1hhxdjdbnqnPc4
//   var queryURL =
//     "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=video&q=NASA&key=" +
//     key;

//   $.ajax({
//     url: queryURL,
//     method: "GET",
//   })
//   .then(function (response) {
//     console.log(queryURL);
//     console.log(response);

//     onYouTubeIframeAPIReady(response.items[0].id.videoID);
//     // onPlayerReady(event);
//     // stopVideo();
//     autoPlayYouTubeModal();

//     var videoIDResponse = response.items[0].id.videoID;

//     // YouTube Provided iFrame
//     var tag = document.createElement("script");

//     tag.src = "https://www.youtube.com/iframe_api";
//     var firstScriptTag = document.getElementsByTagName("script")[0];
//     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//     // This function creates an <iframe> (and YouTube player)
//     // after the API code downloads.
//     var player;
//     function onYouTubeIframeAPIReady(videoID) {
//       player = new YT.Player("player", {
//         // height: "390",
//         // width: "640",
//         videoId: videoID,
//         playerVars: { 'rel': 0}

        
//       });
//     }

//     // Modal function to get and play youtube video from data tag
//     function autoPlayYouTubeModal() {

//       // finds modal in body of html
//       var trigger = $("body").find('[data-toggle="modal"]');

//       // on click
//       trigger.on("click", function() {

//         var theModal = $(this).data("target");
//         var videoSRC = $(this).attr("https://www.youtube.com/embed/" + videoIDResponse); 
//         var videoSRCauto = videoSRC +"?autoplay=1";

//       $(theModal + 'iframe').attr('src', videoSRCauto);

//       $(theModal + 'button.close').on("click", function() {

//         $(theModal + 'iframe').attr('src', videoSRC);

//       });
//       });


//     }