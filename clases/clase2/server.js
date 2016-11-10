var http = require('http'); // importamos el módulo http para poder trabajar con el protocolo

http.createServer( function(req, res) {
	//cada vez que llegue un request.
	console.log(req.url);
	if(req.url == '/index.html'){
		res.writeHead(200, {'Content-Type':'text/html'});
		res.end('<h1>Hola, Mundo!</h1><p>Toni</p>');
	}else if ( req.url == '/' ){
		res.writeHead(200, {'Content-Type':'text/html'});
		res.end('<h1>Hola, home!</h1>');
	}else{
		res.writeHead(404, {'Content-Type':'text/html'});
		res.end('<h1>No existe</h1>');
	}
	
}).listen(1337, '127.0.0.1');