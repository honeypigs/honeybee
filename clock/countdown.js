var WINDOW_HEIGHT = 468;
var WINDOW_WIDTH = 1024;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;
//var endTime = new Date();
//endTime.setTime(endTime.getTime()+3600*1000);
var curShowTimeSeconds = 0;
var balls = [];
const colors=["#c00","#f44","#f80","#fb3","#690","#9c0","#93c","#a6c","#09c","#33b5e5"];
window.onload = function () {
	WINDOW_WIDTH = document.documentElement.clientWidth-20;
	WINDOW_HEIGHT = document.documentElement.clientHeight-20;
	MARGIN_LEFT =Math.round(WINDOW_WIDTH/10);
	RADIUS = Math.round(WINDOW_WIDTH*4/5/108) - 1;
	MARGIN_TOP = Math.round(WINDOW_HEIGHT/5);

	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;
	curShowTimeSeconds = getcurShowTimeSeconds();
	setInterval(
		function(){
			render(context);
			update();
		},
		50
		);
} 

function update(){
	var nextShowTimeSeconds = getcurShowTimeSeconds();
	var nexthour = parseInt(nextShowTimeSeconds / 3600);
	var nextminutes = parseInt( (nextShowTimeSeconds - nexthour*3600) /60);
	var nextsecond = nextShowTimeSeconds % 60;

	var curhour = parseInt(curShowTimeSeconds / 3600);
	var curminutes = parseInt( (curShowTimeSeconds - curhour*3600) /60);
	var cursecond = curShowTimeSeconds % 60; 

	if (cursecond != nextsecond) {
		if (parseInt(curhour/10) != parseInt(nexthour/10)) {
			addballs(MARGIN_LEFT + 0,MARGIN_TOP,parseInt(curhour/10));
		}
		if (parseInt(curhour%10) != parseInt(nexthour%10)) {
			addballs(MARGIN_LEFT + 15*(RADIUS + 1),MARGIN_TOP,parseInt(curhour%10));
		}
		if (parseInt(curminutes/10) != parseInt(nextminutes/10)) {
			addballs(MARGIN_LEFT + 39*(RADIUS + 1),MARGIN_TOP,parseInt(curminutes%10));
		}
		if (parseInt(curminutes%10) != parseInt(nextminutes%10)) {
			addballs(MARGIN_LEFT + 54*(RADIUS + 1),MARGIN_TOP,parseInt(curminutes%10));
		}
		if (parseInt(cursecond/10) != parseInt(nextsecond/10)) {
			addballs(MARGIN_LEFT + 78*(RADIUS + 1),MARGIN_TOP,parseInt(cursecond%10));
		}
		if (parseInt(cursecond%10) != parseInt(nextsecond%10)) {
			addballs(MARGIN_LEFT + 93*(RADIUS + 1),MARGIN_TOP,parseInt(cursecond%10));
		}
		curShowTimeSeconds = nextShowTimeSeconds;
	}
	updateballs();
}

function addballs(x,y,num){
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if(digit[num][i][j] == 1){
				var aball = {
					x:x + j*2*(RADIUS+1) + (RADIUS+1),
					y:y + i*2*(RADIUS+1) + (RADIUS+1),
					g:1.5+Math.random(), 
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
					vy:-Math.random()*10,
					color:colors[Math.floor(Math.random()*colors.length)]				
				}
				balls.push(aball);
			}
		}			
	}
}


function updateballs(){
		for (var i = 0; i < balls.length; i++) {
			balls[i].x += balls[i].vx;
			balls[i].y += balls[i].vy;
			balls[i].vy += balls[i].g;
			if(balls[i].y >= WINDOW_HEIGHT - RADIUS){
				balls[i].y = WINDOW_HEIGHT - RADIUS;
				balls[i].vy = -balls[i].vy*0.75;
			}
		}
		var cnt = 0;
		for (var i = 0; i < balls.length; i++) {
			if(balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH)
				balls[cnt++] = balls[i];
		}	
		while(balls.length>cnt)
				balls.pop();
}

function getcurShowTimeSeconds(){
	var curTime = new Date();
	var ret = curTime.getHours()*3600 + curTime.getMinutes()*60 + curTime.getSeconds();
	return ret ;
}

function render(cxt){
	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT)
	var hour = parseInt(curShowTimeSeconds / 3600);
	var minutes = parseInt( (curShowTimeSeconds - hour*3600) /60);
	var second = curShowTimeSeconds % 60;
	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hour/10), cxt);
	renderDigit(MARGIN_LEFT + 15*(RADIUS + 1),MARGIN_TOP,parseInt(hour%10),cxt);
	renderDigit(MARGIN_LEFT + 30*(RADIUS + 1),MARGIN_TOP,10,cxt);
	renderDigit(MARGIN_LEFT + 39*(RADIUS + 1),MARGIN_TOP,parseInt(minutes/10), cxt);
	renderDigit(MARGIN_LEFT + 54*(RADIUS + 1),MARGIN_TOP,parseInt(minutes%10),cxt);
	renderDigit(MARGIN_LEFT + 69*(RADIUS + 1),MARGIN_TOP,10,cxt);
	renderDigit(MARGIN_LEFT + 78*(RADIUS + 1),MARGIN_TOP,parseInt(second/10), cxt);
	renderDigit(MARGIN_LEFT + 93*(RADIUS + 1),MARGIN_TOP,parseInt(second%10),cxt);
	for (var i = 0; i < balls.length; i++) {
		cxt.fillStyle = balls[i].color;
		cxt.beginPath();
		cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
		cxt.closePath();
		cxt.fill();
	}
}


function renderDigit(x,y,num,cxt){
	cxt.fillStyle = "rgb(130,140,50)";
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if(digit[num][i][j] == 1){
				cxt.beginPath();
				cxt.arc(x + j*2*(RADIUS+1) + (RADIUS+1),y + i*2*(RADIUS+1) + (RADIUS+1),RADIUS,0,2*Math.PI);
				cxt.closePath();
				cxt.strokeStyle = "pink";
				cxt.stroke();
				cxt.fill();
			}
		}			
	}
}