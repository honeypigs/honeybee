var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
canvas.style.backgroundColor = "black";
var IMG =  new Image();
IMG.src = "0.jpg";
var speed = 50;
var timer = 0;
var light= {
	x : canvas.width*0.5,
	y : canvas.height*0.5,
	r : 80,
	vx : 10,
	vy : 10
}
function drawLight(cxt){
	cxt.save();
	cxt.beginPath();
	cxt.arc(light.x,light.y,light.r,0,2*Math.PI);
	cxt.fillStyle = "white";
	cxt.fill();
	cxt.clip();
	drawPic(context);
	cxt.restore();
}

var start = document.getElementById("start");
start.onclick = function(){
	clearInterval(timer);
	timer = setInterval("upDate()",speed);
}
var stop = document.getElementById("stop");
stop.onclick = function(){
	clearInterval(timer);
}

function upDate(){
	context.clearRect(0,0,800,600);
	light.x += light.vx;
	light.y += light.vy;
	if (light.x >= canvas.width - light.r) {
		light.x = canvas.width - light.r;
		light.vx = -light.vx;  
	}
	if (light.x <= 0+ light.r) {
		light.x = light.r;
		light.vx = -light.vx;
	}
	if (light.y >= canvas.height - light.r) {
		light.y = canvas.height - light.r;
		light.vy = -light.vy;
	}
	if (light.y <= light.r ) {
		light.y =  light.r;
		light.vy = -light.vy;
	}
	drawLight(context);
}

function drawPic(cxt){
		cxt.beginPath();
		cxt.drawImage(IMG,0,0,800,600);
}