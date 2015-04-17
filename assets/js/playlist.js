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
    var album =  $('.album.open');
    if(!!album){
      $('.playlist').removeClass('playing').removeClass('paused');
      album.find('.playlist').addClass('playing');
    }


    player.volume = 0.10;
    player.load();
    player.play();

    $('.album.open .player').animate({
      scrollTop: link.position().top
    }, 500);

  };

  var openAlbum = function(album){
    var next = album.next();
    var thisOne = album;

    while(next.length > 0 && 
          thisOne.position().top == next.position().top)
    {
      thisOne = next;
      next = next.next();
    }


    $('.album.open').remove();
    var albumCloned =  album.clone().addClass('open');
    albumCloned.insertAfter(thisOne);

    $('html, body').animate({
      scrollTop: albumCloned.position().top
    }, 'medium');
  };

  var initPlayer = function(){
    player = $('.album.open .playlist .player audio')[0];

    $(player).on('ended',function(e){
      changeMusic(1);
    });
  };

  var getAlbum = function(element){
    if(element.is('.album')){
      return element;
    }else if( element.is('html')){
      return false;
    }
    return getAlbum(element.parent());
  };

  $('.album:not(.open) .btn-play').click(function() {
    openAlbum(getAlbum($(this)));
    initPlayer();
    changeMusic(0);
  });

  $('.album .cover').click(function() {
    openAlbum(getAlbum($(this)));
    initPlayer();
  });

  $('#music').on('click','.player .track a',function(e){
    e.preventDefault();
    runMusic($(this));
  });

  $('#music').on('click', '.btn-play', function() {
    if($('.playlist.paused').size() > 0){
      $('.playlist.paused audio')[0].play();
      $('.playlist.paused').removeClass('paused').addClass('playing');
    }else{
      var track = $('.album.open .track a').first();
      runMusic(track);
    }
  });

  $('#music').on('click','.btn-pause',function() {
    $('.playlist.playing audio')[0].pause();
    $('.playlist.playing').removeClass('playing').addClass('paused');
  });

  var changeMusic = function(direction){
    var position = $('.album.open .player audio').data('current-track') + direction;
    var tracks = $('.album.open .track a');
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
});
