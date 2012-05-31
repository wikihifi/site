(function($) {
  $.fn.glowbuttons = function(options) {
	// build main options before element iteration
	var opts = $.extend({}, $.fn.glowbuttons.defaults, options);
	
	return this.each(function() {
	    var button = $(this);
	    //  if the metadata plug-in is installed, use it to build the options
	    var o = $.metadata ? $.extend({}, opts, button.metadata()) : opts;
        //  inject the parent nodes            
        button.wrap('<span class="glow-button"><span class="inner"></span></span>');
        //  ie display workaround
        button.css('display', $.browser.msie ? 'inline-block' : 'block');
        
        button.parent().each(function(){ 
            var innerWrapper = $(this);
            
            //  more browser specific workarounds    
            innerWrapper.css('display', $.browser.msie ? 'inline-block' : 'block'); 
            if($.browser.msie) {
                innerWrapper.css({ 'position':'relative', 'left':'-1px' });
            }
            
            innerWrapper.parent().each(function(){
                var outerWrapper = $(this);               
                outerWrapper.css('backgroundColor', o.from);                
                outerWrapper.css('display', $.browser.mozilla ? '-moz-inline-box' : 'inline-block');
                
                //  our glossy image is a transparent PNG so
                //  we have a special class that uses an image filter
                if($.browser.msie && $.browser.version < 7) {
                    var bgImage = outerWrapper.css('backgroundImage');
				    outerWrapper.css('backgroundImage', 'none');
				    //  extract the path to the gloss image from the outerwrapper's background-image.
				    //  this will have the full path to it, so parse out the url stuff
				    outerWrapper.css('filter', "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + bgImage.split('url("')[1].split('")')[0] + "',sizingMethod='scale')");                
                }                     
            })
            //  add a class to the outer most node - this helps with theming
            .addClass(o.className)
            //  finally attach to the hover events to run the animation
            .hover(
                function(){
                    $(this).stop();
                    $(this).animate({ backgroundColor: o.to }, o.speed);
                },
                function(){
                    $(this).stop();
                    $(this).animate({ backgroundColor: o.from }, o.speed);
                }
           );                     
        });
	});
  };

  $.fn.glowbuttons.defaults = {
	from: '#016bbd',
	to: '#b1ddff',
	className: 'blue',
	speed: 1000
  };

})(jQuery);