$(document).ready(function() {

  var updateTimeline = function(element) {
    var pageCenter = $(window).width() / 2;
    var entryCenter = element.offset().left + (element.outerWidth() / 2);
    var timelineLeft = $('.timeline').offset().left;
    var headerImgSrc = $('#content .header-img').attr('src');

    $('.timeline').offset({left: timelineLeft + (pageCenter - entryCenter) });

    $('#arrow-mobile span.period').text(element.text());

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
      history.replaceState({}, '', period);
      updateTimeline(element);
    });
  };

  $('#arrow-mobile .arrow').hammer().on('tap', function(e) {
    e.preventDefault();
    var direction = (this.classList.contains('right')) ? -1 : 1;
    var newLeft = $('.timeline').offset().left + ( 35 * direction );
    $('.timeline').offset({left: newLeft });
  });

  $('#timeline-wrapper').hammer().on('swipeleft', function(e) {
    e.preventDefault();
    var newLeft = $('.timeline').offset().left + ( 80 );
    $('.timeline').offset({left: newLeft });
  });

  $('#timeline-wrapper').hammer().on('dragleft', function(e) {
    e.preventDefault();
    var newLeft = $('.timeline').offset().left + ( 20 );
    $('.timeline').offset({left: newLeft });
  });

  $('#timeline-wrapper').hammer().on('swiperight', function(e) {
    e.preventDefault();
    var newLeft = $('.timeline').offset().left + ( -80 );
    $('.timeline').offset({left: newLeft });
  });

  $('#timeline-wrapper').hammer().on('dragright', function(e) {
    e.preventDefault();
    var newLeft = $('.timeline').offset().left + ( -20 );
    $('.timeline').offset({left: newLeft });
  });

  $('.entry').click(function(e) {
    e.preventDefault();
    updateContent($(this));
  });

  $('#content').on('click', '.next-period, .previous-period', function(e) {
    var target = $('.entry[href="'+ $(this).attr('href') +'"]');
    if(target.size() > 0) {
      e.preventDefault();
      target.click();
      $('.scrolltop').click();
    }
  });


  updateTimeline($('.timeline .entry.active'));
});
