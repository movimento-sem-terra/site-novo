$(document).ready(function(){

	var tabs = function(){
		$('ul.tabs li:first').addClass('active');
		$('.filter').hide();
		$('.filter:first').show();
		$('ul.tabs li').on('click',function(){
			$('ul.tabs li').removeClass('active');
			$(this).addClass('active')

			$('.filter').fadeOut('slow');
			var activeTab = $(this).find('a').attr('href');
			$(activeTab).fadeIn('slow');

			return false;
		});
	};

	tabs();
});
