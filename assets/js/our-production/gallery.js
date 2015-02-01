(function() {
  "use strict";
  var Gallery = {
    thumbs: null,
    largeImage: null,
    figure: null,
    legend: null,
    links: null,
    currentPage: 0,
    totalPages: 0,
    itemWidth: 0,
    fadeIn: {opacity: 0, scale: 1.2, easing: 'easeInOutQuad'},
    fadeOut: {opacity: 1, scale: 1},

    init: function(selector){
      this.figure = $(selector).find('figure');
      this.largeImage = this.figure.find('img');
      this.legend =  this.figure.find('legend');
      this.thumbs = $(selector).find('#thumbs');
      this.links = this.thumbs.find('ul li a');
      this.setLinkEvents(this.links);
      this.setupNav(this.thumbs);

    },

    setupNav: function(container){
      var thumbs = container.find("ul");
      var totalItems = container.find( 'li a').length;
      var navButtons = container.find('a[data-direction]');
      var limit = container.outerWidth();
      var itemWidth = thumbs.find('li:first').outerWidth(true);
      var totalWidth = (totalItems * itemWidth);
      var outerSize =  totalWidth - limit;
      this.totalPages = Math.round(outerSize / itemWidth) ;
      this.itemWidth = itemWidth;

      thumbs.css({width: totalWidth });
      navButtons.on('click', function(e){
          var direction = parseInt($(e.currentTarget).attr('data-direction'));
          Gallery.changePage(direction);
          e.preventDefault();
      });
    },
    changePage: function(direction){
      this.currentPage += direction * -1;
      this.currentPage = this.currentPage < 0 ? 0 : this.currentPage;
      this.currentPage = this.currentPage >= this.totalPages ? this.totalPages : this.currentPage;

      this.thumbs.find('ul').velocity({left: ((this.currentPage * this.itemWidth)*-1) + "px" });
    },

    animate: function(animation, callback){
      this.figure.stop();
      this.figure.velocity(animation, callback);
    },

    setLoaderEvent: function(target){
      var animation = Gallery.fadeOut;
      $(target).on('load', function(){
        Gallery.animate(animation);
      });
    },

    setLinkEvents: function(links){
      links.on('click', function(e){
        console.log(e.currentTarget);
        e.preventDefault();
        links.removeClass('open');
        var seletecteItem = $(e.currentTarget);
            imageURL = $(e.currentTarget).attr('href');
            legendText = $(e.currentTarget).attr('title');
            callback = function(){ Gallery.setImage(imageURL, legendText); };

        seletecteItem.addClass('open');
        Gallery.animate(Gallery.fadeIn, callback);
      });
    },

    setImage: function(url, legendText){
      var newImage = this.createImage(url);
      var legend = this.legend;
      var target = this.largeImage;

      legend.html(legendText);
      Gallery.largeImage.replaceWith(newImage);
      Gallery.largeImage = $(newImage);
      newImage.src = url;
     },

     createImage: function(url){
       var img = new Image();
       this.setLoaderEvent(img);
       return img;
     }
  };

  $(function(){ Gallery.init('#gallery') });
}());
