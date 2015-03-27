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
    if($(target).is('.active')) {
      normalizeAll();
    } else {
      $('#symbols-meaning li').removeClass('active');
      $('li[data-for='+ target +']').addClass('active');

      $('#flag img').removeClass('active').css('opacity', .07);
      $(target).addClass('active').css('opacity', 1);
    }
  }

  var normalizeAll = function() {
    $('#flag img').removeClass('active').css('opacity', 1);
    $('#symbols-meaning .active').removeClass('active');
  }

  var hasActive = function() {
    return $('#flag .active').size() > 0;
  }

  $('#symbols-meaning li, #flag img').click(function() {
    var target = $(this).attr('data-for') ? $(this).attr('data-for') : '#' + $(this).attr('id');
    activate(target);
  });

  $('#flag img').not('.active').hover(function() {
    $('#flag img').not('.active').css('opacity', .07);
    var opacity = hasActive() ? .3 : 1;

    $(this).not('.active').css('opacity', opacity);
  }, function() {
    if(hasActive()) {
      $('#flag img').not('.active').css('opacity', .07);
    } else {
      normalizeAll();
    }

  });

  $('section').not('#our-flag').click(function() {
    normalizeAll();
  });

  var timeoutToFadeOut;

  $('#our-flag').mousemove(function() {
    var meaningsNotActive =   $('#symbols-meaning li').not('.active');
    clearTimeout(timeoutToFadeOut);
    $('#symbols-meaning li').fadeIn();
    timeoutToFadeOut = setTimeout(function() {
      $('#symbols-meaning li').not('.active').fadeOut(1000);
    }, 2000);
  });


});
