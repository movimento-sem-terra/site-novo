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
      ga('send', {
        'hitType': 'event',          
        'eventCategory': category,
        'eventAction': 'click',   
        'eventLabel': $(this).attr('href')
      });
    });
  });
};

$("main section").each(function(index, element){
  $(element).find("a[href!='#']").each(function(index,e){
    section = $(element).attr('class');
    news = $(e).attr('href');

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

$("header > a").on('click', function() {
  ga('send', {
    'hitType': 'event',          
    'eventCategory': 'header-links',
    'eventAction': 'click',   
    'eventLabel': 'Logotipo'
  });
});


$('.dropdown').children('a').on('click', function(event) {
  var myTarget = $(this).siblings('.dropdown-menu');

  $('.dropdown-menu.active').each(function () {
    if (this != myTarget[0]) {
      $(this).removeClass('active');
    }
  });

  $('#search-form').removeClass('open');
  $('#open-search').removeClass('active');

  myTarget.toggleClass('active');

  event.preventDefault();
});

$('#open-menu').on('click', function () {
  $(this).siblings('ul').toggleClass('open');        
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

$('#open-search').on('click', function () {
  var myTarget = $(this).siblings('form');
  myTarget.toggleClass('open');

  $('.dropdown-menu').removeClass('active');
  if (myTarget.hasClass('open')) {
    $(this).addClass('active');
  } else {
    $(this).removeClass('active');
  }
});
