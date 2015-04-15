$(document).ready(function() {
  var player;

  var runMusic = function(link){
    if(!player){
      return;
    }
  
    var index = $(link).data('index');
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
    $(player).data('current-track', index);
    player.volume = 0.10;
    player.load();
    player.play();
  
  };

  $('.pin').click(function() {
    var index = $(this).data('index');
    
    player = $('#player_'+index)[0];

    player.addEventListener('ended',function(e){
      var next = $(this).data('current-track') + 1;
      var tracks = $('#playlist_'+index).find('li a');
      var len = tracks.length - 1;

      if(next > len){
        next = 0;
      }      

      console.log(next);
      runMusic($(tracks[next]));
    });

    $('.player').hide();
    $('#album_'+index).slideToggle();
  });

  $('.player ol.list li a').click(function(e){
    e.preventDefault(); 
    console.log($(player).data('current-track'));
    runMusic($(this));
    console.log($(player).data('current-track'));
  });
});
