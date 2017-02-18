## Express.js

Ahora vamos a replicar el sitio que hicimos, pero usando el framework express.

* / : Nos va a llevar al index. (index.html)
* /libros: Muestra la colección de libros.
* /discos: Muestra la colección de discos.
* /verTodo: Muestra la colección de ambos discos y libros.
* /new : Formulario para agregar un nuevo disco.

#### Notas

##### Importando Express

Lo primero es importar el módulo express (si no lo tenés instalado, instalalo usando `npm`). Luego inicializar nuestra `app`:

```javascript
var express = require('express'); // importamos Express.
var app     = express();          // inicializamos nuestra app.
```

##### Configurando rutas:

Ahora empezamos a _configurar_ nuestra app, para agregar las rutas usamos `get`, le pasamos el nombre de la ruta, y el callback a ejecutar:

```javascript
app.get('/', function(req, res){
//Ruta para un GET a /

});
```

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

##### Levantar servidor:

Por último tenemos que inciar nuestra app:

```javascript
app.listen(3000);
```