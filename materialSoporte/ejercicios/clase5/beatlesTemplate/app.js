var express = require('express'); //requerimos Express
var app = express();  // Creamos una nueva app de express

var fs = require('fs'); // requerimos FS para abrir el template
var _ = require('underscore'); //vamos a usar underscore para manejar el arreglo

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"http://beatlephotoblog.com/photos/2013/05/132.jpg32.jpg",
  wiki: 'https://en.wikipedia.org/wiki/Lennon'
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg",
  wiki: 'https://en.wikipedia.org/wiki/Paul_McCartney'
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"http://az616578.vo.msecnd.net/files/2016/03/09/635931448636931925-692833716_george-harrison-living-in-the-material-world-george-harrison-photo-credit-credit-robert-whitaker-c-apple-corps-ltd-courtesy-of-hbo.jpg",
  wiki: 'https://en.wikipedia.org/wiki/George_Harrison'
}
]

var cuenta = fs.readFileSync('./public/cuenta.json', 'utf-8');
if(cuenta){
  cuenta = JSON.parse(cuenta);
}else{
  cuenta = cuenta || {
    "John Lennon": 0,
    "Paul McCartney": 0,
    "George Harrison": 0,
    "Richard Starkey": 0
  };
}

app.set('view engine', 'ejs'); // Seteamos el template engine


// ES MUY IMPORTANTE EL ORDEN DEL MIDDLEWARE!!
app.use('/api/John%20Lennon', function(req, res, next){
  console.log('Groso, John!');
  next();
})

app.use('/profile/:name', function(req, res, next){
  cuenta[req.params.name] += 1;
  fs.writeFileSync('./public/cuenta.json', JSON.stringify(cuenta), { flag : 'w' });
  console.log(cuenta);
  next();
})

//Rutas

app.get('/', function(req, res){
  res.send('Hola!! Bienvenidos');
});

app.get('/api', function(req, res){
  res.send(beatles);
});

app.get('/api/:name', function(req,res){
  beatle = _.findWhere(beatles, {name: req.params.name})
  if(beatle){
    res.send(beatle);  
  }else{
    res.send({mensaje:'Este Beatle no existe!!!'});
  }
});

app.get('/profile/:name', function(req, res){
  beatle = _.findWhere(beatles, {name: req.params.name})
  // var html = fs.readFileSync('./profile.html', 'utf-8'); //abrimos el archivo con encoding porque vamos a reemplazar texto
  // html = html.split('{name}').join(beatle.name); //como son múltiples ocurrencias usamos este 'truquito'
  // html = html.split('{date}').join(beatle.birthdate);
  // html = html.split('{src}').join(beatle.profilePic);
  // res.send(html);
  res.render('profile', {name: beatle.name, src : beatle.profilePic, date: beatle.birthdate})
})

app.get('/todos', function(req, res) {
    res.render('todos', {beatles});
})

//Enviando Datos
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false }); // Libreria necesaria para procesar forms requests.

app.get('/form', function(req, res){
  //var html = fs.readFileSync('./form.html', 'utf-8');
  console.log(preguntas);
  //res.send(html);
  res.render('form');
});

var preguntas = fs.readFileSync('./public/preguntas.json', 'utf-8');
if(preguntas){
  preguntas = JSON.parse(preguntas);
}else{
  preguntas = [];  
}


app.post('/form', urlencodedParser, function(req, res){
  var pregunta = {};
  pregunta[req.body.nombre] = req.body.pregunta
  preguntas.push( pregunta );
  fs.writeFileSync('./public/preguntas.json', JSON.stringify(preguntas), { flag : 'w' });
  res.send('En algún momento algún beatle te va a contestar!');
});

var jsonParser = bodyParser.json();
app.post('/api/add', jsonParser, function (req, res) {
  beatles.push(req.body);
  console.log(req.body);
  res.redirect('/api');
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