'user strict';

var s = 'Hello';
var b = 'Bye';
function sayGreet(name) {
	console.log(s + ' ' + name + '!');
}

function sayGoodbye(name) {
	console.log(b + ' ' + name + '!');
}
exports.sayGreet = sayGreet;
exports.sayGoodbye = sayGoodbye;

//The following is another implementation
/*
 'user strict';

var s = 'Hello';
var b = 'Bye';
//For reference please look at the follpowing
//https://stackoverflow.com/questions/16631064/declare-multiple-module-exports-in-node-js
module.exports = {
    sayGreet: function(name) {
		console.log(s + ' ' + name + '!');
	},
    sayGoodbye: function(name) {
		console.log(b + ' ' + name + '!');
	}
}
*/