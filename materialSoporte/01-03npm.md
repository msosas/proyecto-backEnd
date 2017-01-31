# ¿Qué es un gestor de paquetes?

Primero definamos lo que es un paquete. Básicamente es.. `código`! Es cualquier pieza de **código** manejada y mantenida por un gestor de paquetes.

Ahora, un gestor de paquetes es un software que automatiza la instalación y actualización de paquetes. Maneja qué version de los paquetes tenes o necesitas y maneja sus _dependencias_. Una **dependencia** es código del cual dependen uno o más pedazos de código para funcionar. Por ejemplo, si usás `fs` en tu servidor, entonces `fs` es una dependecia de tu server. Sin el código de `fs` tu servidor no podría ejecutarse. De hecho, cada paquete podría tener sus propias dependecias, es por esto que manejarlos a mano se podría volver un poco engorroso, por suerte tenemos los gestores de paquetes que nos solucionan este problema.

## NPM: Node Package Manager

Npm es el gestor de paquetes que viene con Nodejs y que gestiona los paquetes para este. Para probar si tenés npm podés hacer `npm -v` en tu consola, y si recibis algo como esto: `3.10.5` quiere decir que lo tenés instalado.

Para ver el registro de paquetes podés ir a [esta](https://www.npmjs.com/) página. Acá podés buscar paquetes individuales, ver su información y bajarlos. Cualquiera puede subir sus paquetes en npm, así que tenés que tener cuidado con qué paquetes bajar.

Para instalar un paquete se utiliza el comando `npm` con el argumento `install` y el nombre del paquete. Por ejemplo, para instalar el paquete 'express' vamos a la consola y tipeamos: `npm install express`.

Para poder trackear las dependencias y los paquetes que tenemos instalados, npm hace uso de un archivo de _configuración_ al que llama **package.json**. Este es básicamente un archivo de texto en formato JSON con el listado de dependencias de tu aplicación, de esta forma con sólo compartir ese archivo cualquiera sabrá qué paquetes se deben instalar, e incluso hacerlo de forma automática.

Para crear este archivo npm nos da el comando `npm init`, que es una forma interactiva de crear el 'package.json'.

![Npm-Init](./img/npmInit.png)

* entry point: Indica cúal es el archivo javascript que Node debe correr para arrancar la aplicación.

En la imagen vemos los datos que nos piden y a continuación vemos el archivo `package.json` que creó el comando:

```javascript
{
  "name": "test-app",
  "version": "1.0.0",
  "description": "Esta es una aplicación de prueba",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "Prueba"
  ],
  "author": "Toni Tralice",
  "license": "ISC"
}
```

Para que veamos como funcionan las dependencias, vamos a instalar algunos paquetes y requerirlos dentro de nuestra aplicación de prueba.

_Los paquetes instalados de forma local serán guardados en una carpeta llamada **node\_modules** creada dentro de la carpeta donde ejecuté el comando_

#### [moment](https://www.npmjs.com/package/moment)

Es una librería de javascript para manejar fechas.
Para instalarlo hacemos: `npm install moment --save`.

__usamos el argumento `--save` para indicar a npm que además de instalar el paquete, lo agregue a la lista de dependencias en el archivo `package.json`.__

Luego de ejecutar el comando, vemos que en `package.json` hay una nueva propiedad llamada 'dependecies' que es un objeto que contiene los nombres y las versiones de los paquetes que hemos instalado (siempre que instalemos usando __--save__).

```javascript
{
  "name": "test-app",
  "version": "1.0.0",
  "description": "Esta es una aplicación de prueba",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "Prueba"
  ],
  "author": "Toni Tralice",
  "license": "ISC",
  "dependencies": {
    "moment": "^2.14.1"
  }
}
```

Ahora creamos un archivo llamado `index.js` (el entry point de nuesta app), y dentro de él vamos a incorporar el nuevo módulo instalado.

```jasvascript
var moment = require('moment');
console.log(moment().format("ddd/MM/YYYY, hA"));
```

Como verán, nodejs ya sabe en qué carpetas buscar el módulo 'moment' y no tenemos que explicitarlo diciendo en qué carpeta está, de la forma './node_modulos/moment'.
### NPM paquete globales

Con lo anterior hemos instalado el paquete 'moment' al que podremos acceder desde la aplicación test. Ahora vamos a ver que hay paquetes de npm que nos son útiles en todas las aplicaciones que hacemos, por lo tanto los queremos instalar de manera _global_.
Para hacerlos usamos el argumento `-g` en `npm install`.

_Según el sistema operativo pueden llegar a tener algún problema con permisos, si es el caso pueden buscar soluciones en [esta página](https://docs.npmjs.com/getting-started/fixing-npm-permissions). La carpeta donde se instalan los módulo globales también dependen del SO._

### Nodemon

Se acuerdan cuando hicimos el servidor web con Node? Cada vez que cambiamos algo en el código, teníamos que reiniciar el servidor para que los cambios sean reflejados. Con _Nodemon_ podemos olvidarnos de eso, ya que hace eso por nosotros.

```
nodemon will watch the files in the directory in which nodemon was
started, and if any files change, nodemon will automatically
restart your node application.
```

Como verán este es un paquete que vamos a usar en casi todos los proyectos de node que hagamos, por lo tanto es un buen ejemplo de algo que instalariamos globalmente. Para hacerlo hacemos:

`npm install -g nodemon`

o 

`sudo npm install -g nodemon` en Linux o Mac.

Una vez instalado globalmente, puedo simplemente utilizarlo desde la línea de comandos, ya que viene con una interfaz CLI (_command line interface_). De hecho, varios paquetes de npm vienen con una interfaz CLI para ser usados desde la consola o terminal.

En nuestro ejemplo al ejecutar `nodemon` obtenemos:

```
[nodemon] 1.10.0
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node index.js`
Sun/07/2016, 11PM
[nodemon] clean exit - waiting for changes before restart
```

Para probar si funciona, hagamos un cambio en el archivo `index.js` y salvemos. Para mi ejemplo voy a agregar un `console.log()`.

```
var moment = require('moment');
console.log('Salgo en la consola!!');
console.log(moment().format("ddd/MM/YYYY, hA"));
```
![Npm-Init](./img/npmnodemon.png)

Como vemos, no fue necesario volver a correr el archivo `index.js` a mano para ver los cambios, Nodemon hizo todo el trabajo por nosotros!

## Actualizar paquetes

Como dijimos, `npm` también nos sirve para mantener actualizados los paquetes. Para hacerlo sólo tenemos que escribir el siguiente comando:

`npm update`

Para mantener la compatibilidad con las aplicaciones, `npm` sólo actualiza automáticamente los _patches_ y _minor changes_ ([Semantic Versioning](http://semver.org/))de un paquete, por defecto.

De hecho, el **^** antes del número de versión en 'dependencies' indica qué puede actualizar los _minors_ automáticamente, si quisieramos restringir ese comportamiento para que actualize sólo los _patches_ deberíamos usar el carácter **~** antes de la versión: 

```javascript
"dependencies": {
    "moment": "^2.14.1" //Actualiza sólo Minors
  }

"dependencies": {
    "moment": "~2.14.1" //Actualiza sólo Patches
  }
```