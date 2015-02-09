function popover() {
  if ($('.popover').length > 0){

    $('.popover').find('.inner-content').prepend("<span class=arrow-pointer'>*</span>");

    $('.popover li a').each(
      function (index, el) {

        var element = $(el);
        var content = element.parent().parent().find('.inner-content');
        content.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function() {
          if($(this).parent().hasClass('open') == false){
            $(this).css({display: 'none'});
          }
        });

        element.on('click', function (e) {
          $('.popover li').removeClass('open');
          var li = $(this).parent();
          li.toggleClass('open');

          if(li.hasClass('open') ){
            li.find('.inner-content').css({display: 'block' } );
          }

          e.preventDefault();
          if (e.stopPropagation) {
            e.stopPropagation()
          } else {
            // For IE
            e.cancelBubble = true
          }
          e.preventDefault();
        });
      }
    );

    $('body').on('click',function(e){
      $('.popover li').removeClass('open');
    });
  }
}

$(popover);
