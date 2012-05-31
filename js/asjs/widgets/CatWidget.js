(function ($) {

AjaxSolr.CatWidget = AjaxSolr.AbstractFacetWidget.extend({
  afterRequest: function () {
    $(this.target).empty();

    var maxCount = 0;
    var ctr=0;   
    var str='';
    var categoryList = [];
//    for (var facet in this.manager.response.facet_counts.facet_fields[this.field]) {
   
    //for(i=Manager.response.facet_counts.facet_fields['category'].length-1;i>=0;i-- ) {
    for(i=0; i<Manager.response.facet_counts.facet_fields['category'].length;i++ ) {
    	str = this.manager.response.facet_counts.facet_fields[this.field][i];
    	var str2 = String(str);
    	str2 = str2.split(",")[0];
    	
    	if("Living people" == str2 || "Year of birth missing \(living people\)" == str2 || "Article Feedback Pilot" == str2 ||  "English-language films" == str2|| "American businesspeople" == str2 || "American Jews" == str2|| "American films" == str2)
    		continue;
    	var childID = 'c' + ctr;
    	categoryList.push(str2);
    	str2 = '<span style="padding-left:80%;"><a href="#" onclick="jscrollerFromArr(g_categoryList,\''+ this.target +'\',\'cat_eq\',' + ctr +')">X</a></span><br/>' + str2;
    	$(this.target).append('<li id='+ childID + ' >' + str2 + '</li>');
    	ctr++;
      }
    // using this store sends the whole list to server
  //  this.manager.store.addByValue('CategoryList', categoryList);
    g_categoryList = categoryList;
    
    var visibleCt, scrollCt;
    if(categoryList.length>=5) { 
    	visibleCt =5;
    	scrollCt=1;
    } else {
    	visibleCt = categoryList.length;
    	scrollCt=0;
    }
    
    $(this.target).jcarousel({
		// Configuration goes here
	    	itemFirstInCallback:  cat_mycarousel_itemFirstInCallback,
        	itemLastInCallback:   cat_mycarousel_itemLastInCallback,			
		wrap : 'circular',
		visible: visibleCt,
		scroll: scrollCt,		
		itemFallbackDimension: 50

	});
    //Enable sliders
    $("#cat_eq > span").each(function() {
		$(this).slider("enable");
    });
    
 //   $(this.target).append(AjaxSolr.theme('select_tag', 'country', AjaxSolr.theme('options_for_select', options)));
   /*
    var self = this;
    $(this.target).find('#country').change(function () {
      var value = $(this).val();
      if (value && self.add(value)) {
        self.manager.doRequest(0);
      }
    });

    var chd = [];
    var chld = '';
    for (var facet in this.manager.response.facet_counts.facet_fields[this.field]) {
      if (facet.length == 2) { // only display country codes
        chd.push(parseInt(this.manager.response.facet_counts.facet_fields[this.field][facet] / maxCount * 100) + '.0');
        chld += facet;
      }
    }
    for (var value in maps) {
      var src = 'http://chart.apis.google.com/chart?chco=f5f5f5,edf0d4,6c9642,365e24,13390a&chd=t:' + chd.join(',') + '&chf=bg,s,eaf7fe&chtm=' + value + '&chld=' + chld + '&chs=350x180&cht=t';
      $('<img/>').attr('id', this.id + value).showIf(value == 'world').attr('src', src).appendTo(this.target);
    }
      */
  }

});

})(jQuery);
