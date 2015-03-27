var flag = {

  init: function(){
    flag.config = {
        items: $('#flag img'),
        tooltips: $('#symbols-meaning li'),
        container: $('#our-flag'),
        timeToFadeTooltips: 2000,
    };

    flag.hideTooltipsAfterMouseInactivity();
    flag.highlightItemsOnHover();
    flag.activeItemsOnClick();
    flag.normalizeFlagOnFocusout();
    flag.compositeFlagOnScroll();

  },

  compositeFlagOnScroll: function() {
    $(window).scroll(function() {
      if(flag.distanceFromTop() < 260) {
        flag.config.container.removeClass('decomposited');
      } else {
        flag.config.container.addClass('decomposited');
      }
    });
  },

  normalizeFlagOnFocusout: function() {
    $('section').not('#our-flag').click(function() {
      flag.normalizeAll();
    });
  },

  activeItemsOnClick: function() {
    flag.config.items.add(flag.config.tooltips).click(function() {
      var target = $(this).attr('data-for') ? $(this).attr('data-for') : '#' + $(this).attr('id');
      flag.activate(target);
    });
  },

  highlightItemsOnHover: function() {
    flag.config.items.not('.active').hover(function() {
      flag.config.items.not('.active').css('opacity', .07);
      var opacity = flag.hasActive() ? .3 : 1;

      $(this).not('.active').css('opacity', opacity);
    }, function() {
      if(flag.hasActive()) {
        flag.config.items.not('.active').css('opacity', .07);
      } else {
        flag.normalizeAll();
      }
    });
  },

  hideTooltipsAfterMouseInactivity: function() {
    var timeoutToFadeOut;
    flag.config.container.mousemove(function() {
      var meaningsNotActive =   flag.config.tooltips.not('.active');
      clearTimeout(timeoutToFadeOut);
      flag.config.tooltips.fadeIn();
      timeoutToFadeOut = setTimeout(function() {
        flag.config.tooltips.not('.active').fadeOut(1000);
      }, flag.config.timeToFadeTooltips);
    });
  },

  distanceFromTop: function() {
    return flag.config.container.offset().top - $(window).scrollTop();
  },

  activate: function(target) {
    if($(target).is('.active')) {
      flag.normalizeAll();
    } else {
      flag.config.tooltips.removeClass('active');
      $('li[data-for='+ target +']').addClass('active');

      flag.config.items.removeClass('active').css('opacity', .07);
      $(target).addClass('active').css('opacity', 1);
    }
  },

  hasActive: function() {
    return $('#flag .active').size() > 0;
  },

  normalizeAll: function() {
    flag.config.items.removeClass('active').css('opacity', 1);
    $('#symbols-meaning .active').removeClass('active');
  }

}

$(document).ready(function() {

  flag.init();

});
