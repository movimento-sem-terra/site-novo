/*jslint browser: true*/
(function () {
  'use strict';
  var Device = {
    Android: function () {
      return window.navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return window.navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return window.navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return window.navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return window.navigator.userAgent.match(/IEMobile/i);
    },
    isMobile: function () {
      return (Device.Android() || Device.BlackBerry() || Device.iOS() || Device.Opera() || Device.Windows());
    }
  };

  var Popover = {
      container: null,
      links: null,
      init: function (selector) {
        this.container = $(selector);
        this.links = this.container.find("li a");
        this.setup();
      },
      setup: function () {
        var contents = this.container.find('.inner-content');
        var links = this.container.find('li a');
        this.setupContentsEvent(contents);
        this.setupLinks(links);
        this.setupBodyEvent();

      },



      setupLinks: function (links) {

        $(links).on('click', function (e) {
          Popover.clean();
          var li = $(this).parent();
          li.toggleClass('open');

          if (li.hasClass('open')) {
            li.find('.inner-content').css({display: 'block' });
          }
          Popover.cancelEvent(e);
        });

      },
      // Hide content on End animation
      setupContentsEvent: function (contents) {
        var events =  ["transitionend", "webkitTransitionEnd",  "oTransitionEnd",  "otransitionend", "MSTransitionEnd"];
        contents.on(events.join(" "), function () {
          if ($(this).parent().hasClass('open') === false) {
            $(this).css({display: 'none' });
          }

          e.preventDefault();
        });
      },

      setupBodyEvent: function () {
        if (!Device.isMobile()) {
          $('body').on('click', function () {
            Popover.clean();
          });
        }
      },

      clean: function () {
        if (!Device.isMobile()) {
          this.container.find("li.open").removeClass('open');
        }
      },

      cancelEvent: function (event) {
        if (event.stopPropagation) {
          event.stopPropagation();
        } else {
          // For IE
          event.cancelBubble = true;
        }
        event.preventDefault();
      }
    };

  $(function () { Popover.init(".popover"); });
}());