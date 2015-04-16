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
    var albumId = link.data('album-id');
    if(!!albumId){
      $('.playlist').removeClass('playing').removeClass('paused');
      $('#'+albumId+' .playlist').addClass('playing');
    }


    player.volume = 0.10;
    player.load();
    player.play();

  };

  $('.album .cover').click(function() {
    $('.album.open').removeClass('open');
    $(this).parent().toggleClass('open');
    player = $(this).find(' ~ .playlist .player audio')[0];

    $(player).on('ended',function(e){
      changeMusic(1);
    });
  });

  $('.player .track a').click(function(e){
    e.preventDefault();
    runMusic($(this));
  });

  $('.btn-play').click(function() {
    if($('.playlist.paused').size() > 0){
      $('.playlist.paused audio')[0].play();
      $('.playlist.paused').removeClass('paused').addClass('playing');
    }else{
      var track = $('.album.open .track a').first();
      runMusic(track);
    }
  });

  $('.btn-pause').click(function() {
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

  $('.btn-prev').click(function(){
    changeMusic(-1);
  });

  $('.btn-next').click(function(){
    changeMusic(1);
  });
});
