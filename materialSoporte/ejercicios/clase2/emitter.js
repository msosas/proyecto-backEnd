var Emitter = {
	events : {}
}

Emitter.on = function(evento, callback) {
	this.events[evento] = this.events[evento] || [];// Si Esta vacio crea un array vacio.
													// Si no esta vacio, sigue siendo el mismo
	this.events[evento].push(callback); // agrega el callback a ese evento.
};

Emitter.emit = function(evento) {
	if(this.events[evento]) { //Si existe el evento
		this.events[evento].forEach(function(callback){
			callback();
		}); //ejecuta todos los callbacks que tiene.
	}
};


module.exports = Emitter;