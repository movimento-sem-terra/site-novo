(function (document, $) {
    "use strict";

    var flickrPhotoStream = function ($el, options) {
        var url = [
            'http://api.flickr.com/services/feeds/photoset.gne?nsid=',
            options.id,
            '&set=',
            options.setId,
            '&format=json&jsoncallback=?'
        ].join('');

        return $.getJSON(url).done(function (data) {
            $.each(data.items, function (index, item) {
                var full_link = item.media.m.replace('_m', '_b');
                var link = item.media.m;

                var description = $(item.description);
                var last_description = description[description.length - 1];

                $("<img />")
                    .attr("src", item.media.m)
                    .appendTo($el)
                    .wrap(options.container || '')
                    .wrap([
                        '<a href="',
                        full_link,
                        options.cssClass ? '" class="' + options.cssClass : '',
                        '" title="',
                        last_description.innerText,
                        '"></a>'
                    ].join(''));
            });
        });
    };

    $.fn.flickrPhotoStream = function (options) {
        return flickrPhotoStream($(this).get(), options || {});
    };
})(document, jQuery);

$(document).ready(function() {
   $('.photos')
   .flickrPhotoStream({
       id: '90599227@N08',             // Flickr Id
       setId: '72157683458663025',          // Flick "Set" Id
       cssClass: 'photos-item'  // applied to the image's link
   })
   .done(function () {

     $(".photos").justifiedGallery({
       lastRow : 'nojustify',
       rowHeight : 300,
       rel : 'gallery1', //replace with 'gallery1' the rel attribute of each link
       margins : 5
     }).on('jg.complete', function () {
       $(this).find('a').colorbox({
         maxWidth : '80%',
         maxHeight : '80%',
         opacity : 0.8,
         transition : 'elastic',
         current : ''
       });
     });;
   });
});
