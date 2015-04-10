var allCard = document.getElementById("all_card");
window.onload=function(){
	for (var i = 0; i < 4; i++) 
		for(var j  = 0; j< 3; j++)
			createDiv(i,j,allCard);
}
function createDiv(i,j,father){
	var div = document.createElement("div");
	div.style.marginTop = "12px";
	div.style.marginLeft =  "48px";
	div.setAttribute("class","card");
	father.appendChild(div);
	createDelet(div);
}
function createDelet(father){
	var delet = document.createElement("a");
	delet.setAttribute("class","delet");
	delet.setAttribute("href","#");
	var img = document.createElement("img");
	img.src = "close.png";
	delet.appendChild(img);
	father.appendChild(delet);	
}
var card  = document.getElementsByTagName("div");
var leftDiv = document.getElementById("information_left");
var rightDiv = document.getElementById("information_right");
function showInformation(){
	for (var i = 0; i < card.length; i++) {
		card[i].onclick = function(){
			if (card[i]>9) {
				leftDiv
			}
		}
	}
}
