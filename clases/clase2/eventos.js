var emt = require('./emiter.js');

emt.agregarEvento('click', function(){
	console.log('alguien hizo click!');
});

emt.sucedioEvento('click');