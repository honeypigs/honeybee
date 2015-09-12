var ul_1 = document.getElementsByTagName("ul")[1];
var IMG = document.getElementsByTagName("img");
var  p = document.getElementsByTagName("p");
var object = new Object();
var user = new Array();
var userData = new Object();
object["page"] = ul_1.getAttribute("data-page");
object["travelers"] = user;	
for (var i = 0; i < IMG.length; i++) {
	var username = userData["userName"] = p[i].childNodes[0].nodeValue;
	var userimg = userData["userImg"] = IMG[i].getAttribute("src");
	user.push(userData);
};
object["travelersCnt"] = ul_1.getAttribute("data-travelerCnt");
object["size"]  =ul_1.getAttribute("data-size");
var data = JSON.stringify(object);
document.write(data);

