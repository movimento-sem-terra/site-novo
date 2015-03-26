$(document).ready(function() {

  $(window).scroll(function() {
    if(distanceFromTop($('#our-flag')) < 260) {
      $('#our-flag').removeClass('decomposited');
    } else {
      $('#our-flag').addClass('decomposited');
    }
  });

  $(window).scrollTop(1);


  var distanceFromTop = function(element) {
    return element.offset().top - $(window).scrollTop();
  }

  var distanceFromBottom = function(element) {
    return element.offset().top - $(window).scrollTop() - $(window).height() ;
  }

  var activate = function(target) {
    $('#symbols-meaning li').removeClass('active');
    $('li[data-for='+ target +']').addClass('active');

    $('#flag img').removeClass('active').css('opacity', .07);
    $(target).addClass('active').css('opacity', 1);
  }

  $('#symbols-meaning li').click(function() {
    var target = $(this).attr('data-for');
    activate(target);
  });

  $('#flag img').click(function() {
    var target = '#' + $(this).attr('id');
    activate(target);
  });



});
