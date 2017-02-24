/* 兼容getElementsByClassName */
	var getElementsByClassName = document.getElementsByClassName?function(name,node){
		var node = node || document;
		return node.getElementsByClassName(name);
		} : function(name,node){
			var node = node || document,
			     nodes = [],names = [],namelist = [];
			var childs = node.getElementsByTagName('*');
			for(var i = 0;i<childs.length;i++){
				if(childs[i].className){
					nodes.push(childs[i]);
				}
			}
			for(var j = 0;j<nodes.length;j++){
				names = nodes[j].className.split(' ');
				for(k=0;k<names.length;k++){
					if(names[k] == name){
						namelist.push(nodes[j]);
						break;
					}
				}
			}
		return namelist;
		}
/* addClassName和removeClassName */	
	
	function addClassName(node,name){
		var arr = node.className.split(' ');
		if(node.className == ''){
			node.className = name;
		}else if (arr.indexOf(name) == -1){
			node.className += ' '+name;
		}
	}
	
	function removeClassName(node,name){
		var arr = [];
		if(node.className != ''){
			arr = node.className.split(' ');
			var _index = arr.indexOf(name);
			if(_index != -1){
				arr.splice(_index, 1);
				node.className = arr.join(' ');
			}
		}
	}
//兼容事件操作 
	var addEvent = document.addEventListener?function(elem,type,listener,userCapture){
		elem.addEventListener(type,listener,userCapture);
	}:function(elem,type,listener){
		elem.attachEvent('on'+type,listener);
	}
	var removeEvent = document.removeEventListener?function(elem,type,listener,userCapture){
		elem.removeEventListener(type, listener,userCapture);
	}:function(elem,type,listener){
		elem.detachEvent('on'+type,listener);
	}
//透明度兼容
	function setOpacity(ele, opacity) { 
	if (ele.style.opacity != undefined) { 
		ele.style.opacity = opacity / 100; 
	}else { 
		ele.style.filter = "alpha(opacity=" + opacity + ")"; 
	} 
	} 
//获取原有样式
	function getComputedStyles(element){
	    if(window.getComputedStyle){
	        return window.getComputedStyle(element);
	    }else{
	        return element.currentStyle;
	    }
	}
//设置参数格式 
	function serialize (data) {
		if (!data) return '';
		var pairs = [];
		for (var name in data){
			if (!data.hasOwnProperty(name)) continue;
			if (typeof data[name] === 'function') continue;
			var value = data[name].toString();
			name = encodeURIComponent(name);
			value = encodeURIComponent(value);
			pairs.push(name + '=' + value);
		}
		return pairs.join('&');
	}
//Get方法
	function get(url,data,callback){
		var xhr = new XMLHttpRequest();
		data = (data == ''&&data == ' ')?' ':data;
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				if((xhr.status >= 200 && xhr.status < 300)|| xhr.status == 304){
					callback(xhr.responseText);
				}else{
					alert('请求失败：'+ xhr.status);
				}
			}
		}
		if (data!=' '){
			url += '?'+ serialize(data);
		}else {
			url += '?';
		}
		xhr.open('get',url,true);
		xhr.send(null);
	}