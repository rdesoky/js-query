/**
 * Created by Ramy on 8/27/2014.
 */
(function(){
	var fn = {
		html:function(shtml){
			this.innerHTML = shtml;
			return this;
		},
		ready:function(cb){
			return this.listen("ready",cb);
		},
		listen:function(id, cb){
			this.addEventListener(id, cb);
			return this;
		}
	};
	var utils = {
		isArray:function(o){
			return Array.isArray(0);
		}
	};
	
	var $ = function(q){
		var el = document.querySelector(q);
		el.prototype = fn;
	};
	
	$.prototype = utils;
	
	if(require && require.amd){
		define(function(){
			return $;
		});
	}
	
})();