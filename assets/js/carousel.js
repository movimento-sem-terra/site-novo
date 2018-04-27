
function initializeCarousel() {
  var carousels =  $('section.jscarousel');
  carousels.each(function(index,item){
    var $item = $(item);
    $item.loop = $item.data('loop');
    $item.total_slides = $item.find('ul li').length;

    if($item.total_slides <= 1){
      $item.find('.container > a').css("display", "none");
      return null;
    }

    $item.autoScroll = function(){
      change_slide(this);
      if($item.loop == true){
        $item.interval = setTimeout(function(){ $item.autoScroll() },4000);
      }
    }

    $item.handleClick = function(event){
      target = $item;
      $item.loop = false;
      clearTimeout($item.interval);
      change_slide(target, $(event.currentTarget).data('direction'));
      event.preventDefault();
    }

    $item.find('.container > a').on('click', $item.handleClick);

    if ($item.loop){
      $item.interval = setTimeout(function(){ $item.autoScroll() },4000);
    }

  });

  function change_slide(target, direction){
    var index = parseInt(target.attr('data-index'));
    direction = direction || 1;
    var position = index + direction;
    position = position > target.total_slides-1 ? 0 : position;
    position = position < 0 ? target.total_slides-1 : position;
    target.attr('data-index', position);
  }
}

$(initializeCarousel);
