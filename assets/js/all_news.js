console.log('hegay');

$(document).ready(function() {
  $('main .container').masonry({
    columnWidth: ".item",
    percentPosition: true,
    itemSelector: '.item'
  });
});
