var board = new Array();
var score = 0;
$(document).ready(function(){
	newGameButton();
});

function newGameButton(){
	updataBoardView();
	//初始化棋盘
	init();
	//随机生成2个数字 
	getOneNumber();
	getOneNumber();
}
function init(){
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
				var gridCell = document.getElementById("grid-cell-"+i+"-"+j);
				gridCell.style.top = getTop(i,j);
				gridCell.style.left = getLeft(i,j);
			}
	}
	for( var i = 0; i < 4 ; i++){
		board[i] = new Array();
		for( var j = 0;j < 4 ;j++){
			board[i][j]  = 0;
		}
	}
}
updataBoardView();
function updataBoardView(){
	var boardCell = document.getElementById("grid-container");
	$(".number-cell").remove();
	for( var i = 0; i < 4 ; i++){
		board[i] = new Array();
		for( var j = 0;j < 4 ;j++){
			var numberCell = document.createElement("div");
			numberCell.setAttribute("class","number-cell");
			numberCell.setAttribute("id","number-cell-"+i+"-"+j);
			boardCell.appendChild(numberCell); 
			if (board[i][j]  == 0) {
				numberCell.style.height = 0;
				numberCell.style.width =  0;
				numberCell.style.top = getTop(i,j);
				numberCell.style.left = getLeft(i,j);
			}else{
				numberCell.style.height = 0;
				numberCell.style.width =  0;
				numberCell.style.top = getTop(i,j);
				numberCell.style.left = getLeft(i,j);
				numberCell.style.backgroundColor = getNumberBgColor(board[i][j]);
				numberCell.style.color = getNumberColor(board[i][j]);
				numberCell.text = board[i][j];
			}
		}
	}
}
function getOneNumber(){
	if( nospace(board) ){
		return false;
	}
	//随机一个位置
	var randx = parseInt(Math.random() * 4);
	var randy = parseInt(Math.random() * 4);
	while(true){
		if (board[randx][randy] == 0) 
			break;
		randx = parseInt(Math.random() * 4);
		randy = parseInt(Math.random() * 4);
	}
	//随机一个数字
	var randNumber = Math.random()< 0.5 ? 2 : 4;
	//在随机位置显示随机数字
	board[randx][randy] = randNumber;
	showNumber(randx,randy,randNumber);
	return true;
}
$(document).keydown(function(event) {
	switch(event.keyCode){
		case 37 :  //left
			if( moveLeft() ){
				getOneNumber();
				isGameOver();
			};
			break;
		case 38 :  //up
			if( moveUp() ){
				getOneNumber();
				isGameOver();
			};
			break;
		case 39 :   //right
			if( moveRight() ){
				getOneNumber();
				isGameOver();
			};
			break;
		case 40 :  //down
			if( moveDown() ){
				getOneNumber();
				isGameOver();
			};
			break;
		default : 
			break;
		}
});
function moveLeft(){
	if (!canMoveLeft(board) ) {
		return false;
	}
	//moveleft
	for (var i = 0; i < 4; i++) {
		for(var j = 1; j < 4; j++){
			if (board[i][j] != 0) {
				for(var k = 0; k < j; k++){
					if (board[i][k] == 0 && noBlockHorizontal(i,k,j,board)) {
						//move 
						showMoveAnimation(i,j,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						break;
					}
					else if(board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board)){
						//move
						showMoveAnimation(i,j,k);
						//add
						board[i][k] = board[i][k] + board[i][j];
						board[i][j] = 0;
						showNumber(i,k,board[i][k]);
						break
					}
				}
			}
		}
	}
	return true;
}
function isGameOver(){

}