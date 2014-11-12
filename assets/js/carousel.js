window.onload = (function initializeCarousel() {
  var autoScroll;
  carousel().find('> a').on('click', scroll);

  function carousel() {
    return $('section.carousel');
  }

  function scroll(event) {
    clearInterval(autoScroll);
    var index = parseInt(carousel().attr('data-index'));
    var direction = $(event.currentTarget).data('direction'); 
    var position = index + direction;
    position = position > 4 ? 0 : position;
    position = position < 0 ? 4 : position;

    carousel().attr('data-index', position);
  }

  autoScroll = setInterval(function() {
    var index = parseInt(carousel().attr('data-index'));
    carousel().attr('data-index', index < 4 ? index + 1 : 0); 
  }, 4000);
});

