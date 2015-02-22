var IMG = ["img/0.jpg","img/1.jpg","img/2.jpg","img/3.jpg","img/4.jpg"];
var speed = 2000;
var flag = 0;
var move_div = document.getElementById("move_div");
var i = 1;
var Toleft = null;
var Toright =null;
window.onload = function () {
	var a = 0;
	var left = document.getElementById("left");
	var stop_play = document.getElementById("stop");
	var right = document.getElementById("right");
	left.onclick = function (){
		if (flag == -1) {
			clearInterval(Toright);
		}
		moveLeft();
	}
	stop_play.onclick = function (){
		stopPlay();
	}
	right.onclick = function (){
		if (flag == 1) {
			clearInterval(Toleft);
		}
		moveRight();
	}
}
function  moveLeft () {
	if (flag == 0 || flag == -1) {
		flag = 1;
		 Toleft  = self.setInterval("left()",speed + 500);
	}
}
function left(){
	var popup = move_div.getElementsByTagName("div");
	move_div.removeChild(popup[0]);
	$("#move_div").animate({left:-400*(++i) }, speed);
	var revise = 1200+i*400;
	var  push = document.createElement("div");
	var img = document.createElement("img");
	img.setAttribute("src",IMG[Math.abs(i-2)%5]);
	push.setAttribute("class","move_part");
	push.style.left = revise + "px";
	push.appendChild(img);
	move_div.appendChild(push);
}
function moveRight(){
	if (flag == 0 || flag == 1) {
		flag = -1;
		Toright = setInterval("right()",speed+500);
	}
}
function right(){
	var popup = move_div.getElementsByTagName("div");
	move_div.removeChild(popup[4]);
	$("#move_div").animate({left:-400*(--i) }, speed);
	var revise = -400+i*400;
	var  push = document.createElement("div");
	var img = document.createElement("img");
	img.setAttribute("src",IMG[Math.abs(i+4)%5]);
	push.setAttribute("class","move_part");
	push.style.left = revise + "px";
	push.appendChild(img);
	$(move_div).prepend(push);
}
function stopPlay(){
		if(flag == 1) {
			flag = 0;
			clearInterval(Toleft);
		}
		if(flag == -1) {
			flag = 0;
			clearInterval(Toright);	
		}
}