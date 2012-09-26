/*dom.js, Johan Bouveng, 2012 - abbreviations: el:element,els:elements,fn:function,obj:object,evt:event*/
(function(){
	var dom = { /*pvt methods*/
		get: function(els){
			this.els = [];
			for(var i=0, el; el=els[i]; ++i){
				this.els.push(document.getElementById(el));
			}                
		},
		evt: function(obj,evt,fn){ /*handler preserving 'this'*/
			if(obj.attachEvent){
				obj['e'+evt+fn] = fn;
				obj[evt+fn] = function(){obj['e'+evt+fn](window.event);};
				obj.attachEvent('on'+evt, obj[evt+fn]);
			} else {
				obj.addEventListener(evt,fn,false);
			}
		}
	};
	dom.get.prototype = { /*pub methods*/
		each: function(fn){
			for(var i=0; i<this.els.length; ++i){
				fn.call(this, this.els[i]);
			}
			return this;
		},
		toggle: function(){
			this.each(function(el){
				el.style.display='none'==el.style.display?'':"none";
			});
			return this;
		},
		watch: function(evt,fn){
			this.each(function(el){
				dom.evt(el,evt,fn);
			});
		},
		inject: function(str){
			this.each(function(el){
				el.innerHTML = str;
			});				
			return this;
		},
		injectscript: function(src){
			var head = document.getElementsByTagName('head')[0];
			var script = document.createElement('script');
			script.src = src;
			head.appendChild(script);
			return this;
		},
		val: function(){
			this.each(function(el){
				val = el.value;
			});
			return val;
		},
		empty: function(){
			this.each(function(el){
				el.innerHTML = "";
			});
			return this;
		},
		class: function(str){
			this.each(function(el){
				el.className = str;
			});
			return this;			
		},
		remove: function(el){
			el.parentNode.removeChild(el);
		},
		children: function(){
			this.each(function(el){
				children = el.childNodes.length;
			});
			return children;
		}
	};
	window.dom = function(){
		return new dom.get(arguments);
	};
})();