$(document).ready(function(){

  $('#content').on('click', '.tooltip #close-link', function(e) {
    e.preventDefault();
    $('.tooltip').addClass('hidden');
  });

  $('#content').on('click', '.tooltip-item', function(e) {
    e.preventDefault();

    var tooltipId = $(this).attr('href');
    var position = $(this).offset();

    $(tooltipId).removeClass('hidden');
    $(tooltipId).offset({ top:position.top + $(this).height(), left:position.left });
  });
});
