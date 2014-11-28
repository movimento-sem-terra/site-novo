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

  event.preventDefault();
});

$('#open-menu').on('click', function () {
  $(this).siblings('ul').toggleClass('open');
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
