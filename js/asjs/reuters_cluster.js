var Manager;

(function ($) {

  $(function () {
    Manager = new AjaxSolr.Manager({
     //solrUrl: 'http://localhost:9000/solr/core0/'//,
    	 solrUrl: '/solr/core0/'//,
    //  servlet: 'clustering'
    });
    Manager.addWidget(new AjaxSolr.ResultWidget({
      id: 'result',
      target: '#docs'
    }));
    Manager.addWidget(new AjaxSolr.PagerWidget({
      id: 'pager',
      target: '#pager',
      prevLabel: '&lt;',
      nextLabel: '&gt;',
      innerWindow: 1,
      renderHeader: function (perPage, offset, total) {
        $('#pager-header').html($('<span/>').text('displaying ' + Math.min(total, offset + 1) + ' to ' + Math.min(total, offset + perPage) + ' of ' + total));
      }
    }));
    var fields = [ 'title' ];
    /*
    for (var i = 0, l = fields.length; i < l; i++) {
      Manager.addWidget(new AjaxSolr.TagcloudWidget({
        id: fields[i],
        target: '#' + fields[i],
        field: fields[i]
      }));
    }
    */
    
    Manager.addWidget(new AjaxSolr.CurrentSearchWidget({
      id: 'currentsearch',
      target: '#selection'
    }));
    
   Manager.addWidget(new AjaxSolr.ClusterWidget({
	   id: 'categories',
	   target: '#mycarousel',
	   field: 'category'
   }));
   Manager.addWidget(new AjaxSolr.CatWidget({
	   id: 'cat_categories',
	   target: '#cat_mycarousel',
	   field: 'category'
   }));
  /*  Manager.addWidget(new AjaxSolr.AutocompleteWidget({
      id: 'text',
      target: '#search',
      field: 'allText',
      fields: ['title', 'links' ]
    }));
    */
//    Manager.addWidget(new AjaxSolr.CountryCodeWidget({
//      id: 'countries',
//      target: '#countries',
//      field: 'countryCodes'
//    }));
//    Manager.addWidget(new AjaxSolr.CalendarWidget({
//      id: 'calendar',
//      target: '#calendar',
//      field: 'date'
//    }));
    Manager.init();
   // Manager.store.addByValue('q', '*:*');
    //Manager.store.addByValue('q', 'finance');
    var params = {
      //facet: true,
      'facet.field': [ 'category'],
      'facet.limit': 100,
      'facet.sort': 'count',
      'facet.mincount': 5,
      'facet.method':'fc',
 //     'facet.mincount': 1,

      //      'f.topics.facet.limit': 50,
//      'f.countryCodes.facet.limit': -1,
//      'facet.date': 'date',
//      'facet.date.start': '1987-02-26T00:00:00.000Z/DAY',
//      'facet.date.end': '1987-10-20T00:00:00.000Z/DAY+1DAY',
//      'facet.date.gap': '+1DAY',
    'json.nl': 'arrarr',    
    'fl':['title','id','category'],
    'rows': 50,    
    'shards':'localhost:9000/solr/core0/,localhost:9000/solr/core1/,localhost:9000/solr/core2/,localhost:9000/solr/core3/,localhost:9000/solr/core4/',
    'facet': true,
    'clustering': true,
    'fq':'NOT title:wikipedia'
    };
    for (var name in params) {
      Manager.store.addByValue(name, params[name]);
    }
  //  Manager.doRequest();
  });

  $.fn.showIf = function (condition) {
    if (condition) {
      return this.show();
    }
    else {
      return this.hide();
    }
  }
  
  //////////

})(jQuery);
