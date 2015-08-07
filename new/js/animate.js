var animation = {
	move:function(target,json,speed,callback){//1.target目标2.json需求变化3.变化的速度4.动画完成后回调
		var timeScal = 1000/60,
			count = speed/timeScal,
			floorCount = Math.floor(count),
			counting = 0,
			timer,
			oldValue,
			distance,
			finalValue;
		if(!target.animation_final || !target.animation_old || !target.animation_distance){
			target.animation_final = {};
			target.animation_old = {};
			target.animation_distance = {};
		}
		for(var key in json){
			target.animation_final[key] = parseFloat(json[key]);
			if(key == "opacity"&&!target.addEventListener){
				target.animation_old[key] = parseFloat(target.filters.alpha.opacity);
				target.animation_distance[key] = (parseFloat(json[key])*100 - parseFloat(target.animation_old[key]))/count;
			}else{
				target.animation_old[key] = parseFloat(getStyle(target,key));
				target.animation_distance[key] = (parseFloat(json[key]) - parseFloat(target.animation_old[key]))/count;
			}		
		}
		if(!timer){
			timer = setInterval(function(){
				for(key in json){
					if(key == "opacity"){
						if(!target.addEventListener){
							oldValue = target.animation_old[key];
							distance = target.animation_distance[key];
							target.filters.alpha.opacity = (oldValue + distance);
							target.animation_old[key] = oldValue + distance;
						}else{
							oldValue = target.animation_old[key];
							distance = target.animation_distance[key];
							target.style[key] = oldValue + distance;
							target.animation_old[key] = oldValue + distance;
						}
					}else{
						oldValue = target.animation_old[key];
						distance = target.animation_distance[key];
						target.style[key] = oldValue + distance + "px";
						target.animation_old[key] = oldValue + distance;
					}
				}
				counting++;
				if(counting == floorCount){
					for(key in json){
						target.style[key] = json[key];
					}
					clearInterval(timer);
					callback&&callback();
				}
			},timeScal)
		}
	}
	
}
function getStyle(target,style){
	if(window.getComputedStyle){
		return window.getComputedStyle(target,null)[style];
	}else{
		return target.currentStyle[style];
	}
}