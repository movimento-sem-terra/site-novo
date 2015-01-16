$(function() {

  var container = $('#tabs-container');
  var links = container.find('li a');

  links.each(function(index, link){
    $(link).on('click', function(e){

      var selectedItem = $(e.currentTarget);
      var ref = selectedItem.attr('href');

      container.find('.selected').removeClass('selected');
      container.find(".tab").removeClass('show');
      container.find(ref).addClass('show');
      selectedItem.parent().addClass('selected');
      e.preventDefault();
    });
  });

});
