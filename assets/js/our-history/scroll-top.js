$(document).ready(function() {

  $('html').on('click', '.scrolltop', function(e) {
    e.preventDefault();
    $('html,body').animate({scrollTop: 0}, 200);
  });

  $(window).scroll(function() {
    var pageHeight = $(this).height();
    var scrollTop = $(this).scrollTop();

    if(scrollTop > pageHeight) {
      $('.scrolltop').fadeIn();
    } else {
      $('.scrolltop').fadeOut();
    }
  });
});
