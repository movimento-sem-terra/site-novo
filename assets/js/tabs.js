(function() {
  "use strict";
  var Tabs = {
    list: null,
    select: null,
    links: null,

    init: function(container, list, select){
      this.container = $(container);
      this.list = this.container.find(list);
      this.select = this.container.find(select);
      this.setupLinks();
      this.setupSelect();

    },

    setupSelect: function(){
      this.select.on('change', function(e){
        Tabs.changeTab($(this).val());
      });
    },

    setupLinks: function(){
      var links = this.list.find('li a');
      links.each(function(index, link){
        $(link).on('click', function(e){
          var selectedItem = $(e.currentTarget);
          Tabs.list.find('.selected').removeClass('selected');
          selectedItem.parent().addClass('selected');
          Tabs.changeTab(selectedItem.attr('href'));

          e.preventDefault();
        });
      });
    },

    changeTab: function(value){
      this.container.find('.tab').removeClass('show');
      this.container.find(value).addClass('show');
    },
  }
  $(function(){ Tabs.init('div#tabs-container', 'ul.resp-tabs-list', 'select') });
}());
