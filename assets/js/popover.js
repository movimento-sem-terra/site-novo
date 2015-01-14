function popover() {
  $('.popover li').each(function (index, element) {
    element = $(element);
    element.find('.inner-content').prepend("<span class= 'arrow-pointer'> * </span>");
    element.find('a').on('click', function (e) {
      $('.popover li').removeClass('open');
      $(e.currentTarget).parent().addClass('open');
       e.preventDefault();
    });
  }
  );
}

$(popover)
