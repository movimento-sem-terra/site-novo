var Device = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    isMobile: function() {
        return (Device.Android() || Device.BlackBerry() || Device.iOS() || Device.Opera() || Device.Windows());
    }
};


function popover() {
  if ($('.popover').length > 0){

    $('.popover').find('.inner-content').prepend("<span class='arrow-pointer'>*</span>");

    $('.popover li a').each(
      function (index, el) {

        var element = $(el);

        element.on('click', function (e) {
          if(!Device.isMobile()){
            $('.popover li').removeClass('open');
          }

          var li = $(this).parent();
          li.toggleClass('open');
          if (event.stopPropagation) {
            event.stopPropagation()
          } else {
            // For IE
            event.cancelBubble = true
          }

          e.preventDefault();
        });
        //

      }
    );

    if(!Device.isMobile()){
      $('body').on('click',function(e){
        $('.popover li').removeClass('open');
      });
    }
  }
}

$(popover);
