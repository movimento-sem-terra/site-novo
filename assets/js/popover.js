function popover() {
  var opened = [];
  //
  if ($('.popover').length > 0){
    //
    $('.popover li a').each(
      function (index, element) {
        element = $(element);
        element.parent().find('.inner-content').prepend("<span class= 'arrow-pointer'> * </span>");
        element.on('click', function (e) {
          $('.popover li').removeClass('open');
          $(e.currentTarget).parent().toggleClass('open');
          opened.push(e.currentTarget);
          e.preventDefault();

          if (event.stopPropagation) {
            event.stopPropagation()
          } else {
            // For IE
            event.cancelBubble = true
          }
        });
      }
    );

    $('body').on('click',function(e){
      $('.popover li').removeClass('open');
    });
  }
}

$(popover);
