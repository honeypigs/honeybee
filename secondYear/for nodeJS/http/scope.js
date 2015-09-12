var c = 0;

(function globalFunction() {
	var c = 0;
	c++;
	console.log(c++);

	(function localFunction() {
			c ++;
			console.log(c);
	})();
})();

console.log(c++);

