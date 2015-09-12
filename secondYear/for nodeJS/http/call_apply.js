var pet = {
	word: "...",
	speak: function(say) {
		console.log(say + " " + this.word);
	}
}

var dog = {
	word: "汪汪汪"
}

pet.speak.call(dog,"Speak");


function Pet(words) {
	this.words = words;
	this.speak = function() {
		console.log(this.words);
	}	
}

function Dog(words) {
	Pet.call(this,words);
}

var dog = new Dog("wang");

dog.speak();