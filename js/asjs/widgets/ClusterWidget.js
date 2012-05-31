(function($) {

	AjaxSolr.ClusterWidget = AjaxSolr.AbstractFacetWidget
			.extend({
				afterRequest : function() {
					$(this.target).empty();

					var maxCount = 0;
					var ctr = 0;
					var str = '';
					var clusterList = [];

					// for (var cluster in this.manager.response.clusters) {
					if (this.manager.response.clusters != undefined) {
						
						for ( var i = 0, l = this.manager.response.clusters.length; i < l; i++) {
							var cluster = this.manager.response.clusters[i];

							var labelStrRaw = cluster.labels[0];
							var labelStr = labelStrRaw.replace(/_/g, ' ');
							// var labelDocsList = cluster[1];
							// alert(labelDocsList);

							// var numDocs = labelDocsList.length();

							ctr++;
							var childID = 'c' + ctr;
							clusterList.push(labelStr);
							labelStr = '<span style="padding-left:80%;"><a href="#" onclick="jscrollerFromArr(g_clusterList,\''+ this.target +'\',\'eq\',' + ctr +')">X</a></span><br/>' + labelStr;
							$(this.target).append(
									'<li id=' + childID + ' >' + labelStr
											+ '</li>');

						}
						//this.manager.store.addByValue('ClusterList',
						//		clusterList);
						
						g_clusterList = clusterList;
						
						 var visibleCt, scrollCt;
						    if(clusterList.length>=5) { 
						    	visibleCt =5;
						    	scrollCt=1;
						    } else {
						    	visibleCt = clusterList.length;
						    	scrollCt=0;
						    }

						$(this.target).jcarousel({
							// Configuration goes here
							itemFirstInCallback:  mycarousel_itemFirstInCallback,
		        				itemLastInCallback:   mycarousel_itemLastInCallback,
							wrap : 'circular',
							visible: visibleCt,
							scroll: scrollCt,							
							itemFallbackDimension: 50
						});
						// Enable sliders
						$("#eq > span").each(function() {
							$(this).slider("enable");
						});

					}
					// $(this.target).append(AjaxSolr.theme('select_tag',
					// 'country', AjaxSolr.theme('options_for_select',
					// options)));
					/*
					 * var self = this;
					 * $(this.target).find('#country').change(function () { var
					 * value = $(this).val(); if (value && self.add(value)) {
					 * self.manager.doRequest(0); } });
					 * 
					 * var chd = []; var chld = ''; for (var facet in
					 * this.manager.response.facet_counts.facet_fields[this.field]) {
					 * if (facet.length == 2) { // only display country codes
					 * chd.push(parseInt(this.manager.response.facet_counts.facet_fields[this.field][facet] /
					 * maxCount * 100) + '.0'); chld += facet; } } for (var
					 * value in maps) { var src =
					 * 'http://chart.apis.google.com/chart?chco=f5f5f5,edf0d4,6c9642,365e24,13390a&chd=t:' +
					 * chd.join(',') + '&chf=bg,s,eaf7fe&chtm=' + value +
					 * '&chld=' + chld + '&chs=350x180&cht=t'; $('<img/>').attr('id',
					 * this.id + value).showIf(value == 'world').attr('src',
					 * src).appendTo(this.target); }
					 */
				}

			});

})(jQuery);
