var mongoose = require('mongoose'); // Importamos el módulo Mongoose.

mongoose.connect("mongodb://localhost/prueba") 

// Connect se conecta a la bd
// tenemos que especificar en qué host está y que base de datos queremos


var personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    sex: { type: String, enum: ["M","F"] },
    country: { type: String, default: "Argentina" }
}, { collection: 'personas' });

var Persona =  mongoose.model( "Person", personSchema );


// Persona.find({ 'age': 29 }, function (err, person) {
//   if (err) return handleError(err);
//   console.log(person) 
// })

// Persona.find({ 'age': 29 }, 'name age', function (err, person) {
//   if (err) return handleError(err);
//   console.log(person) 
// })


// Persona.findOne({ name: 'Seba' }, function (err, person) {
// 	console.log(person);
// });

// Persona.findOne({ age: 29 }, function (err, person) {
// 	console.log(person);
// });	

// Persona.update({ age: { $gt: 25 } }, { country: 'Uruguay' }, function(err, person){
//     console.log(person);
// });

Persona.findOne({ name: 'Guille' }, function (err, doc){
  doc.country = 'Uruguay';
  console.log(doc);
  doc.save();
});


//mongoose.connection.close(); //cerramos la conexion