### Módulos

Def: Un bloque de código reusable, cuya existencia no altera accidentalmente el comportamiento de otros bloques de código.
Este concepto ya existia en otros lenguajes de programación y era muy usado para estructurar proyectos. De todos modos, los módulos no eran parte del standart en ECMAscript (lo agregaron en la última versión), pero Nodejs lo introdujo bajo el nombre de _Commonjs Modules_, que era básicamente un acuerdo (un standart) sobre cómo deberían estar estructurados los módulos.

### Cómo funciona CommonJs Modules?

Básicamente, el standart dice lo siguiente:

- Cada archivo es un ḿodulo, y cada módulo es un archivo separado.
- Todo lo que queremos exportar va a ser expuesto desde un único punto.

Para entender el standart tenemos que tener dos conceptos en claro:

* First-Class Functions: Las funciones en javascript son tratadas igual que cualquier otro objeto, es decir que podés guardarlas en variables, pasarlas como argumentos, guardarlas en arreglos, etcs...
* Function Expressions: Como las funciones son first-class, al escribir una expresión de funcion estoy creando la misma, eso quiere decir que puedo crear funciones en cualquier parte del código. 

Vamos a empezar construyendo nuestro propio módulo! una vez que lo tengamos, vamos a ver como usarlo. Entendiendo así todo el ciclo.

#### Construyendo un módulo

Empezamos con un un archivo `js` vacío. Lo llamaremos `hola.js`, esté será nuestro primer módulo. Lo único que hará este módulo es saludar:

```javascript
console.log('Hola!');
```

Tambien vamos a crear un archivo `js` que se llame `app.js`, en donde vamos a utilizar el código de `hola.js`. Dentro de `app.js` vamos a llamar a la función __require__ que es parte de las core libraries de Nodejs:

```javascript
require('./hola.js');
```

__Require__ recibe como argumento, un string que es el path en donde encontrará el código o el módulo que queremos agregar, en este caso como `hola.js` está en la misma carpeta el path es: `./hola.js`.

Ahora, si corremos el archivo `app.js` usando `node app.js` en la terminal vamos a ver que se ejecutó el código que escribimos en `hola.js`:

![require](./img/require.png)

Hagamos algo más interesante, vamos a `hola.js` y creemos una función y luego la usemos para saludar:

```javascript
var saludar = function() {
    console.log('Hola!!!');
}
saludar();
```

Corramos de nuevo `app.js`:

![require](./img/require2.png)

El resultado es el mismo!
Ahora, si no invocamos `saludar()` dentro de `hola.ja`, creen que la podremos invocar (usar) en `app.js`? Hagamos la prueba!

Comentamos la invocación en `hola.js`:
```javascript
var saludar = function() {
    console.log('Hola!!!');
}
//saludar();
```
Invacamos en `app.js`:
```javascript
require('./hola.js');
saludar();
```

Veamos el resultado:

![require-error](./img/requireerror.png)

saludar no está definido! recibimos un error. De hecho, esto está bien que suceda. Se acuerdan que dijimos que un módulo no debería afectar otro código accidentalmente? Eso quiere decir que el código está protegido y que no podemos simplemente usarlo y acceder a los objetos fuera de ese módulo.

![simply](./img/simply.jpg)

Para usarlo afuera, vamos a tener que explicitarlo, veamos como hacer que podamos usar `saludar()` desde `app.js`.

Nodejs nos permite hacerlo usando `module.exports`, que es una variable especial cuyo objetivo es pasar su contenido a otro pedazo de código cuando llamamos a `require`:

```javascript
var saludar = function() {
    console.log('Hola!!!');
};

module.exports = saludar;
```
Ahora este módulo está exponiendo el objeto `greet`. Para usarlo en nuestro módulo tenemos que guardar lo que devuelve `require` en una variable (puedo llamar a la nueva variable como quiera):

```javascript
var hola = require('./hola.js');

hola();
```

Ahora voy a poder invocar `hola()`, porque lo hemos pasado a través de `module.exports`. Si ejecuto `app.js`:

![require](./img/require3.png)

Ahora pudimos acceder al código de `hola.js`, porque lo expusimos a propósito.

Resumiendo:

- __Require__ es una función que recibe un _path_.
- __module.exports__ es lo que retorna la funcion _require_.

### Require con modulos Core o nativos

También podemos importar módulos CORE (los que hablamos al principio) usando _require_. Esta función está preparada para que si no encuentra un archivo con el nombre que le pasamos, busca una carpeta, y si no encuentra busca en los módulos nativos.
Podemos ir a la [documentación](https://nodejs.org/dist/latest-v6.x/docs/api/) y ver los módulos que podemos usar.

Veamos como podemos importar algo de esa funcionalidad. Como ejemplo vamos a importar el módulo llamado [`utilities`](https://nodejs.org/dist/latest-v6.x/docs/api/util.html), en la doc vemos que el módulo se llama `util`.
Por lo tanto lo vamos a importar escribiendo

```javascript
var util = require('util'); // No usamos ./ porque es un modulo core 

var nombre = 'Toni';
var saludo = util.format('Hola, %s', nombre);
util.log(saludo);
```

¿Que hace este código? Busquen en la [documentación](https://nodejs.org/dist/latest-v6.x/docs/api/util.html#util_util_format_format) por la función `format()` y `log()` e intenten predecir que hará ese código.

#### Algunos patrones de Require.

Como siempre en Nodejs, hay muchas formas de hacer lo mismo (esto puede ser bueno o malo - según cómo lo usemos) y crear módulos no es la excepción. Veamos algunos patrones comunes en la creacion de módulos!

##### Múltiples imports

La función _require_ busca primero un archivo con el nombre que le pasamos en la carpeta que le pasamos (de hecho no es necesario poner la extensión '.js'). Si no encuentra ese archivo, entonces busca una carpeta con ese nombre y busca un archivo `index.js` el cual importa. Esta funcionalidad la podemos para usar como patrón para importar varios archivos: dentro de `index.js` importamos los demás archivos.

Imaginemos que queremos hacer una función que salude en distintos idiomas, vamos a tener un `app.js` de esta forma:

```javascript
var saludos = require('./saludos');

saludos.english();
saludos.spanish();
```

Estamos importanto solamente el path `./saludos`, como no hay ningún archivo `.js` con ese nombre, _require_ busca una carpeta, por lo tanto vamos a crear una carpeta `saludos` con los siguientes archivos:

index.js
```javascript
var english = require('./english');
var spanish = require('./spanish');

module.exports = {
    english: english,
    spanish: spanish    
};
```

En este archivo estamos importando otros dos módulos, uno por cada idioma en el que queremos saludar. Lo bueno de esto, es que es va a ser muy fácil agregar y sacar idiomas de nuestra aplicación, ya que solo debemos agregar o borrar los idiomas que exportamos!

Ahora veamos como sería cada idioma:

spanish.js
```javascript
var saludos = require('./greetings.json');

var greet = function() {
    console.log(saludos.es);
}

module.exports = greet;
```
english.js
```javascript
var saludos = require('./greetings.json');

var greet = function() {
    console.log(saludos.en);
}

module.exports = greet;
```

y en greetings.json vamos a tener los saludos per se:

```javascript
{
    "en": "Hello",
    "es": "Hola"
}
```

Si ejecutamos nuestra `app.js`:

![patron](./img/patron.png)

##### Más Patrones

En la carpeta `./patrones/otro` hemos puesto varios files distintos llamados `saludos` que van del uno al cinco, y luego los importamos en el archivo `app.js`. En cada módulo exportamos lo que necesitamos de manera distinta, cada uno de esas formas constitute un patrón.

Dentro de cada archivo en los comentarios está explicado en más detalle el patrón.

De nuevo, __no hay una mejor forma, prueben todos los patrones y vean cual es el que les gusta y cual los hace felices!__


