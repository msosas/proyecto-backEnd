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



var santi = new Persona({ name: 'Santi', age : 29  });

santi.save(function (err) {
  if (err) return handleError(err);
  console.log('se guardo santi!');
});

Persona.create({ name: 'Guille', age: 29 }, function (err, persona) {
  if (err) return handleError(err);
  console.log('se guardo Guille!');
})
Persona.create({ name: 'Seba', age: 29 }, function (err, persona) {
  if (err) return handleError(err);
  console.log('se guardo Seba!');
})



mongoose.connection.close(); //cerramos la conexion