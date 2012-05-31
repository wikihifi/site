function jscrollerFromArr(array, divName, catDivName, except) {
    $(divName).empty();

	var ctr = 0;
	var newCtr=0;
	//this one pushes all the categories "except" the one and creates a new carousel
	var newCatArray = [];
	array.splice(except, 1);
	$.each(array, function() {
		if(ctr != except) {
		var childID = 'c' + newCtr;		
    	var str2 = '<span style="padding-left:80%;"><a href="#" onclick="jscrollerFromArr(g_categoryList,\''+ divName +'\',\'cat_eq\',' + newCtr +')">X</a></span><br/>' + this;

		$(divName).append('<li id=' + childID + ' >' + str2 + '</li>');
		//newCatArray.push(this);
		newCtr++;
		}
		ctr++;
	});
	// using this store sends the whole list to server
	// this.manager.store.addByValue('array', array);
	//g_categoryList = newCatArray;
	g_categoryList = array;

	   var visibleCt, scrollCt;
	    if(array.length>=5) { //newCatArray
	    	visibleCt =5;
	    	scrollCt=5;
	    } else {
	    	visibleCt = array.length;
	    	scrollCt=0;
	    }
	    
	    $(divName).jcarousel({
			// Configuration goes here
			wrap : 'circular',
			visible: visibleCt,
			scroll: scrollCt

		});

	// Enable sliders
	$("#" + catDivName + " span").each(function() {
		$(this).slider("enable");
	});
}