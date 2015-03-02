window.onload = function(){
	//获得整个画布的ID
	var canvas = document.getElementById("canvas");
	//建立整个画布的绘图上下文
	var context = canvas.getContext("2d");
	//获得HTML文件中所有的a元素
	var control = document.getElementsByTagName("a");
	var painting = false; // 用于判断画笔状态
	var cleaning = false; // 用于判断橡皮状态
	//获得标题画布ID
	var font = document.getElementById("font");
	//获得标题画布绘图上下文
	var fontext = font.getContext("2d");
	//绘制标题渐变样式
	var style = fontext.createLinearGradient(100,0,250,0);
	style.addColorStop(0.0,"red");
	style.addColorStop(0.25,"orange");
	style.addColorStop(0.5,"yellow");
	style.addColorStop(0.75,"green");
	style.addColorStop(1.0,"purple");
	fontext.font ="bold 50px Arial";
	fontext.fillStyle = style;
	//初始化画笔样式
	fontext.fillText("canvas",100,60);
	context.strokeStyle = "black";
	context.lineWidth = 2;
	context.lineCap = "round";
	//遍历控制颜色的a元素添加onclick事件监听
	for (var i = 0; i < control.length - 1; i++) {
		control[i].onclick = function(){
			cleaning = false;
			control[5].style.backgroundColor = "#2f4f4f";
			var color = this.getAttribute("id");
			changeColor(context,color);
		}
	}
	//对橡皮添加事件监听
	control[5].onclick = function(e){
		if (cleaning == false) {
			cleaning = true;
			control[5].style.backgroundColor = "#aa0f0f";
		} else if(cleaning == true){
			cleaning = false;
			control[5].style.backgroundColor = "#2f4f4f";
		}	
	}
	//当鼠标按下时执行函数
	canvas.addEventListener("mousedown",function(e){
		cleaning = false;
		control[5].style.backgroundColor = "#2f4f4f";
		if (painting == false && cleaning == false) {
			painting = true;
			var bounding = canvas.getBoundingClientRect();
			var beginX = (e.clientX - bounding.left);
			var beginY = (e.clientY - bounding.top); 
			context.beginPath();
			context.moveTo(beginX,beginY);
		}
	},false);
	//当鼠标移动时执行函数
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
	//当鼠标弹起时执行函数
	canvas.addEventListener("mouseup",function(){
		if (painting == true) {
			painting = false;
		}
	},false);
}
//改变颜色函数
function changeColor(cxt,color){
	cxt.strokeStyle = color;
	}