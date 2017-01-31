var AboutUs = {
  init: function() {

  }
}
$(AboutUs.init);

$(document).ready(function() {
  $('.read-more').click(function() {
    var target = $(this).attr('href');
    $(target).slideToggle();
  });
});
