$(document).ready((x) => {
  // YouTube API CALL
  var key = "AIzaSyBihort7mkhzu-EAB_W3I-b1s6RIXYGgl8";
  var queryURL =
    "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=NASA&key=" +
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
  });

  // YouTube Provided iFrame
  var tag = document.createElement("script");

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  var player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
      height: "390",
      width: "640",
      videoId: "M7lc1UVf-VE",
      playerVars: { 'rel': 0}
    });
  }

  // 4. The API will call this function when the video player is ready.
  function onPlayerReady(event) {
    event.target.playVideo();
  }

  function stopVideo() {
    player.stopVideo();
  }

  
});
