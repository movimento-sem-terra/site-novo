$( document ).ready(function() {

  var appendNumber = 4;
  var prependNumber = 1;
  var galleryTop = new Swiper('.gallery-top', {
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      spaceBetween: 10,
      onInit: changeBackground,
      onSlideChangeEnd: changeBackground,
  });



  var galleryThumbs = new Swiper('.gallery-thumbs', {
      spaceBetween: 10,
      centeredSlides: true,
      slidesPerView: 'auto',
      touchRatio: 0.2,
      slideToClickedSlide: true,
      onSlideChangeEnd: changeBackground,
  });

  function changeBackground(swiper) {
    var slide = swiper.slides[swiper.activeIndex];
    console.log(slide);
    $('#background').css('background-image', $(slide).css('background-image'));
  }

  galleryTop.params.control = galleryThumbs;
  galleryThumbs.params.control = galleryTop;

});
