$(document).ready(function() {
  $('body > footer').hide();
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

  $.infinite_scroll = {
    start: function(){
      $.getJSON( 'noticias.json', function( data ) {
        $.infinite_scroll.posts = data;
        $.infinite_scroll.load();
      });
    },
    posts: [{}],
    create: function(posts){},
    itemIsVisible: function(item){
      if($(item).isOnScreen()) {
        $.infinite_scroll.load();
      }
    },
    load: function(){
      var element = this.create(this.posts);

      $container.masonry()
      .append( element )
      .masonry( 'appended', element )
      .masonry();
    }
  };

  $(window).scroll(function() {
    var pageHeight = $(this).height();
    var scrollTop = $(this).scrollTop();

    $.infinite_scroll.itemIsVisible('.item:last-child');
  });

  if(!!moment){
    moment.locale('pt-BR');
  }

});
