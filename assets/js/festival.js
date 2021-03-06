$(document).ready(function(){

  var tabs = function(){
    $('ul#tabs li:first').addClass('active');
    $('.filter').hide();
    $('.filter:first').show();

    $('ul#tabs li').on('click',function(){
      $('ul#tabs li').removeClass('active');
      $(this).addClass('active')

      var options = { duration: 500, queue: false, };
      $('.filter').fadeOut(options);
      var activeTab = $(this).find('a').attr('href');
      $(activeTab).fadeIn(options);

      return false;
    });
  };

  var grid = function(){
    var $container = $('#noticias .container');
    $container.masonry({
      itemSelector: '.item',
      columnWidth: '.item',
      percentPosition: true
    });
  };

  var scroll = function(){
    $('a[data-animation="scroll"]').click(function() {
      if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') || location.hostname === this.hostname) {

        var offset = $(this).data('offset') || 0;
        var target = $(this.hash);
        target = target.length ? target : $('[name="' + this.hash.slice(1) +'"]');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top - offset
          }, 1000);
          return false;
        }
      }
    });
  };

  var menu = function(){
    $(".menu").sticky({topSpacing:0, center: true, zIndex: 10});
  };


  var flickrGalery = function(){
    $('.gallery').jflickrfeed({
      limit: 40,
      qstrings: {
        id: '90599227@N08',
        format: 'json'
      },
      itemTemplate:
        '<a href="{{image_b}}" title="">'+
          '<img src="{{image_s}}" alt="" class="gallery-item"/>'+
        '</a>'
    },function(data){
      $('.gallery a').colorbox();
      $('.gallery').justifiedGallery();
    });
  };

  var selecionados = function(){
		$('.selecionados a').colorbox();
  };

  tabs();
  grid();
  scroll();
  menu();
  flickrGalery();
  selecionados();
});
