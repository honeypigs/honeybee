
  //   function bind(fn,context,ag){
  //       return function(){
  //           fn.call(context,ag)
  //       }
  //   }


  //   function constant(target,json,speed,callback){
  //       var timeScale = 1000 / 60,
  //           count = speed / timeScale,
  //           begin;

  //       if(target.timer){
  //           // console.log(1);
  //           clearTimeout(target.timer);
  //       }

  //       //设初值
  //       for(var key in json){
  //           if(window.getComputedStyle){
  //               begin = parseFloat(window.getComputedStyle(target,null)[key]);
  //           }else{
  //               begin = parseFloat(target.currentStyle[key]);
  //           }
  //           target[key] = (json[key] - begin) / count;
  //       }

  //       target.timer = setInterval(function(){
  //           var oldValue,newValue;

  //           var stop = true;

  //           for(var key in json){
  //               //运动算法
  //              if(window.getComputedStyle){
  //                   oldValue = parseFloat(window.getComputedStyle(target,null)[key]);
  //               }else{
  //                   oldValue = parseFloat(target.currentStyle[key]);
  //               }

  //               if(oldValue != json[key]){
  //                   stop = false;
  //               }

  //               if(target.addEventListener && Math.abs(oldValue - json[key]) < 1){
  //                   target.style[key] = json[key] + "px";
  //               }else if(!target.addEventListener &&  Math.abs(oldValue - json[key]) < 25){
  //                   target.style[key] = json[key] + "px";
  //               }else{
  //                   newValue = oldValue + target[key];
  //                   target.style[key] = newValue + "px";
  //               }
  //           }

  //           if(stop){
  //               clearInterval(target.timer);
  //               typeof callback == "function" && callback();
  //           }

  //       },timeScale);
  //   }
    
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
    
    (function(){//Top渐隐
        var go_top = document.getElementById("go_top"),
            b = true;
        eventHandler.addEvent(window,"scroll",function(e){
            if(window.scrollY > 100 ||!window.scrollY && document.documentElement.scrollTop > 100){
                if(b){
                    b = false;
                    animation.move(go_top,{"bottom":"200","opacity":"1.0"},300);
                }
            }else{
                if(!b){
                    b = true;
                    animation.move(go_top,{"bottom":"100","opacity":"0"},300);
                }
            }
        })
    })();


    (function(speed,num){//顶部渐隐
        var oheader = document.getElementById("header"),
            timer,
            timeScale = 1000/60,
            count = speed / timeScale,
            x = num / count,
            bCount = true,
            exp = /[0-9]+/,
            IeFileter,
            number;
        eventHandler.addEvent(window,"scroll",function(e){
            if(window.scrollY > 300 ||!window.scrollY && document.documentElement.scrollTop > 300){
                if(!bCount) return false;
                bCount = false;
                clearInterval(timer);
                oheader.className = "header fixed";
                if(oheader.addEventListener){
                    oheader.style.opacity = 0;
                }else{
                    oheader.style.filter = "alpha(opacity=0)";
                    //filter:alpha(opacity=50);
                }
                
                oheader.style.top = "0px";
                timer = setInterval(function(){
                    if(oheader.addEventListener){
                        oheader.style.opacity = parseFloat(oheader.style.opacity) + x + "";
                    }else{
                        IeFileter = oheader.style.filter;
                        number = IeFileter.match(exp)[0];
                        oheader.style.filter = "alpha(opacity=" +  (parseFloat(number) + x*100) + ")";
                        number = oheader.style.filter.match(exp)[0];
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
                        oheader.style.opacity = parseFloat(oheader.style.opacity) - x + "";
                    }else{
                        IeFileter = oheader.style.filter;
                        number = IeFileter.match(exp)[0];
                        oheader.style.filter = "alpha(opacity=" +  (parseFloat(number) - x*100) + ")";
                        number = oheader.style.filter.match(exp)[0];
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
            c5 = document.getElementById("cloud04");
        if(!c1.addEventListener) return "IE8.........";
        function c1R(){
            animation.move(c1,{"left":100},5000,c1L);
        }
        function c1L(){
            animation.move(c1,{"left":-70},5000,c1R);
        }
        function c5R(){
            animation.move(c5,{"right":50},5000,c5L);
        }
        function c5L(){
            animation.move(c5,{"right":20},5000,c5R);
        }
        c1R();
        c5R();
            
    })();
    
    (function (){
        var page = document.getElementById("color_choose"),
            opage_ul = document.getElementById("color_ul"),
            opage = page.getElementsByTagName("div"),
            obtn = opage_ul.getElementsByTagName("a");
            for(var i = 0; i<opage.length;i++){
                var index = 1;
                obtn[i].onclick = (function (i){       
                    return function(){
                        opage[index].style.display = "none";    
                        opage[i].style.display = "block";
                        obtn[index].removeAttribute("class","page_active");
                        obtn[i].setAttribute("class","page_active");
                        index = i;
                    }
                })(i);
            }
    })();