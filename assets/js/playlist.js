$(document).ready(function() {
  var player;

  var runMusic = function(link, albumId){
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
      var next = $(this).data('current-track') + 1;
      var tracks = $('#'+albumId+' .player .list .track a');
      var len = tracks.length - 1;

      if(next > len){
        next = 0;
      }

      runMusic($(tracks[next]));
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
      var track = $(this).find(' ~ .player .list .track a').first();
      runMusic(track);
    }
  });

  $('.btn-pause').click(function() {
    $('.playlist.playing audio')[0].pause();
    $('.playlist.playing').removeClass('playing').addClass('paused');
  });
});
