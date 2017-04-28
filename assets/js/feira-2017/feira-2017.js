$(document).ready(function() {
  $('.js-carousel').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    lazyLoad: 'ondemand',
    centerMode: true,
    centerPadding: '60px',
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  });

  var createNew = function(post){
    var image = '';

    if(!post.cover){
      post.cover = post.images_hd;
    }

    if(!!post.cover){
      image += '<a href="'+post.url+'">';
      image += '<figure style="background-image:url('+post.cover+');" alt="imagem da capa da noticia"></figure>';
      image += '</a>';

    }
    var support_line = '';

    if(!!post.support_line){
      support_line = '<p class="support-line">'+post.support_line+'</p>';
    }

    var article = '<article class="headline">'+
      image +
      '<h1>'+
      '<a href="'+post.url+'">'+post.title+'</a>'+
      '</h1>'+
      support_line +
      '</article>';


    return '<div class="item">'+ article + '</div>';
  };

  var addCarousel = function(post){
    $('.js-carousel').slick('slickAdd', createNew(post));
  };

  $.getJSON( 'noticias.json', function( data ) {
    $.each(data, function(index, post){
      addCarousel(post);
    });
  });

});
