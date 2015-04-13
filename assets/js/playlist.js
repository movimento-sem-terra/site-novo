$(document).ready(function() {
  $('.pin').click(function() {
    var index = $(this).data('index');
    $('#album_'+index).slideToggle();
  });
});
