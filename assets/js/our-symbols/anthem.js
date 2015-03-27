



// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    width: '100%',
    videoId: '3n_yPdENttY',
    events: {
      'onReady': onPlayerReady
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  var playerLastTime = player.getCurrentTime();
  var time = setInterval(function(){
    var timeHasChanged = playerLastTime == player.getCurrentTime() ? false : true;
    if(timeHasChanged) {
      updateSubtitlesContainer();
      playerLastTime = player.getCurrentTime();
    }
  }, 100);
}

function updateSubtitlesContainer() {
  var playerCurrentTime = player.getCurrentTime();
  $('.sub').each(function(){

    var subStartTime = getSeconds($(this).attr('data-start'));
    var subEndTime = getSeconds($(this).attr('data-end'));

    if(subStartTime <= playerCurrentTime && subEndTime >= playerCurrentTime) {
      activate($(this));
    }
  });
}



$(document).ready(function() {

  $('.sub').click(function(){
    player.seekTo(getSeconds($(this).attr('data-start')));
    console.log(getSeconds($(this).attr('data-start')))
  });

  $('.sub').dblclick(function(){
    if(player.getPlayerState() === 2) {
      player.playVideo();
    } else {
      player.pauseVideo();
    }
  });

});

function getSeconds(time) {
  min = time.split(':')[0];
  sec = time.split(':')[1];
  return parseInt(min * 60) + parseInt(sec);
}

function activate(element) {
  $('.sub').removeClass('active');
  element.addClass('active');
  $('#marker').offset({top: element.offset().top, left: element.offset().left - 25 });
}
