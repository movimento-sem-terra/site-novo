$(document).ready(function() {

  $(window).scroll(function() {
    if(distanceFromTop($('#our-flag')) < 260) {
      $('#our-flag').removeClass('decomposited');
    } else {
      $('#our-flag').addClass('decomposited');
    }
  });

  $(window).scrollTop(1);


  $('#flag img').hover(function() {
    $('#flag img').css('opacity', .2);
    $(this).css('opacity', 1);
  }, function(){
    $('#flag img').css('opacity', 1);
  });


  var distanceFromTop = function(element) {
    return element.offset().top - $(window).scrollTop();
  }

  var distanceFromBottom = function(element) {
    return element.offset().top - $(window).scrollTop() - $(window).height() ;
  }

});
