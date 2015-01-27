var Gallery = {
  target: null,


  init: function(selector){
    var fadeIn = {opacity: 0,scale: 1.2};
        fadeOut = {opacity: 1,scale: 1};
        links = $(selector).find('ul li a');

    this.target = $(selector).find('figure > img');
    this.setLinkEvents(links, fadeIn);
    this.setLoaderEvent(this.target, fadeOut);
  },

  animate: function(animation, callback){
    this.target.stop();
    this.target.animate(animation, callback );
  },

  setLoaderEvent: function(target, animation){
    target.on("load", function(){
      Gallery.animate(animation);
    });
  },

  setLinkEvents: function(elements,animation){
    elements.on('click', function(e){
      e.preventDefault();
      elements.removeClass('open');
      var seletecteItem = $(e.currentTarget);
          imageURL = $(e.currentTarget).attr('href');
          callback = function(){ Gallery.loadImage(imageURL); };

      seletecteItem.addClass('open');
      Gallery.animate(animation, callback);

    });
  },

  loadImage: function(image){
    Gallery.target.attr('src', image);
  }
};

$(function(){ Gallery.init('#gallery') });
