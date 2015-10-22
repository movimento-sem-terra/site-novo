$(document).ready(function() {

  $('.gallery').imagesLoaded(function(){
    $('.gallery').jflickrfeed({
      limit: 30,
      qstrings: {
        id: '90599227@N08',
        format: 'json'
      },
      itemTemplate:
        '<img src="{{image_b}}" alt="{{title}}" class="gallery-item"/>'
    }).masonry({
      itemSelector: 'img.gallery-item',
      columnWidth: 'img.gallery-item',
      percentPosition: true,
      gutter: 30
    });
  });

});
