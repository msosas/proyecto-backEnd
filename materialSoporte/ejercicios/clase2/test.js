var emtr = require('./emitter.js');

emtr.on('greet', function() {
	console.log('Alguien dijo Hola!');
});

emtr.on('greet', function() {
	console.log('Hubo saludos!');
});

console.log('Hello!');
emtr.emit('greet');