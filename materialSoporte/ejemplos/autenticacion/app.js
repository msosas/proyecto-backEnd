var express = require('express');
var app = express();
var passport = require('passport');
var LocalStrategy = require('passport-local'); // Estrategia local de express
var mongoose = require('mongoose');
var expressSession = require('express-session'); // Mini db en memoria para guardar sesiones
var User = require('./models/User');  // El modelo de usuarios
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/autenticacion');
app.set('view engine', 'ejs');


/*  =========================
    PASSPORT CONFIG
=========================*/
// Acá configuramos la persistencia de las sesiones
// express levanta una mini bd en memoria para guardar
// datos de sesiones
app.use(expressSession({
  secret: 'string secreta',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// Todas estas funciones nos las da el plugin de Mongoose
// Acá las conectamos con Passport
passport.use(new LocalStrategy(User.authenticate())); // Aca creamos la estragegia
// La funcion authenticate() devuelve datos del usuario si es un usuario autenticado y false si no.
passport.serializeUser(User.serializeUser()); // Función que guarda los datos en la db de sesiones.
passport.deserializeUser(User.deserializeUser());
// Función que recupera los datos de la db de sesiones.

// RUTAS
var urlParser = bodyParser.urlencoded({ extended:true });

// Formulario de login
app.get('/login', function(req, res) {
  res.render('login');
});
// Procesa el login, usamos authenticate de passport como middleware.
app.post('/login', urlParser, passport.authenticate('local', {
  failureRedirect: '/register',
}), function(req, res) {
  console.log('logeado');
  res.send('Estas Logeado');
});

// Registro de un usuario
app.get('/register', function (req, res) {
  res.render('register');
});

// Procesa el registro,
app.post('/register', urlParser, function (req, res) {
  console.log(req.body);
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      return res.send('hubo un error durante el registro');
    }
    res.send('Se creó el usuario ' + user.username);
  });
});

// Logout

app.get('/logout', function(req, res){
  req.logout();
  res.send('Deslogeado');
});

// Middleware
// Si está autenticado, que siga, si no respondemos que no puede pasar.
// Usamos la función req.isAuthenticated() de Passport.
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // puede pasar
  }
  return res.send('<img src="https://i.ytimg.com/vi/qdYifXP5tVA/maxresdefault.jpg"/>');
}

// Publica
app.get('/publica', function(req, res) {
  res.render('publica');
});

// Privada
// Usamos el middleware que creamos arriba
app.get('/privada', isLoggedIn, function(req, res) {
  res.render('privada');
});

app.listen(8080);

