function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != "function"){
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}
function getHTTPObject () {
	if (typeof XMLHttpRequest == "undefined")
		XMLHttpRequest = function (){
			try { return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
			   catch (e) {}
			try { return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
			   catch (e) {}
			try { return new ActiveXObject("Msxml2.XMLHTTP");}
			   catch (e) {}
		}
		return new XMLHttpRequest();
}
function getDate(){
	var request = getHTTPObject();
	if(request) {
		request.open("GET","echo.php",true);
		request.onreadystatechange = function(){
			if (request.readyState == 4){
				var txt = request.responseText;
				var Data = JSON.parse(txt);
				var body = document.getElementsByTagName("body")[0];
				var e_focus_slides = document.createElement("ul");
				//e_focus_slides.setAttribute("class","e_focus_slides clrfix");
				e_focus_slides.className = "e_focus_slide_clrfix";
				body.appendChild(e_focus_slides);
				var slides_list = document.createElement("li");
				//slides_list.setAttribute("class","slides_list fl");
				slides_list.className = "slides_list_fl";
				e_focus_slides.appendChild(slides_list);
				var page = document.createElement("ul");
				//page.setAttribute("class","page clrfix",);
				page.className = "page_clrfix";
				page.setAttribute("data-page","1");
				page.setAttribute("data-travelerCnt","48");
				page.setAttribute("data-size","20");
				slides_list.appendChild(page);
				for (var i = 0; i < 4; i++) {
					var page_list = document.createElement("li");
					page_list.className = "page-list fl";
					page.appendChild(page_list);
					var favicon = document.createElement("div");
					favicon.className = "favicon";
					page_list.appendChild(favicon);
					var img = document.createElement("img");
					img.setAttribute("src","...");
					img.setAttribute("alt","...");
					favicon.appendChild(img);
					var span = document.createElement("span");
					span.className = "zhezhao pngfix";
					favicon.appendChild(span);
					var userName = document.createElement("p");
					userName.className = "userName";
					page_list.appendChild(userName);
					var userName_txt = document.createTextNode(Data.data.travelers[i].nickName);
					userName.appendChild(userName_txt);
				}	
			}
		}
		request.send(null);
	}else{
		alert("sorry your browser dosent support XMLHttpRequest")
	}
}
addLoadEvent(getHTTPObject);
addLoadEvent(getDate);



