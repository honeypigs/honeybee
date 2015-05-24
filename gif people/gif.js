var canvas = document.getElementById("canvas") ;
var context = canvas.getContext("2d");
var section = $(".canvas");

function GIF(location,speed){
	var IMG = new Array();
	var WIDTH = section.width();
	var HEIGHT = section.height();

	var step = parseInt(location * WIDTH / (15 * speed) );
	var j = 0;

	for (var i = 0; i < 18; i++) {
		var img = new Image();
		img.src = "img/people" + i + ".png";
		IMG.push(img);
	}

	var Obj = {
		Stop : document.getElementById("stop"),
		Start : document.getElementById("start"),
		flag : 0
	}

	function loop(){
		clearInterval(Obj.flag);
		Obj.flag = setInterval(function(){
			update();
			drawPic();
		},1000/15);
	}

	loop();

	function drawPic(){
		if (j * step < location * WIDTH) {
			context.clearRect(0,0,400,600);
			context.drawImage(IMG[i],j * step ,0,HEIGHT / 1.5,HEIGHT);
		}else{
			clearInterval(Obj.flag);
			context.drawImage(IMG[17],j * step ,0,HEIGHT / 1.5, HEIGHT);
		}
		
	}

	function update(){
		WIDTH = section.width();
		HEIGHT = section.height();
		canvas.width = WIDTH;
		canvas.height = HEIGHT;
		i += 1;
		j += 1;
		if (i >= 18 - 1) {
			i = 0;
		}
	}

}
GIF(0.3,5);