/**
 * Created by Ramy on 8/27/2014.
 */
(function(){
	var fn = {
		html:function(shtml){
			this.innerHTML = shtml;
			return this;
		},
        text:function(txt){
            this.innerText = txt;
            return this;
        },
		ready:function(cb){
            if(this == document){
                if(document.readyState === "complete"){
                    setTimeout(cb,1);
                    return this;
                }else{
                    $(window).ready(cb);
                }
                return this;
            }
			return this.listen("load",cb);
		},
		listen:function(id, cb){
			this.addEventListener(id, cb);
			return this;
		},
        click:function(cb){
            return this.listen("click", cb);
        },
        show:function(){
            return this.css("display","");
        },
        hide:function(){
            return this.css("display","none");
        },
        css:function(s,val){
            this.style[s]=val;
            return this;
        },
        prepend:function(el){
            this.insertBefore(el, this.firstChild);
        },
        attr:function(n,val){
            if(val==="" || val===null || val===undefined){
                this.removeAttribute(n);
            }else {
                this.setAttribute(n, val);
            }
        },
        removeAttr:function(n){
            return this.attr(n);
        }
	};
	var utils = {
		isArray:function(o){
			return Array.isArray(0);
		}
	};
	var addFn = function(el){
        for(var f in fn){
            el[f] = fn[f];
        }
        return el;
    };
	var $ = function(q){
        var ret = q;
        if(typeof q === "string"){
            var tagMatch = /\<([A-z]+).*\>/;
            var tags = tagMatch.exec(q);
            if(tags){
                ret = document.createElement(tags[1]);
            }else {
                ret = document.querySelector(q);
            }
        }
        return addFn(ret);
	};
	
	$.prototype = utils;
	
	if(typeof define === "function" && define.amd){
		define(function(){
			return $;
		});
	}else{
        window.$ = $;
    }
	
})();