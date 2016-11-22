var mongoose = require('mongoose'); // Importamos el módulo Mongoose.

module.exports =  new mongoose.Schema({
    id: { type: 'ObjectId', required: true },
    count: { type: Number, default: 1 }
}, { collection: 'visitas' });