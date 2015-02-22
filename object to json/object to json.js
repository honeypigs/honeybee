var ul_1 = document.getElementsByTagName("ul")[1];
var IMG = document.getElementsByTagName("img");
var  p = document.getElementsByTagName("p");
var object = new Object();
var user = new Array();
object["page"] = ul_1.getAttribute("data-page");
object["travelers"] = user;	
for (var i = 0; i < IMG.length; i++) {
	var username = user["userName"] = p[i].childNodes[0].nodeValue;
	var userimg = user["userImg"] = IMG[i].getAttribute("src");
	user.push(username,userimg);
};
object["travelersCnt"] = ul_1.getAttribute("data-travelerCnt");
object["size"]  =ul_1.getAttribute("data-size");	
var data = JSON.stringify(object);
document.write(data);

