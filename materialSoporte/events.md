

### Eventos: Events emitter

Una gran porción del core de Nodejs está construida usando como base este concepto.
Un _Evento_ es algo que ha ocurrido en nuestra aplicación y que dispara una acción. Este concepto no es exclusivo a _Nodejs_, si no que aparece en muchos lenguajes y arquitecturas de software.
En Node hay dos tipo de eventos:

- Eventos del sistemas: Estos vienen del código en _C++_, gracias a una librería llamada _libuv_ y manejan eventos que vienen del sistema operativo como por ejemplo: Termine de leer una archivo, o recibí datos de la red, etc...
- Eventos Customs: Estos eventos estan dentro de la parte Javascript del Core. Maneja eventos que podemos crear nosotros mismos, para eso vamos a usar el _Event Emitter_. Varias veces cuando un evento de _libuv_ sucede, genera un evento usando el _event emitter_.

_Ejercicio_ Crear un forma simple de emitir eventos y capturarlos.

#### Event Listener

Dijimos que cuando ocurre un evento, queremos capturarlo y responder de alguna forma, para eso vamos a hacer uso de los _Events Listeners_, básicamente es el código _escucha_ por un evento y que hace algo (ejecuta código) cuando ese evento sucede. Podemos tener varios listeners escuchando el mismo evento.

### Event Loop

Repasemos como funcionaba V8 internamente y veamos qué es exactamente el __event loop__:

![event-loop](./img/eventloop.png)

Los componentes que vemos en la figura son:

* Stack: es el runtime de V8, éste va leyendo el código del programa que esté corriendo y va poniendo cada instrucción en el stack para ejecutarla. __Javascript es Single threaded, o sea que sólo puede ejecutar una instrucción a la vez__

* SO / Webapis: Esta pila es manejada por el sistema Operativo. Básicamente V8 le delega tareas al SO, por ejemplo: Bajame esto de internet, o leeme este archivo, o comprimí esta imagen, etc... __El SO puede hacer estas tareas en un thread o varios, es transparente para nosotros__. Lo único que nos importa es cuando el SO _completó_ la tarea que se le pidió. Cuando lo hizo, nos avisa y pasa el _callback_ al task queue.

* Task Queue: Cuando el SO nos indica que terminó una tarea, no podemos simplemente pasar el _callback_ al stack de JS (no sabemos que está haciendo y podría correr código en un momento inoportuno), por lo tanto, lo que hace es dejar el callback en el _Task Queue_ ( es una pila tipo FIFO ). Ahora, cuando el Stack JS está vació el TANTAN TATAN... __EVENT LOOP__ agarra el _callback_ del Queue y lo pasa al Stack JS para ser ejecutado!

Toda esta interacción con el SO, el manejo del Task Queue y el Evento loop está implementado en la libreria [__libuv__](http://docs.libuv.org/en/v1.x/) que es la piedra angular de Nodejs. De hecho, su logo es un Unicornio T-rex, es demasiado copada:

![libuv](./img/libuv.png)

### Streams, Buffers y Pipes

Otro concepto importante para entender como funciona Nodejs ( o cualquier pieza de software en general ) es el de Streams, Buffers y Pipes. Ahora veremos que son cada uno y como se usan.

* __Buffer__: Un espacio limitado en tamaño cuyo objetivo es guardar datos de forma temporal mientras estos datos son movidos de un lugar a otro. Generalmento estos datos provienen de lo que se conoce como un _Stream_ de datos.

* __Stream__: Un stream es una secuencia de datos que se hace disponible a medida que pasa el tiempo. O sea, son pedazos de datos que van llegando de a poco, y que forman parte de algo más grande. Por ejemplo, cuando hacen stream de peliculas en NetFlix, pueden ir viendola a medida que van llegando los datos, en contraposicion con tener que bajar toda la pelicula entera antes de poder verla ( Torrents anyone? ).

![stream](./img/stream.gif)

En la mayoría de los casos estos dos conceptos se utilizan juntos: un __Stream__ de datos llena un __Buffer__, cuando este esta lleno, los datos se pasan para que sean procesados. ¿Vieron en YouTube cuando se traba el video y les dicen: __BUFFERING__?? Bueno, lo que está ocurriendo es que el Stream de datos (El video) se está bajando lento, entonces el reproductor no puede seguir reproduciendolo, por lo tanto tiene que esperar que el _buffer_ se llene nuevamente para poder procesar la siguiente imagen que mostrará. 

![stream-buffer](./img/streambuffer.gif)

### Leyendo un archivo con Node

Para trabajar con archivos en Node, vamos a usar el módulo `fs` que tiene la funcionalidad para leer y escribir archivos, como se encuentra en las librerías core de node, vamos a requerirlo usando `require('fs')`.

Ahora vamos a crear un archivo llamado `greet.txt` y vamos a escribir un saludo dentro, lo vamos a dejar en la misma carpeta que nuestro archivo `.js`.

Ahora vamos a leer el contenido de ese archivo y mostrarlo por consola:

```javascript
var fs = require('fs');

var saludo = fs.readFileSync(__dirname + '/greet.txt', 'utf8');
console.log(saludo);
```

Como podemos ver en la [documentación](https://nodejs.org/dist/latest-v6.x/docs/api/fs.html#fs_fs_readfilesync_file_options) de `fs`, la función `readFileSync`, recibe un path como parametro y el encoding del file. 
__\_\_dirname: esta variable tiene guardado el path completo del directorio donde está el archivo que está ejecutando el código__
Por lo tanto le estamos diciendo que lea el archivo  greet que creamos _DE MANERA SINCRONICA_ (esto quiere decir que no va avanzar hasta que no lea de manera completa) y que guarde el resultado en la variable `saludo`, luego que muestre el contenido de saludo por consola. Como vemos, el resultado es que en `saludo` se guarda el contenido del archivo `greet.txt`!!

![fs](./img/fs.png)

Al hacerlo sincronico, el programa se _bloquea_ hasta que no termine de leer el archivo completo, si el archivo fuera muy grande, veriamos que el programa queda _trabado_ y causa una mala experiencia de uso.

Para resolver ese problema, vamos a hacer lo mismo, pero haciendo que la lectura del archivo sea en forma asincrónica.
Para hacerlo, `fs` nos da la función `readFile`, que recibe el path del archivo a leer, el encoding, y además recibe una función, que será el `callback` para cuando se termine de leer el archivo:

```javascript
var fs = require('fs');
fs.readFile(__dirname + '/greet.txt', 'utf8', function(err, data) {
	console.log(data);
});
console.log('Listo!');
```

Hemos agregado al final el `console.log('Listo!')` para que vean en qué momento se ejecuta esa linea de código y en qué momento se ejecuta el callback.

__Es super importante que comprendan el porqué del orden en el que aparecen los console.logs, no avances antes de comprenderlo. Pista: Mirá más arriba como funciona el event loop de JS.__

Otra cosa a notar es que la función anónima que le pasamos tiene dos parámetros: _err_ y _data_. Esto se debe a que existe un standart llamado __error-first callback__ que dice que cada vez que escribas una función que ejecute un callback, le pases a ese _cb_ como __primer__ parámetro una variable de _Error_. En el caso que no haya habido errores en la ejecución, entonces esa variable tendrá _null_, en caso contrario tendrá algo que informe el error.

![fs-2](./img/fs2.png)

Como vemos, primero se ejecutó el segundo console log, luego el console log del _callback_. 