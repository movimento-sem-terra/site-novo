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

  var swipeTimeline = function(distanceGesture, direction, entry){
    var positionEntry = entry.offset().left;
    var middlePosition = ( $(window).width() / 2 ) - ( entry.outerWidth() / 2 );
    var diff = positionEntry - middlePosition;
    var distanceMax = 0;


    distanceMax = distanceGesture >= Math.abs(diff) ? diff : distanceGesture;

    var newLeft = $('.timeline').offset().left + ( Math.abs(distanceMax) * direction );
    $('.timeline').offset({left: newLeft });
  };

  $('#arrow-mobile .arrow').hammer().on('tap', function(e) {
    e.preventDefault();
    var direction = (this.classList.contains('right')) ? -1 : 1;

    if( direction === -1 ){
      entry = $('.timeline .entry').last();
    }else{
      entry = $('.timeline .entry').first();
    }

    swipeTimeline(50, direction, entry);
  });

  $('main > header').hammer().on('panleft panright', function(e) {
    e.preventDefault();
    var distanceGesture = e.gesture.distance;
    var direction = 1;
    var entry;


    if( 'panleft' === e.type ){
      direction = -1;
      entry = $('.timeline .entry').last();
    }else{
      entry = $('.timeline .entry').first();
    }

    swipeTimeline(distanceGesture, direction, entry);
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
