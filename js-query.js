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
            })
            return this;
        },
        text:function(txt){
            if(txt===undefined){
                var ret = "";
                this.forEach(function(el){
                    ret += el.innerText;
                });
                return ret;
            }
            this.forEach(function(el){
                el.innerText = txt;
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
                    $(el).listen("load");
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
            this.forEach(function(el){
                if(val==="" || val===null || val===undefined){
                    el.removeAttribute(n);
                }else {
                    el.setAttribute(n, val);
                }
            });
            return this;
        },

        removeAttr:function(n){
            return this.attr(n);
        }
    };
    var utils = {
        isString:function(o){
            return typeof o == "string";
        },
        isArray:function(o){
            return Array.isArray(o);
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