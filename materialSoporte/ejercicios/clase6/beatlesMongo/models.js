var mongoose = require('mongoose'); // Importamos el módulo Mongoose.

var beatlesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    birthdate: { type: Date },
    profilePic: { type: String, default: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTHwH2EknWe_HP2xcVPqYXM00ou-1Ol8Lm--nNpKTI-abzY8f-D' },
    wiki: { type: String }
}, { collection: 'beatles' });


var visitasSchema = new mongoose.Schema({
    id: { type: 'ObjectId', required: true },
    count: { type: Number, default: 1 }
}, { collection: 'visitas' });


var preguntasSchema = new mongoose.Schema({
    name: { type: String, required: true },
    pregunta: { type: String, required: true }
}, { collection: 'preguntas' });

var logSchema = new mongoose.Schema({ },{ "strict": false,  collection: 'log' }); // Schema sin structura

module.exports = {
	beatlesSchema,
	visitasSchema,
	logSchema,
	preguntasSchema
}