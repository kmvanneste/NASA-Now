$(document).ready((x) => {
  // YouTube API CALL
  var key = "AIzaSyDSRviXZqJhq-NfohY5q1hhxdjdbnqnPc4";
  var queryURL =
    "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=NASA&key=" +
    key;

  $.ajax({
    url: queryURL,
    method: "GET",
  })
  .then(function (response) {
    console.log(queryURL);
    console.log(response);

    onYouTubeIframeAPIReady(response.items[0].id.videoID);
    onPlayerReady(event);
    stopVideo();
    autoPlayYouTubeModal();
  });

  // YouTube Provided iFrame
  var tag = document.createElement("script");

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // This function creates an <iframe> (and YouTube player)
  // after the API code downloads.
  var player;
  function onYouTubeIframeAPIReady(videoID) {
    player = new YT.Player("player", {
      // height: "390",
      // width: "640",
      videoId: videoID,
      playerVars: { 'rel': 0}
    });
  }

  // The API will call this function when the video player is ready.
  // function onPlayerReady(event) {
  //   event.target.playVideo();
  // }

  // function stopVideo() {
  //   player.stopVideo();
  // }

  // Modal function to get and play youtube video from data tag
  function autoPlayYouTubeModal() {


    var trigger = $("body").find('[data-toggle="modal"]');


    trigger.on("click", function() {

      var theModal = $(this).data("target");
      var videoSRC = $(this).attr("data-theVideo"); 
      var videoSRCauto = videoSRC +"?autoplay=1";

    $(theModal + 'iframe').attr('src', videoSRCauto);

    $(theModal + 'button.close').on("click", function() {

      $(theModal + 'iframe').attr('src', videoSRC);

    });
    });


  }
  
});
