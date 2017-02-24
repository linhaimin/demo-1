//获取cookie
	function getCookie(){ 
		var cookie = {};
		var all = document.cookie;
		if(all === '') return cookie;
		var list = all.split('; ');
		for (var i = 0; i < list.length; i++){
			var item = list[i];
			var p = item.indexOf('=');
			var name = item.substring(0,p);
			name = decodeURIComponent(name);
			var value = item.substring(p + 1);
			value = decodeURIComponent(value);
			cookie[name] = value;
		}
		return cookie;
	}
//设置cookie
	function setCookie(cookiename,cookievalue,hours){
		var date = new Date();
		date.setTime(date.getTime() + Number(hours) * 3600 * 1000);
		document.cookie = cookiename + "=" + cookievalue + "; path=/;expires = " + date.toGMTString();
	}
	
//点击关闭顶部提示条
	function clickClose(){
		var att = document.getElementsByClassName('tips')[0],
			attclose = document.getElementById('notRemind');
		function closeClick(){
			var att = document.getElementsByClassName('tips')[0];
			att.style.display = 'none';
			setCookie('close','close','1');
		}
		function close(elem){
			var cookies = getCookie();
			if(cookies.close == 'close'){
				att.style.display = 'none';
			}
			else{
				att.style.display = 'block';
			}
		}
		addEvent(attclose,'click',closeClick);
		close(att);
	}
	var cookie = getCookie();
	clickClose();

//轮播图
	//淡入效果
	function fadein (ele) {
		var stepLength = 1/25 * 100;
		setOpacity(ele,0);
		var op = 0;
		function step () {
			if ( op +stepLength <= 100) {
				op += stepLength;
				setOpacity(ele,op);
			} else {
				op = 100;
				clearInterval(setIntervalId);
			}
		}
		var setIntervalId = setInterval(step, 20);
	}
	//指示器点击触发事件
	function clickWrap (){
		var slide = document.getElementsByClassName('m-slide')[0];
			bnr = slide.getElementsByTagName('ul')[0];
			items = bnr.querySelectorAll('li');
			pointer = document.getElementById('pointer');
			pi = pointer.querySelectorAll('i'),
			num = 0;
		for (var i = 0; i <pi.length; i++) {
			(function(i){
				addEvent(pi[i],'click',function(event){
					for(var j=0;j< pi.length;j++){
						removeClassName(pi[j],'active');
						removeClassName(items[j],'active');
					}
					addClassName(pi[i],'active');
					addClassName(items[i],'active');
					fadein(items[i]);
					num = i;	//确保切换动画在鼠标点击事件后向下一个切换
				})
			})(i);
		}
		function autoplay(slide){
			var items = slide.getElementsByTagName('ul')[0].querySelectorAll('li');
			function step(){
                var index = (++num)%items.length,x = 0;
                for(var j=0;j< items.length;j++){
						removeClassName(pi[j],'active');
						removeClassName(items[j],'active');
				}
                addClassName(items[index],'active');
                addClassName(pi[index],'active');
                fadein(items[index]);
			}
			var timer = setInterval(step,4500);
			// 鼠标进入轮播图暂停动画。
			addEvent(slide,'mouseover',function(event){
				clearInterval(timer);
			});
		}
		autoplay(slide);
		// 鼠标离开轮播图开始动画。
		addEvent(slide,'mouseout',function(event){
			autoplay(slide);
		});
	}
	clickWrap();

//关注按钮
	function show(){
		var cookies = getCookie(),forms = document.getElementsByClassName('g-form')[0];
		if(cookies.loginSuc){
			forms.style.display = 'none';
			follow(cookies);
		}else{
			forms.style.display = 'block';
		}
	}
	function follow(c){
		var flwed = document.getElementById('follow'),flw = document.getElementById('lbtn');
		if(c.followSuc){
				flw.style.display = 'none';
				flwed.style.display = 'inline-block';
			}else{
				flw.style.display = 'inline-block';
				flwed.style.display = 'none';
			}
	}
	var cookie = getCookie();
	clickClose();
	follow(cookie);
//验证登录
	function verify(){
		var forms = document.login,
			username = forms.userName.value,
			pswd = forms.password.value,
			username = md5(username),
			pswd = md5(pswd);
		var data = {'userName':username,'password':pswd};
		url = 'http://study.163.com/webDev/login.htm';
		get(url,data,login);
	}
	function login(value){
		if(value == 1){
			setCookie('loginSuc','true',24);
			get('http://study.163.com/webDev/attention.htm',' ',function(a){
				if(a == 1){
					var flw = document.getElementById('lbtn'),flwed = document.getElementById('follow');
					setCookie('followSuc','true',24);
					flw.style.display = 'none';
					flwed.style.display = 'inline-block';
				}
			});
			show();
		}
		else{
			alert('登录失败，请检查用户名或密码！');
		}
	}

//生成课程卡片，设置课程卡片位置
	var getCourse = {
		url:'http://study.163.com/webDev/couresByCategory.htm',
		addElements:function(getdata) {
			// body...
			var data = JSON.parse(getdata);
			var elem,s_li,s_div,s_img,s_h4,s_span1,s_span2,s_strong,h_div,h_img,h_h3,h_span1,h_span2,h_span3,h_p;
			var pd = document.getElementById('pd-card');
			var pl = document.getElementById('pl-card');
			if (getComputedStyles(pd).display == 'block') {
				elem = pd;
			}
			else{elem=pl;}
			for (var i = 0; i < data.list.length; i++) {
				s_li = document.createElement('li');
				s_div = document.createElement('div');
				s_img = document.createElement('img');
				s_h4 = document.createElement('h4');
				s_span1 = document.createElement('span');
				s_span2 = document.createElement('span');
				s_strong = document.createElement('strong');
				h_div = document.createElement('div');
				hh_div = document.createElement('div');
				h_img = document.createElement('img');
				h_h3 = document.createElement('h3');
				h_span1 = document.createElement('span');
				h_span2 = document.createElement('span');
				h_span3 = document.createElement('span');
				h_p = document.createElement('p');

				s_li.setAttribute('class','m-card');
				s_div.setAttribute('class','s-card');
				s_img.setAttribute('src',data.list[i].middlePhotoUrl);
				s_img.setAttribute('alt',data.list[i].name);
				s_h4.innerHTML = data.list[i].name;
				s_span1.setAttribute('id','provider');
				s_span2.setAttribute('id','lcount');
				s_span1.innerHTML = data.list[i].provider;
				s_span2.innerHTML = data.list[i].learnerCount;			
				if(data.list[i].price == 0){
					s_strong.innerHTML = '免费';
				}
				else{
					s_strong.innerHTML = '&yen;' + data.list[i].price;
				}

				h_div.setAttribute('class','h-card');
				h_img.setAttribute('src',data.list[i].bigPhotoUrl);
				h_img.setAttribute('alt',data.list[i].name);
				h_h3.innerHTML = data.list[i].name;
				h_span1.setAttribute('id','lecount');
				h_span2.setAttribute('id','publisher');
				h_span3.setAttribute('id','sort');
				h_span1.innerHTML = data.list[i].learnerCount + '人在学';
				h_span2.innerHTML = '发布者：' + data.list[i].provider;
				if (data.list[i].categoryName == null) {
					h_span3.innerHTML = '分类：无';
				}
				else{
					h_span3.innerHTML = '分类：' + data.list[i].categoryName;
				}
				h_p.setAttribute('id','description');
				h_p.innerHTML = data.list[i].description;

				elem.appendChild(s_li);
				s_li.appendChild(s_div);
				s_div.appendChild(s_img);
				s_div.appendChild(s_h4);
				s_div.appendChild(s_span1);
				s_div.appendChild(s_span2);
				s_div.appendChild(s_strong);
				s_li.appendChild(h_div);
				h_div.appendChild(hh_div);
				hh_div.appendChild(h_img);
				hh_div.appendChild(h_h3);
				hh_div.appendChild(h_span1);
				hh_div.appendChild(h_span2);
				hh_div.appendChild(h_span3);
				h_div.appendChild(h_p);
				(function(s_div,h_div) {
					// body...
					addEvent(s_div,'mouseover',function(event) {
						s_div.style.display = 'none';
						h_div.style.display = 'block';
					});
					addEvent(h_div,'mouseleave',function(event) {
						h_div.style.display = 'none';
						s_div.style.display = 'block';
					});
				})(s_div,h_div);
			}

			var courseList = getElementsByClassName('m-card',elem),n = 0;
			if (courseList.length == 20 || courseList.length != 15) {
				for (var i = 0; i < 5; i++) {
					for (var j = 0; j < 4; j++) {
						courseList[n].style.left = j*245 + "px";
						courseList[n].style.top = i*249 + "px";
						n++;
						if (n>courseList.length) {break;}
					};
				}
			}
			else{
				for(var i = 0; i < 5; i++) {
 					for (var j = 0; j < 3; j++) {
						courseList[n].style.left = j*240 + "px";
						courseList[n].style.top = i*245 + "px";
						n++;
						if(n>courseList.length) {break;}
					};
				}
			}		
		}
	}
//设置请求参数
	function getParameters() {
		function getPsize(argument) {
			var x = window.innerWidth;
			if(x<=1205){
				return 15;
			}
			else{
				return 20;
			}
		}
		function getType() {
			var pd = document.getElementById('pd-card');
			if (getComputedStyles(pd).display == 'block') {
				return 10;
			}
			else{
				return 20;
			}
		}
		var data = {'pageNo': 1,'psize': getPsize(),'type': getType()};
		return data;		
	}
//获取课程列表	
	get(getCourse.url,getParameters(),getCourse.addElements);

//获取最热排行课程
	var getHotCourse = {
		url: 'http://study.163.com/webDev/hotcouresByCategory.htm',
		addElements: function(getdata) {
			var data = JSON.parse(getdata),li,img,a,span;
			var hotcourse = document.getElementById('hotList');
			for (var i = 0; i < data.length; i++) {
				li = document.createElement('li');
				img = document.createElement('img');
				a = document.createElement('a');
				span = document.createElement('span');

				img.setAttribute('src',data[i].smallPhotoUrl);
				img.setAttribute('alt',data[i].name);
				a.innerHTML = data[i].name;
				span.innerHTML = data[i].learnerCount;

				hotcourse.appendChild(li);
				li.appendChild(img);
				li.appendChild(a);
				li.appendChild(span);
			}
		}
	}
	get(getHotCourse.url,'',getHotCourse.addElements);

	function roll(elem,t){
		var step = 7,x=0;
		function update(){
			if(x>=-63){
				x -= step;
				elem.style.top = t + 70 + x + 'px';
			}else{
				clearInterval(updateRank);
			}
		}
		var updateRank = setInterval(update,50);
	}

	function turnback(elem,t){
		var step = 10,x = 0;
		function back(){	
			if(x<=700){
				x+=step;
				elem.style.top = t+x+'px';
			}else{
				clearInterval(interval);
			}
		}
		var interval = setInterval(back,1);
	}
	function upRank(){
		var ul = document.getElementById('hotList'),t =0;			
		var x = setInterval(function(){	
			t -= 70;
			if(t<=-700){
				turnback(ul,t);
				t = 0;
			}else{
				roll(ul,t);
			}
		},5000);
	}
	upRank();
//分页设置
	function turnPage() {
		var flip = document.getElementsByClassName('u-flip')[0],
			libtn = flip.getElementsByTagName('li'),
			pd = document.getElementById('pd-card'),
			pl = document.getElementById('pl-card'),
			elem;
		function tap(){
			if(getComputedStyles(pd).display == 'block'){
				return pd;
			}else {
				return pl;
			}
		}
		for (var i = 0; i < libtn.length; i++) {
			(function(i) {							
				if (i != 0 && i != libtn.length-1) {
					addEvent(libtn[i],'click',function(event) {
						for (var j = 0; j < libtn.length; j++) {
							removeClassName(libtn[j],'checked');
						}
						addClassName(libtn[i],'checked');
						var page = getParameters();
						page.pageNo = i;
						elem = tap();
						elem.innerHTML = ' ';
						get(getCourse.url,page,getCourse.addElements);
					});
				}
			})(i);
		}		
	}
	turnPage();

//添加事件	
	function addEvents() {
		// body...
		var tpd=document.getElementById('tpd'),
		    tpl=document.getElementById('tpl'),
		 	pd = document.getElementById('pd-card'),
		 	pl = document.getElementById('pl-card'),
		 	lbtn = document.getElementsByClassName('u-flip')[0].getElementsByTagName('li'),
		 	svideo = document.getElementById('theVideo'),
		 	cvideo = document.getElementById('videoClose'),
		 	gvideo = document.getElementsByClassName('g-video')[0],
		 	video = gvideo.getElementsByTagName('video')[0],
		 	flw = document.getElementById('lbtn'),
		 	logbtn = document.getElementById('u-btn'),
		 	lclose = document.getElementById('formClose'),
		 	gform = document.getElementsByClassName('g-form')[0];
		addEvent(tpd,'click',function(event) {
			removeClassName(tpl,'selec');
			addClassName(tpd,'selec');
			pd.style.display = 'block';
			pl.style.display = 'none';
			//重置课程列表及分页
			pd.innerHTML = ' ';
			get(getCourse.url,getParameters(),getCourse.addElements);
			for (var i = 0; i < lbtn.length; i++) {
				removeClassName(lbtn[i],'checked');
				addClassName(lbtn[1],'checked');
			}
		});
		addEvent(tpl,'click',function(event) {
			removeClassName(tpd,'selec');
			addClassName(tpl,'selec');
			pl.style.display = 'block';
			pd.style.display = 'none';
			//重置课程列表及分页
			pl.innerHTML = ' ';
			get(getCourse.url,getParameters(),getCourse.addElements);
			for (var i = 0; i < lbtn.length; i++) {
				removeClassName(lbtn[i],'checked');
				addClassName(lbtn[1],'checked');
			}
		});
		addEvent(window,'resize',function(){
			var x = window.innerWidth;
			var j = getParameters(),elem;
			if(j.type = 10){
				elem = document.getElementById('pd-card');
			}else {
				elem = document.getElementById('pl-card');
			}
			if(x <=1205){
				j.psize = 15;
				elem.innerHTML = '';
				get(getCourse.url,j,getCourse.addElements);
			}else{
				elem.innerHTML = '';
				get(getCourse.url,j,getCourse.addElements);
			}
		});
		//视频弹窗
		addEvent(svideo,'click',function(event) {
			gvideo.style.display = 'block';
		});
		addEvent(cvideo,'click',function(event) {
			gvideo.style.display = 'none';
			video.pause();
		});
		//登录模块
		addEvent(flw,'click',show);
		addEvent(lclose,'click',function(event) {
			gform.style.display = 'none';
		});
		addEvent(logbtn,'click',verify);
	}
	addEvents();