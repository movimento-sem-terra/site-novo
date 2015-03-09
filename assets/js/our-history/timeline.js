$(document).ready(function() {

  var updateTimiline = function(element) {
    var pageCenter = $(document).width() / 2;
    var entryCenter = element.offset().left + (element.outerWidth() / 2);
    var timelineLeft = $('.timeline').offset().left;
    var headerImgSrc = $('#content .header-img').attr('src');

    $('.timeline').offset({left: timelineLeft + (pageCenter - entryCenter) });

    $('.entry').removeClass('active');
    element.addClass('active');


    $('header .header-img').attr('src', headerImgSrc);
    $('#background').css('background-image', 'url(' + headerImgSrc + ')');
    $('#content .header-img').remove();

  };

  $('.entry').click(function(e) {
    e.preventDefault();
    var entry = $(this);
    var period = entry.attr("href");

    $.get( period + "/content.html" , function( data ) {
      $("#content").html( data );
      updateTimiline(entry);
    });

  });

  updateTimiline($('.timeline .entry.active'));
})
