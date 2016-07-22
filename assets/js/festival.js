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

	tabs();
  grid();
});
