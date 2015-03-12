window.onload = function(){
	//获得整个画布的ID
	var canvas = document.getElementById("canvas");
	//建立整个画布的绘图上下文
	var context = canvas.getContext("2d");
	//获得HTML文件中所有的a元素
	var control = document.getElementsByTagName("a");
	var painting = false; // 用于判断画笔状态
	var cleaning = false; // 用于判断橡皮状态
	var beginCleaning = false;//用于判断是否开始擦除
	var rect = false;//用于判断矩形框工具状态
	var fillrect = false;//用于判断矩形工具状态
	var cir = false;//用于判断圆形框工具状态
	var fillcir = false;//用于判断圆形工具状态
	var ways = 0;//用于判断各工具状态
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
	context.globalCompositeOperation = "lighter";
	context.lineCap = "round";
	//遍历控制颜色的a元素添加onclick事件监听
	for (var i = 0; i < 6; i++) {
		control[i].onclick = function(){
			var color = this.getAttribute("id");
			changeColor(context,color);
		}
	}
	//对橡皮添加事件监听
	control[6].onclick = function(e){
		if (cleaning == false) {
			cleaning = true;
			ways = null;
			control[6].style.backgroundColor = "#aa0f0f";
			createEraser();
		} else if(cleaning == true){
			cleaning = false;
			clearEraser();
			control[6].style.backgroundColor = "#2f4f4f";
		}	
	}
	//对矩形框添加事件监听
	control[7].onclick = function(e){
		if (ways != 1) {
			ways = 1;
			cleaning = false;
			for (var i = 7; i < 11; i++) {
				control[i].style.boxShadow = " 0 0 0 pink"
			}
			control[7].style.boxShadow =  " 0 0 10px pink";
			control[6].style.backgroundColor = "#2f4f4f";
			clearEraser();
		} else if(ways == 1){
			control[7].style.boxShadow =  " 0 0 0 pink";
			ways = 0;
			rect = false;
		}	
	}
	//对矩形添加事件监听
	control[8].onclick = function(e){
		if (ways != 2) {
			ways = 2;
			cleaning = false;
			for (var i = 7; i < 11; i++) {
				control[i].style.boxShadow = " 0 0 0 pink"
			}
			control[8].style.boxShadow =  " 0 0 10px pink";
			control[6].style.backgroundColor = "#2f4f4f";
			clearEraser();
		} else if(ways == 2){
			control[8].style.boxShadow =  " 0 0 0 pink";
			ways = 0;
			fillrect = false;
		}	
	}
	//对圆形框添加事件监听
	control[9].onclick = function(e){
		if (ways != 3) {
			ways = 3;
			cleaning = false;
			for (var i = 7; i < 11; i++) {
				control[i].style.boxShadow = " 0 0 0 pink"
			}
			control[9].style.boxShadow =  " 0 0 10px pink";
			control[6].style.backgroundColor = "#2f4f4f";
			clearEraser();
		} else if(ways == 3){
			control[9].style.boxShadow =  " 0 0 0 pink";
			ways = 0;
			cir = false;
		}	
	}
	//对圆形添加事件监听
	control[10].onclick = function(e){
		if (ways != 4) {
			ways = 4;
			cleaning = false;
			for (var i = 7; i < 11; i++) {
				control[i].style.boxShadow = " 0 0 0 pink"
			}
			control[10].style.boxShadow =  " 0 0 10px pink";
			control[6].style.backgroundColor = "#2f4f4f";
			clearEraser();
		} else if(ways == 4){
			control[10].style.boxShadow =  " 0 0 0 pink";
			ways = 0;
			fillcir = false;
		}	
	}
	//改变背景颜色
	var button = document.getElementById("button");
	var bg = 0;
	button.onclick= function(e){
		var button = document.getElementById("button");
		if (bg == 0 ) {
			bg = 1;
			button.style.backgroundColor = "white";
			button.style.color = "black";
			canvas.style.backgroundColor = "black";
		} else if (bg == 1){
			bg = 0;
			button.style.backgroundColor = "black";
			button.style.color = "white";
			canvas.style.backgroundColor ="white";
		}
	}
	//改变画笔宽度
	for (var i = 11; i < control.length; i++) {
		control[i].onclick = function(){
			var WIDTH = this.getAttribute("id");
			if (WIDTH == "width0") {
				WIDTH = 10;
			}
			if (WIDTH == "width1") {
				WIDTH = 5;
			}
			if (WIDTH == "width2") {
				WIDTH = 2;
			}
			changeWidth(context,WIDTH);
		}
	}
	//当鼠标按下时执行函数
	canvas.addEventListener("mousedown",function(e){
		//判断是否开始擦除
		if (cleaning == true){
			beginCleaning = true;
		}
		//确定画笔初始
		if (ways == 0 && cleaning == false) {
			painting = true;
			var bounding = canvas.getBoundingClientRect();
			var beginX = (e.clientX - bounding.left);
			var beginY = (e.clientY - bounding.top); 
			context.beginPath();
			context.moveTo(beginX,beginY);
		}
		//确定矩形左上角
		if (ways == 1 && cleaning ==false) { 
			rect = true;
			var bounding = canvas.getBoundingClientRect();
			begintoolX = (e.clientX - bounding.left);
			begintoolY = (e.clientY - bounding.top);
			context.beginPath();
			context.moveTo(begintoolX,begintoolY);
		}
		//确定矩形左上角
		if(ways == 2 && cleaning == false){
			fillrect = true;
			var bounding = canvas.getBoundingClientRect();
			begintoolX = (e.clientX - bounding.left);
			begintoolY = (e.clientY - bounding.top);
			context.beginPath();
			context.moveTo(begintoolX,begintoolY);
		}
		//确定圆心的位置
		if(ways == 3 && cleaning == false){
			cir = true;
			var bounding = canvas.getBoundingClientRect();
			begintoolX = (e.clientX - bounding.left);
			begintoolY = (e.clientY - bounding.top);
			context.beginPath();
		}
		//确定圆心的位置
		if(ways == 4  && cleaning == false){
			fillcir = true;
			var bounding = canvas.getBoundingClientRect();
			begintoolX = (e.clientX - bounding.left);
			begintoolY = (e.clientY - bounding.top);
			context.beginPath();
		}
	},false);
	//当鼠标移动时执行函数
	canvas.addEventListener("mousemove",function(e){
		//避免画笔超出画布
		var bounding = canvas.getBoundingClientRect();
		var mouseX = e.clientX;
		var mouseY = e.clientY;
		if (mouseX < bounding.left+10 || mouseX > bounding.left + 790||mouseY < bounding.top + 10||mouseY > bounding.top + 480) {
			painting = false;
		}
		//开始普通画笔
		if (painting == true && cleaning == false) {
			var moveX = (e.clientX - bounding.left);
			var moveY = (e.clientY - bounding.top);
			context.lineTo(moveX,moveY);
			context.stroke();
		}
		//开始获得鼠标位置 
		else if (rect == true && cleaning == false) {	
			rectmoveX = (e.clientX - bounding.left);
			rectmoveY = (e.clientY - bounding.top);
		}
		//开始获得鼠标位置
		else if (fillrect == true && cleaning == false){
			fillrectmoveX = (e.clientX - bounding.left);
			fillrectmoveY = (e.clientY - bounding.top);
		}
		//开始获得鼠标位置 
		else if (cir == true && cleaning == false) {
			cirmoveX = (e.clientX - bounding.left);
			cirmoveY = (e.clientY - bounding.top);
		}
		//开始获得鼠标位置 
		else if (fillcir == true && cleaning == false) {
			fillcirmoveX = (e.clientX - bounding.left);
			fillcirmoveY = (e.clientY - bounding.top);
		}
		//获取鼠标位置并擦除周围10*10内容 
		else if(beginCleaning == true){
			var eraserX = (e.clientX - bounding.left - 10);
			var eraserY = (e.clientY - bounding.top - 10);
			context.clearRect(eraserX -10,eraserY -10,10,10);
			var bounding = canvas.getBoundingClientRect();
			var moveEX = (e.clientX - bounding.left);
			var moveEY = (e.clientY - bounding.top);
			createEraser(e.clientX - bounding .left - 20,e.clientY - 30);
			clearEraser();
		}
		//橡皮擦的动画效果 
		else if ( cleaning == true){
			createEraser(e.clientX - bounding .left - 20,e.clientY - 30);
			clearEraser();
		} 
	}
	,false);
	//当鼠标弹起时执行函数
	canvas.addEventListener("mouseup",function(){
		//结束画笔
		if (ways == 0) {
			painting = false;
		}
		//根据鼠标终止位置绘制矩形 
		else if (ways == 1) {
			context.lineTo(rectmoveX,begintoolY);
			context.lineTo(rectmoveX,rectmoveY);
			context.lineTo(begintoolX,rectmoveY);
			context.lineTo(begintoolX,begintoolY);
			context.stroke();
			rect = false;
		}
		//根据鼠标终止位置绘制矩形
		else if (ways == 2){
			context.lineTo(fillrectmoveX,begintoolY);
			context.lineTo(fillrectmoveX,fillrectmoveY);
			context.lineTo(begintoolX,fillrectmoveY);
			context.lineTo(begintoolX,begintoolY);
			context.fill();
			fillrect = false;
		}
		//将终止位置与圆心距离做半径画圆
		else if (ways == 3) {
			var R = Math.sqrt((cirmoveX - begintoolX) * (cirmoveX - begintoolX) + (cirmoveY - begintoolY) * (cirmoveY - begintoolY));
			context.arc(begintoolX,begintoolY,R,2*Math.PI,false);
			context.stroke();
			cir = false;
		}
		//将终止位置与圆心距离做半径画圆
		else if (ways == 4) {
			var r = Math.sqrt((fillcirmoveX - begintoolX) * (fillcirmoveX - begintoolX) + (fillcirmoveY - begintoolY) * (fillcirmoveY - begintoolY));
			context.arc(begintoolX,begintoolY,r,2*Math.PI,false);
			context.fill();
			fillcir = false;
		}
		beginCleaning = false;
	},false);
}
//改变颜色函数
function changeColor(cxt,color){
	cxt.strokeStyle = color;
	cxt.fillStyle = color;
	var toolsColor = document.getElementById("tools").getElementsByTagName("a");
	for (var i = 0; i < toolsColor.length; i++) {
		toolsColor[i].style.borderColor = color;
	}
	toolsColor[1].style.backgroundColor = color;
	toolsColor[3].style.backgroundColor = color;
	var widths = document.getElementById("widths").getElementsByTagName("a");
	for (var j = 0; j < widths.length; j++) {
		widths[j].style.backgroundColor =color;
	}
	}
//改变画笔宽度
function changeWidth(cxt,WIDTH){
	cxt.lineWidth = WIDTH;
}
//在画板中生成一个DIV作为橡皮擦
function createEraser(Left,Top) {
	var body = document.getElementById("border");
	var eraser = document.createElement("div");
	body.appendChild(eraser);
	eraser.style.position = "absolute";
	eraser.style.zIndex = 20;
	eraser.style.left = Left + "px";
	eraser.style.top = Top + "px";
	eraser.style.backgroundColor = "brown";
	eraser.style.width = "10px";
	eraser.style.height = "10px";
	eraser.setAttribute("id","eraser");
}
//清除生成的DIV
function clearEraser(){
	var body = document.getElementById("border");
	var earser = document.getElementById("eraser");
	body.removeChild(earser);
}
