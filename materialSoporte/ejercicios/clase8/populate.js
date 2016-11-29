var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/prueba") // Connect se conecta a la bd

function handleError(err){
	console.log(err);
}

var AlumnoSchema = new mongoose.Schema({
  nombre: { type: String, required: true},
  apellido: { type: String, required: true},
  date: { type: Date, default: Date.now }
})

var CursoSchema = new mongoose.Schema({
  alumnos: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Alumnos"
    }],
  nombre: String,
  date: { type: Date, default: Date.now }
})

var Curso  = mongoose.model('Cursos', CursoSchema);
var Alumno = mongoose.model('Alumnos', AlumnoSchema);

var juan = new Alumno({  nombre: 'Juan', apellido: 'Perez' });
var martin = new Alumno({ nombre: 'Martin', apellido: 'Perez' });


var cur = new Curso({
    nombre: "1ero B",
    alumnos: [juan, martin]
  });

juan.save(function (err) {
  if (err) return handleError(err);
  martin.save(function (err) {
    if (err) return handleError(err);
    // listo!
    cur.save(function (err) {
	    if (err) return handleError(err);
	    // listo!
	    Curso.findOne({ nombre: '1ero B' }).populate('alumnos').exec(function (err, doc) {
		  if (err) return handleError(err);
		  console.log(doc)
		  // docs.alumnos.forEach(function(alumno){
		  //       console.log(alumno.nombre);
		  //   })
		});
	  });
  });

});