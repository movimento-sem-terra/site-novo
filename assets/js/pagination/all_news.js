$(document).ready(function() {
   $.infinite_scroll.create = function(posts){
    var html = '';
    var p  = posts.splice(0,6);

    $.each(p, function(index, post){
      var image = '';
      if(!!post.cover){
        image += '<a href="'+post.url+'">';
        image += '<figure style="background-image:url('+post.cover+');" alt="imagem da capa da noticia"></figure>';
        image += '</a>';

      }
      var article = '<article class="headline">'+
        image +
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
    return $( html );
  };
});
