$(document).ready(function() {
  var $container = $('main .container');

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


    console.log(moment().format('LLLL'));

    $('span.resultado').text(results.length+ ' notícias encontradas');
    $.infinite_scroll.posts = results;
    $.infinite_scroll.load();

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
