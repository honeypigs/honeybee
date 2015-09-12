window.onload = function(){
	var curPic = 0;
	var flog = 0;
	var movenext = document.getElementById("next");
	movenext.onclick = function(){
		next();
	}
	function next(){
		var curPage = document.getElementById("page"+curPic);
		curPage.style.webkitTransform = "rotateX(-270deg)";
		if (curPic == 5) {
			curPic = 0;
			var nextPage = document.getElementById("page"+ curPic);
			nextPage.style.webkitTransform = "rotateX(0deg)";
		} else if(curPic < 5){
			curPic++;
			var nextPage = document.getElementById("page"+ curPic);
			nextPage.style.webkitTransform = "rotateX(0deg)";
		}
	}
} 