
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var WIDTH = canvas.width;
var HEIGHT = canvas.height;
var starpic = new Image();
var backpic = new Image();
backpic.src = "img/night.jpg";
var num = 100;
var stars = [];
starpic.src = "img/star.png";
var flag = false;
var life = 0;

window.onload = function(){
	drawBackground();
	drawGirl();
	for (var i = 0; i <  num; i++) {
		var obj = new starObj();
		stars.push(obj);
		stars[i].init();
		stars[i].draw(context,starpic);
	}
	gameloop();

	document.addEventListener("mousemove",mousemove,false);
}


function drawStars(){
		for (var i = 0; i <  num; i++) {
		stars[i].update();
		stars[i].draw(context,starpic);
	}
}
function drawBackground(){
	context.fillStyle = "#395555";
	context.fillRect(0,0,WIDTH,HEIGHT);
}
function gameloop(){
	setInterval(function(){
		context.clearRect(100,100,600,400);
		drawBackground();
		drawGirl();
		drawStars();
		showStars();
	},150);
}
function drawGirl(){
	context.drawImage(backpic,100,100,600,400);
}
 	
var starObj = function(){
	this.x;
	this.y;
	this.i = Math.floor(Math.random()*7);
	this.vx;
	this.vy;
}
starObj.prototype.init = function(){
	this.x = Math.random() * 590 +100;
	this.y = Math.random() * 390 +100;
	this.vx = Math.random() * 2 - 1;
	this.vy = Math.random() * 2 - 1;  
} 
starObj.prototype.update= function(){
	this.i += 1;
	if (this.i >=7){
		this.i = 0;
	}
	this.x += this.vx;
	this.y += this.vy;

	if (this.x < 100|| this.x > 700) {
		this.init();
		return;
	}
	if (this.y < 100 || this.y > 500) {
		this.init();
		return;
	}
}
starObj.prototype.draw = function(){
	context.save();
	context.globalAlpha = life;
	context.drawImage(starpic,this.i * 7,0,7,7,this.x,this.y,7,7);
	context.restore();
}

function mousemove(e){
	if (e.offsetLeft || e.layerX) {
		var px = e.offsetLeft == undefined ? e.layerX : e.offsetLeft;
		var py  = e.offsetTop == undefined ? e.layerY : e.offsetTop;
		if (px > 344 && px < 944&& py >150 && py < 550) {
			flag = true;
		}else{
			flag = false;
		}
	}
}

function showStars(){
	if (flag == true) {
		life = life + 0.1;
		if (life >1) 
			life = 1;
	}else{
		life -= 0.1;
		if (life< 0) 
			life = 0;
	}
}