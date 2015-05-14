$(document).ready(function() {
  var createVideo = function(post){

    return '<article class="headline">'+
        '<iframe width="100%" src="'+post.video+'" allowfullscreen frameborder="0"></iframe>'+
        '<h1>'+
        '<a href="'+post.url+'">'+post.title+'</a>'+
        '</h1>'+
        '</article>';
  };
  var createPost = function(post){
    var image = '';
    if(!!post.cover){
      image += '<a href="'+post.url+'">';
      image += '<figure style="background-image:url('+post.cover+');" alt="imagem da capa da noticia"></figure>';
      image += '</a>';

    }
    return '<article class="headline">'+
      image +
      '<h1>'+
      '<a href="'+post.url+'">'+post.title+'</a>'+
      '</h1>'+
      '</article>';
  };

  $.getJSON( '/noticias/noticias.json', function( data ) {
    var posts = [];
    var html = '';
    
    $.each( data.splice(0, 5), function(i, post){
      if($('main > article > header h1').text() !== post.title){
        posts.push(post);
      }
    });

    $.each(posts.splice(0,4), function(index, post){
      var article = '';
      if(!!post.video){
        article = createVideo(post);
      }else{
        article = createPost(post);
      }

      var item = '<li>'+
        article +
        '</li>';

      html += item;
    });
    $('.latest-news ul').append($(html));
  });
});
