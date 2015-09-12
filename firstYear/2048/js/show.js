function showNumber(i,j,num){
	var numberCell =  document.getElementById("number-cell-"+i+"-"+j);
	numberCell.style.backgroundColor = getNumberBgColor(num);
	numberCell.style.color = getNumberColor(num);
	var numberCell_txt = document.createTextNode(num);
	numberCell.appendChild(numberCell_txt);
	$("#number-cell-" + i +'-'+j ).animate({
		width: 100 + "px",
		height: 100 + "px"
	},100);
}
function showMoveAnimation(fromx,fromy,toy){
	var numberCell =  $("#number-cell-" + fromx +'-'+fromy );
	console.log(fromx,toy);
	numberCell.animate({
		top: getTop(fromx,toy),
		left: getLeft(fromx,toy)
	},200);
}