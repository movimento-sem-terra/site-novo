$(document).ready(function() {
  $.fn.isOnScreen = function(){
    var viewport = {};
    viewport.top = $(window).scrollTop();
    viewport.bottom = viewport.top + $(window).height();
    var bounds = {};
    bounds.top = this.offset().top;
    bounds.bottom = bounds.top + this.outerHeight();
    return ((bounds.top <= viewport.bottom) && (bounds.bottom >= viewport.top));
  };
  var $container = $('main .container');

  $container.imagesLoaded(function(){
    $container.masonry({
      itemSelector: '.item',
      columnWidth: '.item',
      percentPosition: true
    });
  });

  var posts = [{}];

  $(window).scroll(function() {
    var pageHeight = $(this).height();
    var scrollTop = $(this).scrollTop();

    if($('body > footer').isOnScreen()) {
      loadPage();
    }
  });


  var loadPage = function(){
    var html = '';
    var p  = posts.splice(0,6);

    $.each(p, function(index, post){
      var article = '<article class="headline">'+
        '<a href="'+post.url+'">'+
        '<figure style="background-image:url('+post.cover+');" alt="imagem da capa da noticia">'+
        '</figure>'+
        '</a>'+
        '<time datetime="'+post.date+'">'+
        post.date +
        '</time>'+
        '<h1>'+
        '<a href="'+post.url+'">'+post.title+'</a>'+
        '</h1>'+
        '<p class="support-line">'+post.support_line+'</p>'+
        '</article>';

      var tags  = '';
      $.each(post.tags, function(i, tag){
        if(!!tag){
          tags += '<span class="tag">'+tag+'</span>';
        }
      });

      var tag = '<div class="tags">'+
        tags +
        '</div>';

      var item = '<div class="item">'+
        article +
        tag +
        '</div>';

      html += item;
    });
    var $html = $( html );

    $container.masonry()
    .append( $html )
    .masonry( 'appended', $html ).masonry();
  };



  $.getJSON( 'noticias.json', function( data ) {
    posts = data;
    loadPage();
  });
});
