var express = require('express'); //requerimos Express
var app = express();  // Creamos una nueva app de express

var mongoose = require('mongoose'); // Importamos el módulo Mongoose.

mongoose.connect("mongodb://localhost/beatles");

//###########

var beatlesSchema = require('./models/beatles.js');
var preguntasSchema = require('./models/preguntas.js');
var visitasSchema = require('./models/visitas.js');
var logSchema = require('./models/log.js');

var Beatles = mongoose.model('beatles', beatlesSchema);
var Preguntas = mongoose.model('preguntas', preguntasSchema);
var Visitas = mongoose.model('visitas', visitasSchema);
var Log = mongoose.model('log', logSchema);


app.set('view engine', 'ejs'); // Seteamos el template engine


// ES MUY IMPORTANTE EL ORDEN DEL MIDDLEWARE!!
app.use('/api/John%20Lennon', function(req, res, next){
  console.log('Groso, John!');
  next();
})

app.use('/profile/:name', function(req, res, next){
   Beatles.findOne({'name': req.params.name}, function(err, doc){
      if(err) return console.log('Errorrr!!!');
      console.log(doc['_id']);
      if(doc){
        var id_beatle = doc['_id'];
        Visitas.findOne({id: id_beatle }, function(err, doc){
          if(doc){
            doc.count += 1;
            doc.save();
          }else{
            Visitas.create({id: id_beatle}, function(err, doc){
              if(err) return console.log('Errorrr!!!');
              return console.log('Nueva entrada');
            });
          }
        });
      }
   });
  next();
})

//Rutas

app.get('/', function(req, res){
  res.send('Hola!! Bienvenidos');
});

app.get('/api', function(req, res){
  Beatles.find({}, {'_id': 0}, function(err, docs){
    if(err) return console.log('Errorrr!!!');
    res.send(docs);
  })
});

app.get('/api/:name', function(req,res){
  Beatles.findOne({'name': req.params.name}, {'_id': 0}, function(err, doc){
    if(err) return console.log('Errorrr!!!');
    if(doc) return res.send(doc)
    res.send('no existe ese Beatle');
  })
});

app.get('/profile/:name', function(req, res){
  Beatles.findOne({'name': req.params.name}, {'_id': 0}, function(err, doc){
    if(err) return console.log('Errorrr!!!');
    if(doc) return res.render('profile', {name: doc.name, src : doc.profilePic, date: doc.birthdate})
    return res.send('no existe ese Beatle');
  })
})

app.get('/todos', function(req, res) {
   Beatles.find({}, {'_id': 0}, function(err, docs){
    if(err) return console.log('Errorrr!!!');
    res.render('todos', {beatles: docs});
  })
})

//Enviando Datos
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false }); // Libreria necesaria para procesar forms requests.

app.get('/form', function(req, res){
  res.render('form');
});

app.post('/form', urlencodedParser, function(req, res){
  Preguntas.create({name: req.body.nombre, pregunta: req.body.pregunta}, function(err, doc){
    if(err) return console.log(err);
    res.send('En algún momento algún beatle te va a contestar!');
  });
});

var jsonParser = bodyParser.json();
app.post('/api/add', jsonParser, function (req, res) {
  Beatles.create(req.body, function(err, doc){
    if(err) return res.send(err);
    res.send(doc);
  })
});

app.delete('/api/:name', jsonParser, function (req, res) {
  Beatles.remove({name: req.params.name}, function(err, removed){
    if(err) return res.send(err);
    if(!removed.result.n){
      res.send('No se borro ninguno');
    }else{
      res.send('Se borró ' + req.params.name);
    }
  })
});

// PROBAR CON POSTMAN
// {
// "name":"Toni",
// "birthdate": "12/07/1986",
// "profilePic": "https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAZhAAAAJGM1NjZkMDMzLTQ3MDctNDkyMy04YTFkLThmYjU4Y2I5N2NiZg.jpg"
// }

// MiddleWare

app.use('/public/', express.static(__dirname+'/public')); //sirve todo lo que esté en la ruta con su nombre.


app.listen(3000); // Arrancamos el server en el puerto 3000