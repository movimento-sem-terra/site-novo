$(document).ready(function() {
  var $container = $('main .container');
   $.infinite_scroll.create = function(posts){
    var html = '';
    var p  = posts.splice(0,6);

    $.each(p, function(index, post){
      var support_line = '';
      if(!!post.support_line){
        support_line = '<p class="support-line">'+post.support_line+'</p>';
      }
      var article = '<article class="headline">'+
        '<h1>'+
        '<a href="'+post.url+'">'+post.title+'</a>'+
        '</h1>'+
        '<time datetime="'+post.date+'">'+
        moment(post.date).format('LL') +
        '</time>'+
        support_line +
        '</article>';

      var item = '<div class="item">'+ article + '</div>';
      html += item;
    });
    return $( html );
  };

  $('main input[type="search"]').on('search',function(){
    var title =  $('main input.title').val();
    $container
     .masonry('destroy')
     .html('');
    var results = [];

    window.noticias.forEach(function(element){
      if(element.match(title)){
        results.push($.parseJSON(element));
      }
    });

    $('span.resultado').text(results.length+ ' notícias encontradas');
    $.infinite_scroll.posts = results;
    $.infinite_scroll.load();
    $.infinite_scroll.itemIsVisible('main .container');
  });

  $('main button').hide();

  $.infinite_scroll.start = function(){
    $.getJSON( '/noticias.json', function( data ) {
      window.noticias = data;
      $('main button').show();
    });

  };
  $.infinite_scroll.start();
});
