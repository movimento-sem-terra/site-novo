function popover() {
  if ($('.popover').length > 0){
    $('.popover li a').each(
      function (index, el) {

        var element = $(el);
        var content = element.parent().find('.inner-content');
        content.prepend("<span class=arrow-pointer'>*</span>");

        content.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function() {
          if($(this).parent().hasClass('open') == false){
            $(this).css({display: 'none'});
          }
        });

        element.on('click', function (e) {
          $('.popover li').removeClass('open');
          $(this).parent().toggleClass('open');
          if( $(this).parent().hasClass('open') ){
            $(this).parent().find('.inner-content').css({display:'block'});
          }

          e.preventDefault();
          if (event.stopPropagation) {
            event.stopPropagation()
          } else {
            // For IE
            event.cancelBubble = true
          }
        });
        //

      }
    );

    $('body').on('click',function(e){
      $('.popover li').removeClass('open');
    });
  }
}

$(popover);
