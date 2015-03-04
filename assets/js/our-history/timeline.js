$(document).ready(function() {

  var updateTimiline = function(element) {
    var pageCenter = $(document).width() / 2;
    var entryCenter = element.offset().left + (element.outerWidth() / 2);
    var timelineLeft = $('.timeline').offset().left;
    var period = element.attr("href");
    $('.timeline').offset({left: timelineLeft + (pageCenter - entryCenter) });

    $('.entry').removeClass('active');
    element.addClass('active');
  };

  $('.entry').click(function(e) {
    e.preventDefault();

    updateTimiline($(this));

    $.get( period + "/content.html" , function( data ) {
      $("#content").html( data );
    });

  });

  updateTimiline($('.timeline .entry.active'));
})