var express = require('express');
var app = express();

app.set('view engine', 'ejs'); // Seteamos el template engine

app.get('/', function(req, res){
	res.render('index', {nombre : 'Plataforma 5', mensaje: 'Funciona EJS!!'})
});


app.get('/ejs', function(req, res) {
    res.render('testejs', {nombre: 'EJS PRUEBA', mensaje: "Estes es mi mensaje", bool:false}); 
})

app.get('/ejstrue', function(req, res) {
    res.render('testejs', {nombre: 'EJS PRUEBA', mensaje: "Estes es mi mensaje", bool:true});
})

app.get('/ejslista', function(req, res) {
    res.render('listaejs', {lista: ['Hola','Como','Va?', 'Soy una','Lista']});
})

app.listen(1337);