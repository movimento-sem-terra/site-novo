$('.dropdown').on({
  mouseenter: function (event) {
    $(this).children('.dropdown-menu').addClass('active');
    $(this).children('a').addClass('active');
    event.preventDefault();
  },
  mouseleave: function (event) {
    $(this).children('.dropdown-menu').removeClass('active');
    $(this).children('a').removeClass('active');
    event.preventDefault();
  }
});

$('.dropdown').children('a').on('click', function(event) {
  var myTarget = $(this).siblings('.dropdown-menu');

  $('.dropdown-menu.active').each(function () {
    if (this != myTarget[0]) {
      $(this).removeClass('active');
    }
  });

  $('#search-form').removeClass('open');
  $('#open-search').removeClass('active');

  myTarget.toggleClass('active');
  $(this).toggleClass('active');

  event.preventDefault();
});

$('#site-header .open').on('click', function () {
  $('html').toggleClass('menu-active');
});

$('.menu').hammer().on('swipe', function () {
  $('html').toggleClass('menu-active');
});

$('#open-search').on('click', function () {
  var myTarget = $(this).siblings('form');
  myTarget.toggleClass('open');

  $('.dropdown-menu').removeClass('active');
  if (myTarget.hasClass('open')) {
    $(this).addClass('active');
  } else {
    $(this).removeClass('active');
  }
});
