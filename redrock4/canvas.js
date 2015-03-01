window.onload = function(){
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var control = document.getElementsByTagName("a");
	var painting = false;
	var cleaning = false;
	var font = document.getElementById("font");
	var fontext = font.getContext("2d");
	var style = fontext.createLinearGradient(100,0,250,0);
	style.addColorStop(0.0,"red");
	style.addColorStop(0.25,"orange");
	style.addColorStop(0.5,"yellow");
	style.addColorStop(0.75,"green");
	style.addColorStop(1.0,"purple");
	fontext.font ="bold 50px Arial";
	fontext.fillStyle = style;
	fontext.fillText("canvas",100,60);
	context.strokeStyle = "black";
	context.lineWidth = 2;
	context.lineCap = "round";
	for (var i = 0; i < control.length - 1; i++) {
		control[i].onclick = function(){
			cleaning = false;
			control[5].style.backgroundColor = "#2f4f4f";
			var color = this.getAttribute("id");
			changeColor(context,color);
		}
	}
	control[5].onclick = function(e){
		if (cleaning == false) {
			cleaning = true;
			control[5].style.backgroundColor = "#aa0f0f";
		} else if(cleaning == true){
			cleaning = false;
			control[5].style.backgroundColor = "#2f4f4f";
		}	
	}
	canvas.addEventListener("mousedown",function(e){
		cleaning = false;
		if (painting == false && cleaning == false) {
			painting = true;
			var bounding = canvas.getBoundingClientRect();
			var beginX = (e.clientX - bounding.left);
			var beginY = (e.clientY - bounding.top); 
			context.beginPath();
			context.moveTo(beginX,beginY);
		}
	},false);
	canvas.addEventListener("mousemove",function(e){
		if (painting == true && cleaning == false) {
			var bounding = canvas.getBoundingClientRect();
			var moveX = (e.clientX - bounding.left);
			var moveY = (e.clientY - bounding.top);
			context.lineTo(moveX,moveY);
			context.stroke();
			beginX = moveX;
			beginY = moveY;
		} else if(cleaning == true){
			var bounding = canvas.getBoundingClientRect();
			var eraserX = (e.clientX - bounding.left - 10);
			var eraserY = (e.clientY - bounding.top - 10);
			context.clearRect(eraserX -10,eraserY -10,20,20);
			var bounding = canvas.getBoundingClientRect();
			var moveEX = (e.clientX - bounding.left);
			var moveEY = (e.clientY - bounding.top);
			eraserX = moveEX;
			eraserY = moveEY;
		}
	}
	,false);
	canvas.addEventListener("mouseup",function(){
		if (painting == true) {
			painting = false;
		}
	},false);
}
function changeColor(cxt,color){
	cxt.strokeStyle = color;
	}
function drawEraser(cxt,x,y){
	cxt.fillRect(x,y,20,20);
}