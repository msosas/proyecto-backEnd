## Creando nuestra primera página web.

Usando lo que hemos aprendido de la librería `http`, vamos a crear nuestro primer sitio de verdad!

Para eso vamos a crear un nuevo servidor web, y vamos a agregar las siguientes rutas:

> Vamos a usar templates ya hechos y nos concentramos sólo en armar las rutas. Los templates están [acá](https://github.com/Plataforma5/proyecto-backEnd/tree/master/template)

* / : Nos va a llevar al index. (index.html)
* /libros: Muestra la colección de libros.
* /discos: Muestra la colección de discos.
* /verTodo: Muestra la colección de ambos discos y libros.
* /new : Formulario para agregar un nuevo disco.


Básicamente, nuestro server necesita:
* Escuchar en un puerto: `http.createServer(...).listen(3000, '127.0.0.1');`
* Identificar la ruta que busca quien hace el request: Esto viene dentro del objeto `req` bajo la propiedad `url`. Usaremos condicionales para identificarlas: `if( req.url === '/'){`.
* Leer un archivo: Vamos a usar `fs` para leer el archivo que nos piden, de forma sincrónica o asincrónica. 
* Por último, tiene que armar la respuesta, es decir, escribir el `header` http y mandar el archivo que leimos!

#### Notas

##### Leer un archivo:

Por ejemplo, si quisiera leer el archivo `discos.html`, que se encuentra en la carpeta `templates/html/`, tengo que usar la librería `fs`:

```javascript
var fs = require('fs');

// forma SINCRONICA
var discos = fs.readFileSync('./templates/html/discos.html');
// aca hago cosas con el archivo que leí
console.log(discos);

//forma ASINCRONICA
fs.readFile('./templates/html/discos.html', function(file){
    // aca hago cosas con el archivo que leí
    console.log(file);
});

```

##### Rutas:

Para crear las rutas en el servidor, vamos a usar _condicionales_. Dentro del objeto `req.url` vamos a encontrar la ruta a la que quería acceder quién hizo el request:

```javascript
var http = require('http');
var fs   = require('fs');

http.createServer( function(req, res){ 
    if( req.url === '/'){ //Si la URL es / devolvemos el HTML
        res.writeHead(200, { 'Content-Type':'text/html' })
        var html = fs.readFileSync(__dirname +'/html/index.html');
        res.end(html);
    }
    if(req.url === '/api'){ //Si la URL es /api devolvemos el objeto
        res.writeHead(200, { 'Content-Type':'application/json' })
        var obj = {
            nombre: 'Juan',
            apellido: 'Perez'
        };  
        res.end( JSON.stringify(obj) );
    } 
}).listen(1337, '127.0.0.1');
```

----

Punto bonus:

* Crear una ruta por defecto, a las que lleguen los requests cuyas URLs no conocemos.
* Crear dos nuevas rutas, donde se devuelva la colección de libros y discos pero en _formato JSON_.

