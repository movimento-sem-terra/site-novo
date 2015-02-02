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
      var first_page = 0;
      
      if( this.currentPage < first_page ){
        this.currentPage  = first_page; 
      }
      
      if (this.currentPage >= this.totalPages){
        this.currentPage = this.totalPages;
      } 
      
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
        var seletecteItem = $(e.currentTarget);
        var imageURL = $(e.currentTarget).attr('href');
        var legendText = $(e.currentTarget).attr('title');
        
        var callback = function(){ Gallery.setImage(imageURL, legendText); };
        links.removeClass('open');
        seletecteItem.addClass('open');
        Gallery.animate(Gallery.fadeIn, callback);
        e.preventDefault();
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
