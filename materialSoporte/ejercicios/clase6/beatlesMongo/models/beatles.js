var mongoose = require('mongoose'); // Importamos el módulo Mongoose.

module.exports  = new mongoose.Schema({
    name: { type: String, required: true },
    birthdate: { type: Date },
    profilePic: { type: String, default: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTHwH2EknWe_HP2xcVPqYXM00ou-1Ol8Lm--nNpKTI-abzY8f-D' },
    wiki: { type: String }
}, { collection: 'beatles' });