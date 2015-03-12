$(document).ready(function(){
  $('.tooltip-item').focusout(function(){
    $('.tooltip').slideUp();
  });

  $('.tooltip-item').click(function(e) {
    e.preventDefault();

    var tooltipId = $(this).attr('href');
    var position = $(this).offset().top + $(this).height();

    $(tooltipId).offset({ top:position });

    $(tooltipId).slideToggle();
  });
});