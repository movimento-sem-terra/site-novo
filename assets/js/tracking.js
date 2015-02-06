var tracked_links = [
  ['.parceiros ul li a', 'parceiros'],
  ['.social ul li a', 'social'],
  ['.amigos ul li a', 'amigos'],
  ['.links ul li a', 'links'],
  ['.news .more a', 'mais-noticias'],
  ['.videos .more a', 'mais-videos'],
  ['nav ul li a', 'header-links']
];

for(i=0; i<tracked_links.length; i++) {
  trackableItems = tracked_links[i];
  var selector = null;
  var category = null;
  selector = trackableItems[0];
  category = trackableItems[1];
  $(selector).each(function(index) {
    $(this).on('click', function() {
      var label = $(this).attr('href');

      if (label === '#') {
        label = $(this).text();
      }

      ga('send', {
        'hitType': 'event',
        'eventCategory': category,
        'eventAction': 'click',
        'eventLabel': label
      });
    });
  });
}

$("main section").each(function(index, element){
  $(element).find("a[href!='#']").each(function(index,e){
    section = $(element).attr('class');
    news = $(e).attr('href');
    section = section || $(e).attr('class');

    $(e).on('click', function(){
      ga('send', {
        'hitType': 'event',
        'eventCategory': 'Seção: '+section,
        'eventAction': 'click',
        'eventLabel': news
      });
    });
  });
});

$(".details-inited summary").on('click', function() {
  ga('send', {
    'hitType': 'event',
    'eventCategory': 'leia-mais',
    'eventAction': 'click',
    'eventLabel': $('.tema h1').text()
  });
});

$("header a.logo").on('click', function() {
  ga('send', {
    'hitType': 'event',
    'eventCategory': 'header-link-home',
    'eventAction': 'click',
    'eventLabel': 'Logotipo'
  });
});

$('.arrow-right').on('click', function () {
  ga('send', {
    'hitType': 'event',
    'eventCategory': 'carousel-nav',
    'eventAction': 'click',
    'eventLabel': 'Seta-direita'
  });
});

$('.arrow-left').on('click', function () {
  ga('send', {
    'hitType': 'event',
    'eventCategory': 'carousel-nav',
    'eventAction': 'click',
    'eventLabel': 'Seta-esquerda'
  });
});
