$(document).ready(function(){
  $('#content').on('focusout', '.tooltip-item', function() {
    $('.tooltip').slideUp();
  });

  $('#content').on('click', '.tooltip-item', function(e) {
    e.preventDefault();

    var tooltipId = $(this).attr('href');
    var position = $(this).offset().top + $(this).height();

    $(tooltipId).offset({ top:position });

    $(tooltipId).slideToggle();
  });
});
