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
    $('.playlist.playing').removeClass('playing');
    $('#'+albumId+' .playlist').addClass('playing');


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
      var tracks = $('#'+albumId+' .player .list .track');
      var len = tracks.length - 1;

      if(next > len){
        next = 0;
      }

      runMusic($(tracks[next]), albumId);
    });
  });

  $('.player .track a').click(function(e){
    e.preventDefault();
    var albumId = $(this).data('album-id');
    runMusic($(this), albumId);
  });
});
