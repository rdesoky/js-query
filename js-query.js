/**
 * Created by Ramy on 8/27/2014.
 */
(function(){
    var $ = function(q){
        var ret = [];
        if(typeof q === "string"){
            var tagMatch = /\<([A-z]+).*\>/;
            var tags = tagMatch.exec(q);
            if(tags){
                ret.push(document.createElement(tags[1]));
            }else {
                var nodes = document.querySelectorAll(q);
                for(var i=0;i <nodes.length; i++){
                    ret.push(nodes[i]);
                }
            }
        }else{
            ret.push(q);
        }
        return addFn(ret);
    };

    var fn = {
        hasClass:function(className){
            var not_found = false, classList=className.trim().split(" ");
            this.forEach(function(el){
                var elClasses =el.className.trim().split(" ");
                classList.forEach(function(cls){
                    if( elClasses.indexOf(cls) == -1 ){
                        not_found = true;
                    }
                });
            });
            return !not_found;
        },
        toggleClass:function(c){
            if(this.hasClass(c)){
                this.removeClass(c);
            }else{
                this.addClass(c);
            }
            return this;
        },
        dom:function(){
            return this[0];
        },
        html:function(shtml){
            if(shtml===undefined){
                var ret = "";
                this.forEach(function(el){
                    ret += el.innerHTML;
                });
                return ret;
            }
            this.forEach(function(el){
                el.innerHTML = shtml;
            });
            return this;
        },
        text:function(txt){
            if(txt===undefined){
                var ret = "";
                this.forEach(function(el){
                    ret += (el.tagName.toLowerCase() == "input") ? el.value : (el.innerText || el.innerHTML);
                });
                return ret;
            }else if(typeof txt !== "string"){
				txt = JSON.stringify(txt);
			}
            this.forEach(function(el){
                switch(el.tagName.toLowerCase()){
                    case "input":
                        el.value = txt;
                        break;
                    default:
                        el.innerHTML = txt;
                }
            });
            return this;
        },
        ready:function(cb){
            this.forEach(function(el){
                if(el == document){
                    if(document.readyState === "complete"){
                        setTimeout(cb,1);
                        return this;
                    }else{
                        $(window).ready(cb);
                    }
                }else{
                    $(el).listen("load",cb);
                }
            });
            return this;
        },
        listen:function(id, cb){
            this.forEach(function(el){
                el.addEventListener(id, cb);
            });
            return this;
        },
        click:function(cb){
            if(cb===undefined){
                this.forEach(function(el){
                    el.click();
                });
                return this;
            }
            return this.listen("click", cb);
        },
        show:function(){
            return this.css("display","");
        },
        hide:function(){
            return this.css("display","none");
        },
        css:function(s,val){
            this.forEach(function(el){
                if(utils.isString(s)) {
                    el.style[s] = val || "";
                }else{
                    for(var k in s){
                        el.style[k] = s[k];
                    }
                }
            });
            return this;
        },
		append:function(e){//TODO: need review
			if(e.dom === fn.dom){
				e = e.dom();
			}
			this.forEach(function(el){
				el.appendChild(e);
			});
			return this;
		},
        prepend:function(e){
            if(e.dom === fn.dom){
                e = e.dom();
            }
            this.forEach(function(el){
                el.insertBefore(e, el.firstChild);
            });
            return this;
        },
        attr:function(n,val){
            var ret = (val===undefined) ? [] : null;
            this.forEach(function(el){
                if(val==="" || val===null){
                    el.removeAttribute(n);
                }
                else if(ret){
                    ret.push(el.getAttribute(n));
                }
                else {
                    el.setAttribute(n, val);
                }
            });
            if( ret && ret.length == 1 ){
                return ret[0];
            }
            return ret || this;
        },
        removeAttr:function(n){
            return this.attr(n, null);
        },
        addClass:function(c){
            this.forEach(function(el){
                el.className = el.className.trim().length ? utils.addArrayItem( el.className.trim().split(" "), c).join(" ") : c;
            });
            return this;
        },
        removeClass:function(c){
            if(typeof c !== "string"){
                return this;
            }
            var delist = c.trim().split(" ");
            this.forEach(function(el){
                if(!el.className.trim().length){
                    return;
                }
                var list = el.className.trim().split(" ");
                delist.forEach(function(dc){
                    var found = list.indexOf(dc);
                    if(found!=-1){
                        list.splice(found,1);
                        el.className = list.join(" ");
                    }
                });
            });
            return this;
        },
		remove:function(){
			this.forEach(function(el){
				if(el.parentNode){
					el.parentNode.removeChild(el);
				}
			});
			return this;
		}
    };
    var utils = {
        isString:function(o){
            return typeof o == "string";
        },
        isArray:function(o){
            return Array.isArray(o);
        },
        addArrayItem:function(arr,item){
            if(arr.indexOf(item)==-1){
                arr.push(item)
            }
            return arr;
        }
    };
    var addFn = function(el){
        for(var f in fn){
            el[f] = fn[f];
        }
        return el;
    };

    if(typeof define === "function" && define.amd){
        define(function(){
            return $;
        });
    }else{
        window.$ = $;
    }

})();