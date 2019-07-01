'use strict';

var service = require('./service'); //Load greet.js module and assign it to varible greet
var name = 'Zhan';
service.sayGreet(name); //Now call the method exported in greet.js mudule
service.sayGoodbye(name);