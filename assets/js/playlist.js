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
    var album =  $('.open .album');
    if(!!album){
      $('.playlist').removeClass('playing').removeClass('paused');
      album.find('.playlist').addClass('playing');
    }


    player.volume = 0.10;
    player.load();
    player.play();

    $('.open .album .player').animate({
      scrollTop: link.position().top
    }, 500);

  };


  var initPlayer = function(){
    player = $('.open .album .playlist .player audio')[0];

    $(player).on('ended',function(e){
      changeMusic(1);
    });

    player.addEventListener('loadstart', function(){
      $('.open .track.active').addClass('loading');
    }, false);

    player.addEventListener('canplay', function(){
      $('.open .track.active.loading').removeClass('loading').addClass('listening');
    }, false);

    $(player).bind('timeupdate', function() {
      var getDuration = function(milleseconds){
        var rem = parseInt(milleseconds, 10),
        //pos = (player.currentTime / player.duration) * 100,
        mins = Math.floor(rem/60,10),
        secs = rem - mins*60;

        return mins + ':' + (secs > 9 ? secs : '0' + secs);
      };

      $('.open .time .current').text(getDuration(player.currentTime));
      $('.open .time .total').text(getDuration(player.duration));
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



  $('#music').on('click','.player .track a',function(e){
    e.preventDefault();
    runMusic($(this));
  });

  $('#music').on('click', '.btn-play', function() {
    if($('.playlist.paused').size() > 0){
      $('.playlist.paused audio')[0].play();
      $('.playlist.paused').removeClass('paused').addClass('playing');
    }else{
      var track = $('.open .album .track a').first();
      runMusic(track);
    }
  });

  $('#music').on('click','.btn-pause',function() {
    $('.playlist.playing audio')[0].pause();
    $('.playlist.playing').removeClass('playing').addClass('paused');
  });

  var changeMusic = function(direction){
    var position = $('.open .album .player audio').data('current-track') + direction;
    var tracks = $('.open .album .track a');
    var len = tracks.length - 1;

    if(position > len){
      position = 0;
    }else if (position < 0) {
      position = len;
    }
    runMusic($(tracks[position]));
  };

  $('#music').on('click','.btn-prev', function(){
    changeMusic(-1);
  });

  $('#music').on('click','.btn-next', function(){
    changeMusic(1);
  });




  var closeAll = function() {
      $('#albuns .open').each(function() {
        var parent = $(this);
        var top = parent.offset().top;
        var left = parent.offset().left;
        var width = parent.width();

        $(this).removeClass('open')
          .find('.album').offset({top: top, left: left }).width(width);
      });
  }

  var openAlbum = function(album) {
    closeAll();
    var parent = getParent(album, 'li');
    var top = parent.offset().top + parent.height() + 10;
    var left = $('#albuns').offset().left;
    var width = $('#albuns').width();
    parent.addClass('open').find('.album');
    album.offset({top: top, left: left}).width(width);

    parent.css('background-image', 'url('+ parent.find('.cover img').attr('src') +')');
    $('body, html').animate({
      scrollTop: parent.offset().top + 200
    }, 500);

    initPlayer();
  }

  $(window).resize(function() {
    var left = 0;
    var width = $(document).width();
    $('.open .album').offset({top: top, left: left}).width(width);
  });

  $('#albuns').on('click', 'li:not(.open) .cover', function() {
    openAlbum(getParent($(this), '.album'));
  });

  $('li:not(.open) .album .btn-play').click(function() {
    openAlbum(getParent($(this), '.album'));
    changeMusic(0);
  });

});
