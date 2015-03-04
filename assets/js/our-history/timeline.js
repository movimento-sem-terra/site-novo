$(document).ready(function() {
  $('.entry').click(function() {
    var pageCenter = $(document).width() / 2;
    var entryCenter = $(this).offset().left + ($(this).outerWidth() / 2);
    var timelineLeft = $('.timeline').offset().left;

    $('.timeline').offset({left: timelineLeft + (pageCenter - entryCenter) });

    $('.entry').removeClass('active');
    $(this).addClass('active');
  })
})