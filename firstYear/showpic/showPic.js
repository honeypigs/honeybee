var IMG = ["img/0.jpg","img/1.jpg","img/2.jpg","img/3.jpg","img/4.jpg"];
//定义动画速度
var speed = 2000;
//判断DIV运动状态
var flag = 0;
var move_div = document.getElementById("move_div");
var i = 1;
var Toleft = null;
var Toright =null;
window.onload = function () {
	var a = 0;
	//获得控制按钮ID
	var left = document.getElementById("left");
	var stop_play = document.getElementById("stop");
	var right = document.getElementById("right");
	//对控制按钮添加事件监听
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
//向左运动动画
function  moveLeft () {
	if (flag == 0 || flag == -1) {
		flag = 1;
		 Toleft  = self.setInterval("left()",speed + 500);
	}
}
//向左运动函数
function left(){
	var popup = move_div.getElementsByTagName("div");//获得move_div中的所以子div
	move_div.removeChild(popup[0]);//移除第一个div
	$("#move_div").animate({left:-400*(++i) }, speed);//将剩余div向左移动一个div
	var revise = 1200+i*400;//最后一个div坐标
	var  push = document.createElement("div");//创建一个div，并在此div中添加一个图片
	var img = document.createElement("img");
	img.setAttribute("src",IMG[Math.abs(i-2)%5]);
	push.setAttribute("class","move_part");
	push.style.left = revise + "px";
	push.appendChild(img);
	//将此div加入move_div末尾
	move_div.appendChild(push);
}
//向右运动动画
function moveRight(){
	if (flag == 0 || flag == 1) {
		flag = -1;
		Toright = setInterval("right()",speed+500);
	}
}
function right(){
	var popup = move_div.getElementsByTagName("div");
	move_div.removeChild(popup[4]);//移除最后一个子div
	$("#move_div").animate({left:-400*(--i) }, speed);//剩余div向右移动一个div
	//在move+div开头添加一个div并加入图片
	var revise = -400+i*400;
	var  push = document.createElement("div");
	var img = document.createElement("img");
	img.setAttribute("src",IMG[Math.abs(i+4)%5]);
	push.setAttribute("class","move_part");
	push.style.left = revise + "px";
	push.appendChild(img);
	$(move_div).prepend(push);
}
//暂停动画
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