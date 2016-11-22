var mongoose = require('mongoose'); // Importamos el módulo Mongoose.

module.exports =  new mongoose.Schema({
    name: { type: String, required: true },
    pregunta: { type: String, required: true }
}, { collection: 'preguntas' });