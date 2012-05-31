(function ($) {

AjaxSolr.theme.prototype.result = function (doc, snippet) {
	var wikipediaLink = 'http://www.wikipedia.org/wiki/';
	var title = doc.title;
	title = title.replace(' ', '_');
	wikipediaLink += title;
  var output = '<div class="result-row"><a target="_blank" href="'+wikipediaLink + '">' + doc.title + '</a><br/>';
 // output += '<p id="links_' + doc.id + '" class="links"></p>';
  var overFlowDiv = '<a onclick="ShowHide('+doc.id + ')">More/Less..</a><div style="display:none;" id="hidden'+doc.id + '">';
  //output += '<br/>';
  if(doc.category != undefined) {
	  
	  var ctr=0;
	  $.each(doc.category, function() {
		  var srchLink = '<a title="Show results in category:'+ this+'" onclick=resubmitWCat("' + doc.id + '_'+ctr+ '")>';
		  if(ctr<5) {
			  output+= (srchLink + '<span style="font-size:12px; color: #F8B850;" id="'+doc.id +'_' +ctr + '">' + this + '</span>;</a>');
		  } else {
			  overFlowDiv += (srchLink + '<span style="font-size:12px; color: #F8B850;">'+   this + '</span>;</a>');
		  }
		  ctr++;
	  });
	  if(ctr>5)
		  output += (overFlowDiv + '</div>');
  }else
	  output += '<br/>';
 
  /* output += '<p><span class="wiki-content" id="wiki-content'+ doc.id + '">' + 
               snippet + '</span><a href="#" id=more_"' + 
               doc.id+'" onclick="javascript:viewcache('+doc.id+')">view cache</a></p>';*/
  output += '</div>' ;
  return output;
};

AjaxSolr.theme.prototype.snippet = function (doc) {

  var output = '';
  /*
  if (doc.pagetext.length > 100) {
    output += doc.id + ' ' + doc.pagetext.substring(0, 100);
    output += '<span style="display:none;">' + doc.pagetext.substring(100);
    output += '</span> <a href="#" class="more">more</a>';
  }
  else {
   // output += doc.dateline + ' ' + doc.text;
  }*/
  output = doc.pagetext;
  return output;
};

AjaxSolr.theme.prototype.tag = function (value, weight, handler) {
  return $('<a href="#" class="tagcloud_item"/>').text(value).addClass('tagcloud_size_' + weight).click(handler);
};

AjaxSolr.theme.prototype.facet_link = function (value, handler) {
  return $('<a href="#"/>').text(value).click(handler);
};

AjaxSolr.theme.prototype.no_items_found = function () {
  return 'no items found in current selection';
};

})(jQuery);