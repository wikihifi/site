(function ($) {

AjaxSolr.CurrentSearchWidget = AjaxSolr.AbstractWidget.extend({
  afterRequest: function () {
    var self = this;
    var links = [];

    var fq = this.manager.store.values('q');//fq
   
    for (var i = 0, l = fq.length; i < l; i++) {
    	 if(fq[i].match(/\^/g) != null) {
    	    	
    	    	continue;
    	 }
        var catIndex = fq[i].indexOf('AND category:');
        var qOnlyPart, catPart, catPartNoAND;
        if(catIndex != -1) {    
        	qOnlyPart = fq[i].substring(0, catIndex-1);
        	catPart = fq[i].substring(catIndex, fq[i].length);
        	catPartNoAND = catPart.substring(3); 
        } else
        	qOnlyPart = fq[i];
        
      if (fq[i].match(/[\[\{]\S+ TO \S+[\]\}]/)) {
        var field = fq[i].match(/^\w+:/)[0];
        var value = fq[i].substr(field.length + 1, 10);
       // links.push($('<a href="#"/>').text('(x) ' + field + value).click(self.removeFacet(fq[i])));
        if(qOnlyPart != '*:*') {        	
        	links.push($('<a href="#" id="mainQSTR" class="currSearch_term" />').text('(x) ' + qOnlyPart ).click(self.removeMainQuery(fq[i], catPart)));
        }if(catPart != undefined) {
        	if(qOnlyPart != '*:*') {
        		links.push($('<a href="#" class="currSearch_Cat" />').text('(x) ' + catPartNoAND ).click(self.removeCatFilter(fq[i])));
        	} else
        		links.push($('<a href="#"  class="currSearch_Cat" style="width:90%;"/>').text('(x) ' + catPartNoAND ).click(self.removeCatFilter(fq[i])));
        }
      }
      else {
     //   links.push($('<a href="#"/>').text('(x) ' + fq[i]).click(self.removeFacet(fq[i])));
    	  if(qOnlyPart != '*:*')
    		  links.push($('<a href="#" class="currSearch_term"/>').text('(x) ' + qOnlyPart ).click(self.removeMainQuery(fq[i], catPart)));
    	  if(catPart != undefined) {
    		  if(qOnlyPart != '*:*')
    			  links.push($('<a href="#" id="mainQSTR" class="currSearch_Cat" />').text('(x) ' + catPartNoAND ).click(self.removeCatFilter(fq[i])));
    		  else
    			  links.push($('<a href="#" id="mainQSTR" class="currSearch_Cat" style="width: 90%;"/>').text('(x) ' + catPartNoAND ).click(self.removeCatFilter(fq[i])));
    	  }
      }
    }

    if (links.length > 0) {
      links.unshift($('<a href="#" title="Reset Current Search" style="display:block; float: right; font-size: 1.3em; color: #F8B850; width: 7%; border: 1px solid; "/>').text('Reset').click(function () {
        self.manager.store.remove('q'); //fq
    	$("#docs").empty();
		$("#pager").empty();
		$("#pager-header").empty();		
		$("#selection").empty();
		$("#selection").hide();
        //self.manager.doRequest(0);
        return false;
      }));
    }
        

    if (links.length) {
      AjaxSolr.theme('list_items', this.target, links);
    }
    else {
      $(this.target).html('<div>Viewing all documents!</div>');
    }
  },
/*
  removeFacet: function (facet) {
    var self = this;
    return function () {
      if (self.manager.store.removeByValue('q', facet)) { //fq
			var term = $('#query').val();
			if(term != undefined && term != null &&  term.split(" ").length>1) {
				term = '("'+ term + '"' + ' ' + term +')';
			}
			self.manager.store.addByValue('q', term);
        self.manager.doRequest(0);
      }
      return false;
    };
  },
  */
  removeCatFilter: function (facet) {
	    var self = this;
	    return function () {
	      if (self.manager.store.removeByValue('q', facet)) { //fq
				var term = $('#query').val();
				g_debugObj = term;
				if(term != undefined && term != null && term != '') {
					if(term.split(" ").length>1)
						term = '("'+ term + '"' + ' ' + term +')';
					self.manager.store.addByValue('q', term);
			        self.manager.doRequest(0);			        
				} else {
					$("#docs").empty();
					$("#pager").empty();
					$("#pager-header").empty();
				}
				$("#selection").empty();

				$("#selection").hide();

	      }
	      return false;
	    };
	  },
	  
	  removeMainQuery: function (facet, catPart) {
		    var self = this;		    
		    return function () {
		    	var term;		    	
		      if (self.manager.store.removeByValue('q', facet)) { //fq
		    	  if(catPart != undefined) {					
					term = '*:* ' + catPart;					
		    	  } else {
		    		  term="*:*"; //TODO	
		    		  		    	  }
		    	  $('#query').val('');
		    	  self.manager.store.addByValue('q', term);
		        self.manager.doRequest(0);
		        
		      }
		      return false;
		    };
		    
		  }
 
  
});

})(jQuery);
