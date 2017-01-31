$(document).ready(function() {
   $.infinite_scroll.create = function(posts){
    var html = '';
    var p  = posts.splice(0,6);

    $.each(p, function(index, post){
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

  $.infinite_scroll.start();
});
