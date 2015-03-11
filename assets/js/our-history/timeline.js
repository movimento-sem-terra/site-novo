$(document).ready(function() {

  var updateTimeline = function(element) {
    var pageCenter = $(window).width() / 2;
    var entryCenter = element.offset().left + (element.outerWidth() / 2);
    var timelineLeft = $('.timeline').offset().left;
    var headerImgSrc = $('#content .header-img').attr('src');

    $('.timeline').offset({left: timelineLeft + (pageCenter - entryCenter) });

    $('.entry').removeClass('active');
    element.addClass('active');


    $('header .foreground').attr('src', headerImgSrc);
    $('header .background').css('background-image', 'url(' + headerImgSrc + ')');
    $('#content .header-img').remove();
  };

  var updateContent = function(element) {
    var period = element.attr("href");
    $.get( period + "/content.html" , function( data ) {
      $("#content").html( data );
      updateTimeline(element);
    });
  };

  $('.entry').click(function(e) {
    e.preventDefault();
    updateContent($(this));
  });

  $('#content').on('click', '.next-period', function(e) {
    e.preventDefault();
    $('.entry.active').next().click();
    $(window).scrollTop(0);
  });

  updateTimeline($('.timeline .entry.active'));
})
