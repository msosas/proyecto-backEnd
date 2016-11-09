var Aula = {
	'agregarAlumno' : function(alumno , callback){
		this.clase[alumno] = this.clase[alumno] || [];
		this.clase[alumno].push(callback);
	},
	'hazLoTuyo': function(alumno){
		for(var i = 0; i < this.clase[alumno].length; i++){
			this.clase[alumno][i]();
		}
	},
	'clase':{}
};

module.exports = Aula;
