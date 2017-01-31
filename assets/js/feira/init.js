$(document).ready(function() {

  $('.gallery').imagesLoaded(function(){
    $('.gallery').jflickrfeed({
      limit: 40,
      qstrings: {
        id: '90599227@N08',
        format: 'json'
      },
      itemTemplate:
        '<a rel="colorbox" href="{{image_b}}" title="{{title}}">'+
          '<img src="{{image_s}}" alt="{{title}}" class="gallery-item"/>'+
        '</a>'
    },function(data){
      $('.gallery a').colorbox();
    });
  });

});
