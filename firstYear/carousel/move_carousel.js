KISSY.use('node', function (S, Node) {
	var opts = {
		"container" : Node.one("#container"),//容器
		"sections" : Node.all(".section"),//子容器
		"easing" : "ease",//滑动方式ease-out,ease-in,liner
		"duration" : 1000,//运动时间
		"pagination" : true,//分页显示
		"loop" : true //是否循环
	}

	var canScoll = true;
	var index = 0;
	var SP = switchPage = function(options){
		if(opts.pagination){
			initPagination();
		}
	}

	SP.moveRight = function(){
		if (index) {
			index--;
		}else if(opts.loop){
			index = opts.sections.length - 1;
		}
		scrollPage(opts.sections[index]);
	}

	
	SP.moveLeft = function(){
		if (index < (opts.sections.length - 1)) {
			index++;
		}else if(opts.loop){
			index = 0;
		}
		scrollPage(opts.sections[index]);
	}

	function scrollPage(element){
		var dest = element.offsetLeft;
		if(typeof dest === 'undefined'){ 
			return; 
		}
		initEffects(dest,element);
	}

	opts.container.on("swipe",SwipeHandler);
	function SwipeHandler(e){
		if (canScoll) {
			if(e.direction == 'right'){
				SP.moveRight();
			} else if(e.direction == 'left'){
				SP.moveLeft();
			}
		}
	}

	function initPagination(){
		var length = opts.sections.length;
		var pageHtml = '<ul id="pages"><li class="active"></li>';
		for(var i=1;i<length;i++){
			pageHtml += '<li></li>';
		}
		pageHtml += '</ul>';
		Node.one("body").append(pageHtml);
	}

	function paginationHandler(){
			var pages = Node.all("li");
			
			
		}


	function initEffects(dest,element){
		var transform = ["-webkit-transform","-ms-transform","-moz-transform","transform"],
		transition = ["-webkit-transition","-ms-transition","-moz-transition","transition"];

		canScroll = false;
		var traslate = "";
		traslate = "-"+dest+"px, 0px, 0px";
		opts.container.css({
			"transition":"all "+opts.duration+"ms "+opts.easing,
			"transform":"translate3d("+traslate+")"
		});
		opts.container.on("webkitTransitionEnd msTransitionend mozTransitionend transitionend",function(){
			canScroll = true;
		});
		if(opts.pagination){
			paginationHandler();
		}
	}

	switchPage();

	setInterval(function(){
		SP.moveLeft();
	},2000);
});

