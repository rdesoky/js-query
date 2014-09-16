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
            });
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
                el.innerHTML = txt;
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
            var ret = (val===undefined) ? [] : this;
            this.forEach(function(el){
                if(val==="" || val===null){
                    el.removeAttribute(n);
                }
                else if(val===undefined){
                    ret.push(el.getAttribute(n));
                }
                else {
                    el.setAttribute(n, val);
                }
            });
            if( utils.isArray(ret) && ret.length == 1 ){
                return ret[0];
            }
            return ret;
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
            this.forEach(function(el){
                if(!el.className.trim().length){
                    return;
                }
                var list = el.className.trim().split(" ");
                var found = list.indexOf(c);
                if(found!=-1){
                    list.splice(found,1);
                    el.className = list.join(" ");
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