$(document).ready(function() {
  $.infinite_scroll.create = function(posts){
    var html = '';
    var p  = posts.splice(0,6);

    $.each(p, function(index, post){
      var article = '<article class="headline">'+
        '<iframe width="100%" src="'+post.video+'" allowfullscreen frameborder="0"></iframe>'+
        '<h1>'+
        '<a href="'+post.url+'">'+post.title+'</a>'+
        '</h1>'+
        '<p class="support-line">'+post.support_line+'</p>'+
        '</article>';
      var item = '<div class="item">'+
        article +
        '</div>';

      html += item;
    });
    return $( html );
  };

  $.infinite_scroll.start();
});
