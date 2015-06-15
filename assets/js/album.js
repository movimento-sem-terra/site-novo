$(document).ready(function() {
  var player;

  var runMusic = function(link){
    if(!player){
      return;
    }

    var trackIndex = $(link).data('index');
    var src = { ogg: link.data('ogg'),
                mp3: link.data('mp3')};

    if (player.canPlayType('audio/mpeg;')) {
      player.type = 'audio/mpeg';
      player.src  = src.mp3;
    } else {
      player.type = 'application/ogg';
      player.src  = src.ogg;
    }

    var parent = link.parent();
    parent.addClass('active').siblings().removeClass('active');


    //start player
    $(player).data('current-track', trackIndex);
    //show pause button
    var album =  $('.album');
    if(!!album){
      $('.playlist').removeClass('playing').removeClass('paused');
      album.find('.playlist').addClass('playing');
    }

    player.volume = 0.10;
    player.load();
    player.play();

    $('.album .player').animate({
      scrollTop: link.position().top
    }, 500);

  };


  var initPlayer = function(){
    player = $('.album .playlist .player audio')[0];

    $(player).on('ended',function(e){
      changeMusic(1);
    });

    player.addEventListener('loadstart', function(){
      $('.track.active').addClass('loading');
    }, false);

    player.addEventListener('canplay', function(){
      $('.track.active.loading').removeClass('loading').addClass('listening');
    }, false);

    $('.album .playlist progress').click(function(event){
      var jumpToTime = event.offsetX / this.offsetWidth;
      $(this).attr('value', jumpToTime);
      player.currentTime = ( player.duration * jumpToTime );
    });


    $(player).bind('timeupdate', function() {
      var getDuration = function(milleseconds){
        if(!$.isNumeric(milleseconds)){
          return '0:00';
        }
        var rem = parseInt(milleseconds, 10),
        //pos = (player.currentTime / player.duration) * 100,
        mins = Math.floor(rem/60,10),
        secs = rem - mins*60;

        return mins + ':' + (secs > 9 ? secs : '0' + secs);
      };

      var duration = getDuration(player.duration);
      var current  = getDuration(player.currentTime);

      $('.time .current').text(current);
      $('.time .total').text(duration);

      $('.album .playlist progress').attr('value', player.currentTime / player.duration);
    });
  };


  var getParent = function(element, parent){
    if(element.is(parent)){
      return element;
    } else if( element.is('html')){
      return false;
    }
    return getParent(element.parent(), parent);
  };



  $('.album').on('click','.player .track a',function(e){
    e.preventDefault();
    runMusic($(this));
  });

  $('.album').on('click', '.btn-play', function() {
    var album = getParent($(this),'.album');
    var playlist = album.find('.playlist');

    if(playlist.hasClass('paused')){
      album.find('audio').get(0).play();
      playlist.removeClass('paused').addClass('playing');
    }else{
      var track = album.find('.track a').first();
      runMusic(track);
    }
  });

  $('.album').on('click','.btn-pause',function() {
    var album = getParent($(this),'.album');
    var playlist = album.find('.playlist');
    album.find('audio').get(0).pause();
    playlist.removeClass('playing').addClass('paused');
  });

  var changeMusic = function(direction){
    var position = $('.album .player audio').data('current-track') + direction;
    var tracks = $('.album .track a');
    var len = tracks.length - 1;

    if(position > len){
      position = 0;
    }else if (position < 0) {
      position = len;
    }
    runMusic($(tracks[position]));
  };

  $('.album').on('click','.btn-prev', function(){
    changeMusic(-1);
  });

  $('.album').on('click','.btn-next', function(){
    changeMusic(1);
  });

  initPlayer();
});
