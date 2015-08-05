
	function bind(fn,context,ag){
		return function(){
			fn.call(context,ag)
		}
	}
	function Carousel(width,speed){
		if(! this instanceof Carousel){
			return new Carousel(width,speed);
		}
		this.elementArray = [];
		this.callbackElementArray = [];
		this.count = 0;
		this.width = width;
		this.speed = speed || 5000;
		this.timer = null;
		this.callbackAction = null;//哪个小点处于激活状态
		
	}
	Carousel.prototype = {
			constructor:Carousel,
			start:function(){
				this.timer = setTimeout(bind(this.left,this),this.speed);
			},
			pushElement:function(fatherNode){
				var childNode = fatherNode.children;
				for(var i = 0;i < childNode.length;i++){
					this.elementArray.push(childNode[i]);
				}
			},
			pushcallbackElement:function(fatherNode){
				var childNode = fatherNode.children;
				for(var i = 0;i < childNode.length;i++){
					this.callbackElementArray.push(childNode[i]);
					childNode[i].children[0].number = i;
				}
				this.callbackAction = this.callbackElementArray[0];
			},
			left:function(){
				var arr = this.elementArray;
					width = this.width;
				if(this.count == arr.length - 1){
					forEach(arr,function(item,index,array){
						constant(item,{"left":index*width + ""},200);
					})
					this.count = 0;
				}else{

					forEach(arr,function(item,index,array){
						constant(item,{"left":parseInt(item.style.left) - width},200);
					});
					this.count++;
				}
				!!this.callbackElementArray[0]&&this.callBack();
				this.timer = setTimeout(bind(this.left,this),this.speed);
			},
			stop:function(){
				if(this.timer) clearTimeout(this.timer);
			},
			callBack:function(){
				this.callbackAction.className = "";
				this.callbackAction = this.callbackElementArray[this.count];
				this.callbackAction.className = "action";
			},
			click:function(num){
				this.stop();
				var count = num,
					width = this.width,
					arr = this.elementArray;
				forEach(arr,function(item,index,array){
					constant(item,{"left":(index - count) * width + ""},200);
				})
				this.count = num;
				if(this.callbackElementArray.length > 1){
					this.callBack();
				}
				this.start();
			}
		}	
	


	function constant(target,json,speed,callback){
        var timeScale = 1000 / 60,
            count = speed / timeScale,
            begin;

        if(target.timer){
            // console.log(1);
            clearTimeout(target.timer);
        }

        //设初值
        for(var key in json){
        	if(window.getComputedStyle){
           		begin = parseFloat(window.getComputedStyle(target,null)[key]);
        	}else{
        		begin = parseFloat(target.currentStyle[key]);
        	}
            target[key] = (json[key] - begin) / count;
        }

        target.timer = setInterval(function(){
            var oldValue,newValue;

            var stop = true;

            for(var key in json){
                //运动算法
               if(window.getComputedStyle){
           			oldValue = parseFloat(window.getComputedStyle(target,null)[key]);
	        	}else{
	        		oldValue = parseFloat(target.currentStyle[key]);
	        	}

                if(oldValue != json[key]){
                    stop = false;
                }

                if(target.addEventListener && Math.abs(oldValue - json[key]) < 1){
                    target.style[key] = json[key] + "px";
                }else if(!target.addEventListener &&  Math.abs(oldValue - json[key]) < 25){
                    target.style[key] = json[key] + "px";
                }else{
                    newValue = oldValue + target[key];
                    target.style[key] = newValue + "px";
                }
            }

            if(stop){
                clearInterval(target.timer);
                typeof callback == "function" && callback();
            }

        },timeScale);
    }
    (function(){//轮播
    	var b = document.getElementsByTagName("ul")[2],
			a = new Carousel(740,5000),
			prv = document.getElementById("prv"),
			nex = document.getElementById("nex");
		a.pushElement(b);
		a.start();
		eventHandler.addEvent(prv,"click",function(){
			if(a.count - 1 < 0){
				a.click(a.elementArray.length - 1);
			}else{
				a.click(a.count - 1);
			}
			return false;
		});
		eventHandler.addEvent(nex,"click",function(){
			if(a.count + 1 > a.elementArray.length - 1){
				a.click(0);
			}else{
				a.click(a.count + 1);
			}
			return false;
		});
    })();
    (function(){//开学倒计时

    	var dayH = document.getElementById("days"),
    	houtH = document.getElementById("hour"),
    	branchH = document.getElementById("branch"),
    	secondsH = document.getElementById("seconds");
    	function timer(){
    		var now = new Date().getTime(),
	    		start = new Date("2015/09/10").getTime(),
	    		cha = start - now,
	    		day = Math.floor(cha/86400000),
	    		hour = Math.floor(cha % 86400000 / 3600000),
	    		branch = Math.floor(cha % 86400000 % 3600000 / 60000),
	    		seconds = Math.floor(cha % 86400000 % 3600000 % 60000 / 1000);
	    		if(day < 10){
	    			day = "0" + day;
	    		}
	    		if(hour < 10){
	    			hour = "0" + hour;
	    		}
	    		if(branch < 10){
	    			branch = "0" + branch;
	    		}
	    		if(seconds < 10){
	    			seconds = "0" + seconds;
	    		}
    			dayH.children[0].src = 'image/num'+(day + "").slice(0,1)+".png";
    			dayH.children[1].src = 'image/num'+(day + "").slice(1,2)+".png";
    			houtH.children[0].src = 'image/num'+(hour + "").slice(0,1)+".png";
    			houtH.children[1].src = 'image/num'+(hour + "").slice(1,2)+".png";
    			branchH.children[0].src = 'image/num'+(branch + "").slice(0,1)+".png";
    			branchH.children[1].src = 'image/num'+(branch + "").slice(1,2)+".png";
    			secondsH.children[0].src = 'image/num'+(seconds + "").slice(0,1)+".png";
    			secondsH.children[1].src = 'image/num'+(seconds+ "").slice(1,2)+".png";        
    	}
    	timer();
    	setInterval(timer,1000);
    })();
    (function(){//回到顶部
    	var go_top = document.getElementById("go_top");
    	function top(speed){
    		var timeScale = 1000/60,
    			timer,
    			speed = speed / timeScale;
    			y = window.scrollY || document.documentElement.scrollTop,
    			xy = y / speed;
    		if(!timer){

    			timer = setInterval(function(){
    				if(window.scrollY < 100 || !window.scrollY && document.documentElement.scrollTop < 100){
    				window.scrollTo(0,0);
    				clearInterval(timer);
    				timer = null;
    			}
    				window.scrollTo(0,y = y - xy);
    			},timeScale)
    		}
    	}
    	eventHandler.addEvent(go_top,"click",function(e){
    		top(200);
    		return false;
    	})
    })();
    (function(speed,num){//顶部渐隐
    	var oheader = document.getElementById("header"),
    		go_top = document.getElementById("go_top"),
    		timer,
    		timeScale = 1000/60,
    		count = speed / timeScale,
    		x = num / count,
    		bCount = true,
            exp = /[0-9]+/,
            IeFileter,
            number;
    	eventHandler.addEvent(window,"scroll",function(e){
    		if(window.scrollY > 800 ||!window.scrollY && document.documentElement.scrollTop > 800){
    			if(!bCount) return false;
    			bCount = false;
    			clearInterval(timer);
    			oheader.className = "header fixed";
                if(oheader.addEventListener){
                    oheader.style.opacity = 0;
                    go_top.style.opacity = 0;
                }else{
                    oheader.style.filter = "alpha(opacity=0)";
                    go_top.style.filter = "alpha(opacity=0)";
                    //filter:alpha(opacity=50);
                }
    			
    			oheader.style.top = "0px";
    			timer = setInterval(function(){
                    if(oheader.addEventListener){
                        oheader.style.opacity = parseFloat(oheader.style.opacity) + x + "";
                        go_top.style.opacity = parseFloat(go_top.style.opacity) + x + "";
                    }else{
                        IeFileter = oheader.style.filter;
                        number = IeFileter.match(exp)[0];
                        oheader.style.filter = "alpha(opacity=" +  (parseFloat(number) + x*100) + ")";
                        number = oheader.style.filter.match(exp)[0];
                        IeFileter = go_top.style.filter;
                        number = IeFileter.match(exp)[0];
                        go_top.style.filter = "alpha(opacity=" +  (parseFloat(number) + x*100) + ")";
                    }
    				if(oheader.addEventListener && oheader.style.opacity >= "1"){
    					clearInterval(timer);
    				}else if(number >= 100){
                        clearInterval(timer);
                    }
    			},timeScale);
    		}else{
    			if(bCount) return false;
    			bCount = true;
    			clearInterval(timer);
    			timer = setInterval(function(){
    			    if(oheader.addEventListener){
                        go_top.style.opacity = parseFloat(go_top.style.opacity) +
                    - x + "";
                        oheader.style.opacity = parseFloat(oheader.style.opacity) - x + "";
                    }else{
                        IeFileter = oheader.style.filter;
                        number = IeFileter.match(exp)[0];
                        oheader.style.filter = "alpha(opacity=" +  (parseFloat(number) - x*100) + ")";
                        number = oheader.style.filter.match(exp)[0];
                        IeFileter = go_top.style.filter;
                        number = IeFileter.match(exp)[0];
                        go_top.style.filter = "alpha(opacity=" +  (parseFloat(number) - x*200) + ")";
                    }
    				if(oheader.addEventListener&& oheader.style.opacity <= "0"){
    					clearInterval(timer);
    					oheader.className = "header";
    					oheader.style.opacity = 1;
                        oheader.style.filter = "alpha(opacity=100)";
    				}else if(number <= 10){
                        clearInterval(timer);
                        oheader.className = "header";
                        oheader.style.opacity = 1;
                        oheader.style.filter = "alpha(opacity=100)";
                    }
    			},timeScale);
    		}
    	})
    })(500,1);
    (function(){//云动画
        var c1 = document.getElementById("cloud01"),
            c5 = document.getElementById("cloud05");
        if(!c1.addEventListener) return "IE8.........";
        function c1R(){
            constant(c1,{"left":100},5000,c1L);
        }
        function c1L(){
            constant(c1,{"left":-70},5000,c1R);
        }
        function c5R(){
            constant(c5,{"right":50},5000,c5L);
        }
        function c5L(){
            constant(c5,{"right":20},2000,c5R);
        }
        c1R();
        c5R();

            
    })();


