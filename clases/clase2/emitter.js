var Emitter = {
	'agregarEvento' : function(evento , callback){
		this.eventos[evento] = this.eventos[evento] || [];
		this.eventos[evento].push(callback);
	},
	'sucedioEvento': function(evento){

		for(var i = 0; i < this.eventos[evento].length; i++){
			this.eventos[evento][i]();
		}
	},
	'eventos':{}
};

module.exports = Emitter;

// emt.on('terremoto', function(){
// 	console.log('corramos!!');
// });

// emt.emit('terremoto');
// 'eventos':{
	
// }


// 'suena timbre' -> function(){'abrir la puerta'},
// 					function(){'le diera un chicle'}
// 'corte la luz' -> function(){'prender vela'},
// 					function(){'saque la bici'}
// var eventos = {
// 	'suena timbre' : [function(){'abrir la puerta'},
// 					function(){'le diera un chicle'}],
// 	'corte la luz' : 
// }

// emiter.emite('corte de luz');

// for(var i in eventos['corte de luz']){
// 	eventos['corte de luz'][i]();
// }