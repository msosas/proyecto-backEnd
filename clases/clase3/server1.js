var http = require('http'); // importamos el módulo http para poder trabajar con el protocolo
var fs = require('fs')

var html = fs.readFileSync(__dirname +'/index.html','utf-8');
var obj = {
    nombre: 'Juan',
    apellido: 'Perez'
};

console.log('Iniciando Servidor...')
http.createServer( function(req, res){ // Creamos una serie de events listener, que van a escuchar por requests que ocurren en este socket
    //Para crear un response empezamos escribiendo el header
    var nombre = 'Juan';
    var d = new Date();
    console.log(req.url);
    if(req.url === '/date'){
    	res.writeHead(200, { 'Content-Type':'application/json' }) //Le ponemos el status code y algunos pair-values en el header
    // html = html.replace('{nombre}', nombre);
    	res.end( d.toString() );
    }else if (req.url === '/hola'){
    	res.writeHead(200, { 'Content-Type':'text/html' }) //Le ponemos el status code y algunos pair-values en el header
    	html = html.replace('{nombre}', nombre);
    	res.end( html );
    }else if (req.url === '/css/styles.css'){
    	var css = fs.readFileSync(__dirname +'/css/style.css');
    	res.end(css);
    }
    
}).listen(1337, '127.0.0.1'); //Por último tenemos que especificar en que puerto y en qué dirección va a estar escuchando nuestro servidor