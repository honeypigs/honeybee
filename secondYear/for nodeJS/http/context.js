var pet = {
	word : '汪~~ 汪~~ 汪~~ ',
	speak: function () {
		console.log(this.word);
		console.log(this === pet);
	}
}


var 致远割 = pet;
致远割.speak();

(function pet(word) {
	this.word = word;
	console.log(this.word);
	console.log(this === global);
})("....");


function Pet(word) {
	this.word = word;
	this.speak = function() {
		console.log(this.word);
		console.log(this);
	}
}

var 石喵 = new Pet("喵");

石喵.speak();