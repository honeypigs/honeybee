var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

function GIF(speed,imgName,imgNumber,imgFormat){
	var IMG = new Array();
	for (var i = 0; i < imgNumber; i++) {
		var img = new Image();
		img.src = "img/" + imgName + i + "." +imgFormat;
		IMG.push(img);
	}
	console.log(IMG);
	var Obj = {
		Stop : document.getElementById("stop"),
		Start : document.getElementById("start"),
		flag : 0
	}

	window.onload = function(){
		stop();
		start();
		loop();
	}

	function loop(){
		clearInterval(Obj.flag);
		Obj.flag = setInterval(function(){
			update();
			drawPic();
		},1000/speed);
	}

	function drawPic(){
		context.clearRect(0,0,400,600);
		context.drawImage(IMG[i],50,50);
	}

	function update(){
		i += 1;
		if (i >= imgNumber) {
			i = 0;
		}
	}

	function stop(){
		Obj.Stop.onclick=function(){
			clearInterval(Obj.flag);
		}
	}
	function start(){
		Obj.Start.onclick=function(){
			loop();
		}
	}
}

GIF(6,"",13,"png"); 