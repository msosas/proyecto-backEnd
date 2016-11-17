# Bases de Datos

## Necesidad de una base datos

En algún momento nuestra aplicación va a necesitar algún tipo de _persistencia_ de datos, es decir que lo datos queden guardados en el disco, y no importa si reinicio el servidor, o modifico mi aplicación u otras cosas que puedan ocurrir.

Ya aprendimos que con `nodejs` es fácil leer y escribir archivos. Así que una forma de lograr persistencia sería escribir en archivos de texto en el disco, no? sí! pero eso __no escala__. Si lo hicieramos, nos veriamos enredados en buscar lo que queríamos dentro de cada archivo, y en poco tiempo buscar algo tardaría mucho, y nos dejaría de servir. Obviamente, si sólo tenemos que guardar cosas para luego leerlas después, este sistema nos puede servir, como por ejemplo: los logs de las páginas. Cada entrada es guardada como una línea en un archivo de texto.
Otra solución, más escalable para lograr persistencia de datos es usar una _base de datos_.

* __Base de datos__: Es una colección de datos de un mismo dominio y organizada sistemáticamente para su posterior uso. Esta organización, en general, está construida de tal manera que _modele_ el problema de la mejor forma.
* __DBMS__ (Database Management System): es una aplicación que interactua con el usuario, otras aplicación y la base de datos misma, de tal forma que pueda definir, crear, borrar, modificar, consultar y administrar bases de datos y datos en sí.

![DBMS](./img/Componentes_de_un_base_de_datos.jpg)


Lo que vamos a hacer entonces, es usar un _DBMS_ para que nos ayude a guardar los datos. Y como todo el mundo utiliza estas aplicaciones, ya hay escritas muchas librerías de nodejs para que nos sirven como interfaz y que son fáciles de usar.
Como se imaginan hay muchos sabores de BDMS para elegir. Lo primero es elegir si queremos uno que sea relacional (SQL) o uno no relacional (noSQL). Ahora vamos a empezar a ver como guardar datos en una base de datos no relacional, en particular `MongoDB`.

## MongoDB

MongoDB es una base de datos `open-source` no relacional de alta performance, y que puede escalar fácilmente.

Mongo es una base de datos basadas en documentos, cada documento es una estructura de datos que contiene varios pares key-values. Son muy similares a un objeto de javascript literal, o JSON:

```javascript
{
	nombre: 'Juan',
	edad:   25,
	estado: 'Inscripto',
	hobbies: ['futbol', 'videojuegos']
}
```

Las ventajas de usar una base de datos que tenga documentos como esta son:

* Los documentos tienen una notación que puede ser usada de forma nativa en lenguajes como Javascript, por lo tanto nos va a resultar fácil manejar los datos desde la aplicación.
* Cada documento contiene datos y estructura, es decir que podriamos guardar relaciones dentro de ellos de manera sencilla.
* Es la base de datos más usada para trabajar con Node, por lo tanto hay muchas librerías e información disponible.

> :pineapple: Para instalar MongoDb sigan las instrucciones para su sistema operativo [acá](https://docs.mongodb.com/manual/installation/).

Una vez instalado Mongo, vamos a levantar el servicio corriendo el comando `mongod`.
Ahora en otra consola, o sea sin cerrar el servicio que acabamos de levantar, vamos a entrar al `REPL` de mongo a través del comando `mongo`. Esta interfaz la vamos a usar para ver que está pasando con nuestros datos, mayormente pare debugear o guiarnos un poco, muy parecido a la consola de desarrolladores del browser.

Antes de empezar, definamos algunos conceptos básicos en mongo:

* _Documents_: Un documento es el registro mínimo que utiliza mongo, es la unidad básica de almacenamiento, ya hemos visto arriba la forma de un documento en Mongo.
* _Collection_: Es una colección de documentos, nos sirven para agrupar documentos que sean de la misma naturaleza, por ejemplo, podemos tener una colleción _Usuarios_ y cada documento tiene información de un _Usuario_.
* _Data Base_: Las colecciones están agrupadas dentro de una base de datos. Es la jerarquía más alta en mongo. Por ejemplo, podríamos tener distintas databases para cada aplicación que mantengamos en el mismo servidor Mongo.

### Comando básicos

Veamos algunos comandos básicos del Shell de mongo que nos van a ayudar. En la siguiente tabla vemos algunos métodos y comando y qué hacen:

|Métodos y comandos |Descripción |
|-------------------|------------|
|help	|Muestra la ayuda.|
|db.help()|Muestra la ayuda de los métodos de la base de datos.|
|db.<collection>.help()	| Muestra la ayuda de los métodos de las colleciones, <collection> puede ser existente o no.|
|show dbs	| Imprime una lista de todas las dbs en el servidor.|
|use <db>	| Selecciona a  <db> como la base de datos seleccionada. Si no existe, la crea.|
|show collections | Imprime la lista de colecciones de la base de datos seleccionada.|
|show users| Imprimi una lista de usuarios de la base de datos seleccionada.|
|show roles	|Imprime una lista de roles de la base de datos selecionada.|
|show profile|	Imprime las 5 operaciones más reciente que tardaron 1 milisegundo o más.|
|show databases	| Imprime una lista de todas las bases de datos disponibles.|
|load()	|Executa un archivo javascript.|

### CRUD ( Create, Read, Update, Delete)

Veamos como podemos hacer estas operaciones en mongo. Empezemos creando una nueva db llamada `test` con `use test`.
Dentro de ella vamos a insertar un alumno dentro de la colección `alumnos`.

```
db.alumnos.insert({nombre: 'Guille', curso: 'bootcamp'})
```

> La colección se crea automáticamente cuando ingresamos el primer registro (documento).

Si recibimos `WriteResult({ "nInserted" : 1 })` como output, entonces la operación fue existosa.
Bien, ahora veamos si realmente se escribió ese documento y está guardado, para hacerlo vamos a usar el método `find()`, si usamos esa función sin pasarle parámetros, entonces le resultado va a ser la lista de _todos_ los documentos de la colección.

```
db.alumnos.find()
```

Como output nos imprimió por pantalla lo siguiente:
`{ "_id" : ObjectId("57b7463020fe32edc8ec4ef5"), "nombre" : "Guille", "curso" : "bootcamp" }`, como vemos están los datos que habiamos guardado del alumno y además Mongodb le agregó un ID, que va a ser único para cada registro y que le va a ayudar a Mongo a buscar más rápidamente entre los registros.
Ahora probemos meter más alumnos, luego listar todos de nuevo, y finalmente buscar por alguna condición:

```
db.alumnos.insert({nombre: 'Guille', curso: 'bootcamp'})
db.alumnos.insert({nombre: 'Juan', curso: 'bootcamp'})
db.alumnos.insert({nombre: 'Santi', curso: 'codeRamp'})
db.alumnos.insert({nombre: 'Toni', curso: 'codeRamp'})
```

Hacemos un `find()` y obtenemos:
```
{ "_id" : ObjectId("57b7463020fe32edc8ec4ef5"), "nombre" : "Guille", "curso" : "bootcamp" }
{ "_id" : ObjectId("57b748ef20fe32edc8ec4ef6"), "nombre" : "Juan", "curso" : "bootcamp" }
{ "_id" : ObjectId("57b7490e20fe32edc8ec4ef7"), "nombre" : "Santi", "curso" : "codeRamp" }
{ "_id" : ObjectId("57b7491020fe32edc8ec4ef8"), "nombre" : "Toni", "curso" : "codeRamp" }
```

:+1: Joya! nos listó todos los que habiamos insertado. Ahora intentemos listar _sólo_ los alumnos del curso __codeRamp__. Para eso vamos a usar la misma función pero pasandole parámetros:
`db.alumnos.find({curso:'codeRamp'})`.

Output:
```
{ "_id" : ObjectId("57b7490e20fe32edc8ec4ef7"), "nombre" : "Santi", "curso" : "codeRamp" }
{ "_id" : ObjectId("57b7491020fe32edc8ec4ef8"), "nombre" : "Toni", "curso" : "codeRamp" }
```

:kissing_cat:

`db.alumnos.find({nombre:'Santi', curso:'codeRamp'})`

Output:
```
{ "_id" : ObjectId("57b7490e20fe32edc8ec4ef7"), "nombre" : "Santi", "curso" : "codeRamp" }
```

Como vemos, le pasamos a `find()`, las llaves y valores que queremos que tengan los documentos que buscamos y mongo se encargá de encontrarlos y listarlos para nosotros!.

Ahora intentemos _updatead_ un documento, para eso tenemos que seleccionar el o los documentos que queremos moficiar y también decir qué nuevos valores queremos que tenga. Vamos a usar la función `update()`, veamos un ejemplo:

Vamos a hacer que el alumno Juan (que estaba en el Bootcamp) pase al curso codeRamp: `db.alumnos.update({nombre:'Juan'},{curso:'codeRamp'})`.

Veamos el output de `find()`:

```
{ "_id" : ObjectId("57b7463020fe32edc8ec4ef5"), "nombre" : "Guille", "curso" : "bootcamp" }
{ "_id" : ObjectId("57b748ef20fe32edc8ec4ef6"), "curso" : "codeRamp" }
{ "_id" : ObjectId("57b7490e20fe32edc8ec4ef7"), "nombre" : "Santi", "curso" : "codeRamp" }
{ "_id" : ObjectId("57b7491020fe32edc8ec4ef8"), "nombre" : "Toni", "curso" : "codeRamp" }
```

Como vemos, se hicieron los cambios en documento donde estaba _Guille_, pero se perdió su nombre. Esto es porque el `update` por defecto reemplaza el documento por lo que le estamos pasando, veamos como cambiar ese comportamiento. Para eso, vamos a pasar un objeto que tenga la propiedad `$set` y en ella lo que queremos agregar al documento, si ya existia una propiedad va a sobreescribila:
`db.alumnos.update({nombre:'Santi'},{$set: {curso:'BOOTCAMP'}})`

Output de `db.alumnos.find()`:
```
{ "_id" : ObjectId("57b7463020fe32edc8ec4ef5"), "nombre" : "Guille", "curso" : "bootcamp" }
{ "_id" : ObjectId("57b748ef20fe32edc8ec4ef6"), "curso" : "codeRamp" }
{ "_id" : ObjectId("57b7490e20fe32edc8ec4ef7"), "nombre" : "Santi", "curso" : "BOOTCAMP" }
{ "_id" : ObjectId("57b7491020fe32edc8ec4ef8"), "nombre" : "Toni", "curso" : "codeRamp" }
```

Como vemos, ahora sí hicimos que el alumnos `Santi` pase del codeRamp al Bootcamp! :smile:

Por último, para borrar tenemos que usar la función `remove()` y le pasamos un objeto de búsqueda, todo lo que encuentre con esos valores será ~~DESTRUIDO~~ borrado. Probemos: `db.alumnos.remove({curso:'codeRamp'})`

Output:
```
WriteResult({ "nRemoved" : 2 })

--> db.alumnos.find()
{ "_id" : ObjectId("57b7463020fe32edc8ec4ef5"), "nombre" : "Guille", "curso" : "bootcamp" }
{ "_id" : ObjectId("57b7490e20fe32edc8ec4ef7"), "nombre" : "Santi", "curso" : "BOOTCAMP" }
```

:+1: Genial! se borrarón dos registros y sólo quedaron los alumnos que _NO_ iban al `codeRamp`.


Ahora veamos como interactuar con Mongo, pero no desde el `mongo shell` si no desde `Node`.


## Mongoose

Podemos interactuar con mongo desde Node, pero deberíamos codear nuestra propia herramienta para hacerlo, ya que nos tenemos que conectar a través del SO, o sea deberíamos trabajar con código de bajo nivel. Pero como nos podemos imaginar, alquien ya hizo ese trabajo por nosotros! Vamos a ver una herramienta llamada 'mongoose'.
mongoose es una herramienta (librería), que podemos bajar de `npm` y que está hecha para interactuar con `mongo` de una manera intuitiva. No es la única librería que existe para hacer esto, pero es una de las más utilizadas.

### Instalación y pruebas

Vamos a empezar por instalar _mongoose_ (en su proyecto ya creado o en uno nuevo), haciendo `npm --install mongoose`. Ahora veamos como hacer una pequeña prueba desde javascript, para eso vamos a crear un nuevo archivo `pruebamon.js`, dentro de ese archivo vamos a agregar una serie de alumnos en nuestra base de datos de Mongo:

```javascript
var mongoose = require('mongoose'); // Importamos el módulo Mongoose.
mongoose.connect("mongodb://localhost/alumnos") // Connect se conecta a la bd
												//tenemos que especificar en qué host está y que base de datos queremos, en este caso alumnos. Si no existe la crea.

var alumnoModel = new mongoose.Schema({	// Antes de poder escribir en la DB, tenemos que especificar un modelo
	nombre: String,						// para los datos, explicaremos esto más adelante en detalle
	edad: Number,						// Básicamente, decime el nombre y el tipo de datos que vamos a necesitar
	interfaz: String
	});

var Alumno = mongoose.model('alumno', alumnoModel); // Creamos una clase Alumno basado en el modelo que definimos
													// este objeto va a tener todo el comportamiento de mongoose

//Creamos un alumno usando la clase Alumno

var monica = new  Alumno({
			nombre: 'Monica',
		 	edad: 24,
		 	interfaz: 'moongose'
		});

var ayelen = new Alumno({
			nombre: 'Ayelén',
		 	edad: 21,
		 	interfaz: 'moongose'
		});

monica.save();  // Monica es clase alumno, que hereda el metodo save de mongoose
				// Este método nos deja guardar en la base de datos.

ayelen.save( (err, result) =>{  // save tambien puede recibir un callback para poder ver si se guarda bien
	if(err){					// o bien hacer algo cuando termine
		console.log(err);		// este patrón va a aparece mucho en mongoose
	}else{				`		// por ejemplo con .find() o .delete(), todas reciben un callback.
	console.log(result);
	}
});

//Ahora imprimamos por pantalla todos los alumnos que hay en la bd
Alumno.find({}, function(err, alumnos){
	if(err){
		console.log('hubo un error!');
	}else{
		console.log(alumnos);
	}
})
```
### Modelos

Como vimos en el ejemplo, en Moongoose tenemos que definir un `Schema`, que luego usaremos para crear nuestro `model` que finalmente va a ser el objeto que tiene toda la funcionalidad de mongoose, y cuyas instancias  van a ser los _documentos_ que terminen guardados en __Monogo__.
Seguramente se harán la pregunta de por qué hay schemas, si supuestamente `mongodb` era schemaless (o que no teníamos que definir una estructura antes de guardar datos). Si bien esto es cierto, a los desarrolladores en general les sirve tener algún tipo de esquema definido de cómo quieren que sean los objetos que trabajan y que finalmente se guardan en la bd, al tener un esquema bajamos las posibilidades que algún dato que no queremos se escriba en la BD. Por ejemplo, en el campo DNI llega un string con palabras, si tuvieramos definido un esquema diciendo que es tipo `entero` ese string nunca llegaría a la base de datos. De hecho, podemos especificar con bastante detalle cómo queremos que sean los datos:

```javascript
var personSchema = new Schema({
    name: { type: String, required: true },
    age: Number,
    sex: { type: String, enum: ["M","F"] },
    country: { type: String, default: "Argentina" }
});
```

En el ejemplo de arriba estamos diciendo:

	* name: Es tipo String y no puede ser nulo.
	* age: es de tipo entero.
	* sex: Es tipo string y sólo puede tomar los valores "M" y "F"/
	* country:  Es tipo String y si no lo declaramos toda el valor por defecto "Argentina".

Existen todavía más restricciones o `constrains` que les podemos poder a nuestros schemas, podemos ver todo en la [documentación de mongoose](http://mongoosejs.com/docs/guide.html).

De todas formas, mongoose ofrece la funcionalidad de trabajar `schemaless`, para eso hay que declarar que un schema no es _estricto_ con el keyword `strict` seteado en false:

```javascript
var personSchema = new Schema({ },{ "strict": false });
Persona =  mongoose.model( "Person", personSchema );
```

### CRUD ( Create, Read, Update, Delete) en Mongoose

En Mongoose, los _documentos_ son instancias de los _modelos_, crearlos y guardarlos es fácil:

```javascript
var santi = new Persona({ name: 'Santi', age : 29  });
santi.save(function (err) {
  if (err) return handleError(err);
  // Guardado!
})

// O

Persona.create({ name: 'Santi', age: 29 }, function (err, persona) {
  if (err) return handleError(err);
  // Guardado!
})
```

Para buscar, Mongoose nos ofrece varios sabores, vamos a usar una función distinta según si queremos buscar múltiples valores o un sólo registro:

```javascript
// Busca  Personas con nombre 'Ghost' y trae los campos _name_ y _age_
Persona.findOne({ 'name': 'Ghost' }, 'name age', function (err, person) {
  if (err) return handleError(err);
  console.log(person.name) 
})

//Busca una persona con nombre Ghost
Persona.findOne({ name: 'Ghost' }, function (err, person) {});

//Podemos Buscar por ID tambien
Persona.findById(id, function (err, person) {});
```

> En realidad esta no es la única forma de hacer queries con Mongoose, hay todo un capítulo en la documentacion [acá](http://mongoosejs.com/docs/queries.html)

Para eliminar un _documento_ vamos a usar un método que tienen los modelos llamado `remove()`, el cual elimina todos los documentos que matcheen con las condiciones que les pasamos:

```javascript
Persona.remove({ age: 29 }, function (err) {
  if (err) return handleError(err);
  // removed!
});
```

Para modificar un registro la sintaxis es muy parecida a la del Mongo CLI, vamos a usar la función `update`, y vamos a pasarle un query y lo que queremos modificar:

```javascript
Persona.update({ age: { $gt: 30 } }, { viejo: true }, fn);
```

Aca vamos a agregarle una variable booleana 'viejo' a todos las Personas que sean mayores de treinta. :smile:

> Para poder hacer queries específicas y usar operados más generales, como por ejemplo el _greater than_ vamos a referirnos a la documentación de __Mongo__ sobre el tema, [acá](https://docs.mongodb.com/getting-started/shell/query/) la podemos ver.


## Bases de Datos Relacionales

Como habiamos visto, la alternativa a las bases de datos `NoSQL` son las bases de datos relacionales. En estas bases de datos la tablas tienen (no es obligatorio pero fuertemente recomendado) que estar normalizadas (3era forma normal). Y antes de empezar a cargar datos, tenemos que definir el modelo de datos de manera detallada, como en mongoose pero obligatoriamente!

Las ventajas de usar una base de datos SQL son:

* Cómo nos obliga a definir un modelo de antemano, la aplicación va a ser muy estable y dificilmente llegué un dato no deseado a la BD. El problema es que es poco flexible y hacer cambios una vez arrancado el proyecto puede ser muy costoso.
* Estás bases de datos son transaccionales, es decir que el motor de DB nos asegura que las operaciones que hagamos van a hacerse atómicamente, es decir que jamás vamos a tener datos corruptos.
* Es una tecnología muy estudiada, hace años que ya está estable, en contrapartida con las bases de datos NoSQL que son relativamente nuevas.

## PostgreSQL

Como en todo en este mundo, hay muchas opciones de bases de datos SQL. De hecho las hay pagas y gratis. Podríamos usar: MySQL, ORACLE, IBM DB2, SQL server, access, etc.
Todas utilizan el lenguaje SQL, asi que son muy parecidas, el 80% de las cosas se puede hacer con cualquier motor. Nosotros vamos a ver en nuestro ejemplo PostgreSQL, que es una motor gratis de código abierto que tiene una comunidad muy activa. De hecho, postgre logra sacar funcionalidades antes que los motores pagos!

> :pineapple: Para instalar Postgre sigan las instrucciones para su sistema operativo [acá](https://www.postgresql.org/download/).

### SQL

Como dijimos, vamos a interactuar con la base de datos a través de SQL. Este es un lenguaje especialmente diseñado para hacer consultas a las bases de datos relacionales. SQL es el acrónimo de Structured Query Language y es un standart mantenido por el ANSI (American National Standards Institute).
Usando SQL vamos a poder crear tablas, buscar datos, insertar filas, borrarlas, etc..

### Creando una BD y una tabla

Lo primero que tenemos que hacer es crear una base de datos (la analogía con mongo es una colección). Para eso vamos a usar el Statement `Create database`.

```sql
CREATE DATABASE prueba;
```
![psql](./img/psql.png)

> Cada Statement SQL termina en ; (punto y coma). En algunas interfaces es obligatorio.

Una vez ejecutado el comando vamos a ver listada la nueva base de datos, yo esoy usando la interfaz CLI de posgre, también pueden usar alguna interfaz gráfica.

Ahora vamos a crear una tabla. Usamos el statement `CREATE TABLE` que tiene la siguiente forma:

```
CREATE TABLE table_name
(
column_name1 data_type(size),
column_name2 data_type(size),
column_name3 data_type(size),
....
);
```

Es muy parecido a cómo definimos un schema en mongoose, no? Sí, es muy probable que mongoose se haya inspirado en esta forma de trabajar. Básicamente ponemos el nombre de la columna y luego el tipo de datos de esa columna. Podemos ver algunos tipos de datos comunes [aquí](http://www.techonthenet.com/postgresql/datatypes.php). También vamos a poder agregar [CONSTRAINS](http://www.tutorialspoint.com/postgresql/postgresql_constraints.htm) o restricciones por ejemplo:

``` sql
CREATE TABLE ciudades
(
	id serial PRIMARY KEY,
	nombre varchar(255) UNIQUE
);

CREATE TABLE personas
(
	id serial PRIMARY KEY,
	apellido varchar(255) NOT NULL,
	nombre varchar(255) UNIQUE,
	ciudad integer references ciudades (id)
);
```

Con este statement hemos creado dos tablas. La primera es ciudad, que cuenta con ID que tiene la constraint que es PRIMARY KEY, es decir que tiene que ser única y no puede ser nula, y ademas tiene una columna nombre que es de tipo texto (varchar) y tiene la constraint `UNIQUE`, por lo tanto no puede haber dos iguales en la misma tabla.

La segunda es la tabla personas, vemos que tambien tenemos un id que es `PRIMARY KEY` (esta práctica es muy común y muy recomendable), tenemos nombre y apellido, con la condicción que nombre no se repita (es sólo para el ejemplo) y pusimos una columna que se llama ciudad, que hace referencia a un `ID` de la tabla _ciudades_. Esto último denota una _relación_ entre las tablas, y lo hicimos de esta forma para respetar la normalización y de esa forma reducir el tamaño final de la base de datos. Más adelante veremos como hacer queries y obtener los datos de una relación.

Ahora agregamos algunos datos en las tablas. Tenemos que empezar por ciudades, ya que para cargar una persona luego (y mantener la __integridad referencial__) vamos a tener que tener algunas ciudades y sus ids.
Para insertar datos vamos a usar el statement `INSERT INTO`:

```sql
INSERT INTO table_name (column1,column2,column3,...)
VALUES (value1,value2,value3,...);
```
Insertemos tres ciudades:

```sql
INSERT INTO ciudades (nombre)
VALUES ('Tucuman');

INSERT INTO ciudades (nombre)
VALUES ('Buenos Aires');

INSERT INTO ciudades (nombre)
VALUES ('New York');
```

> El tipo de datos SERIAL (el id) es un entero AUTOINCREMENTAL, es decir que no tengo que especificar el ID, si no que se va generando solo. El primero es 1, el segundo 2 y así sucesivamente.

Perfecto ahora tenemos ciudades!
Insertemos algunas personas que sean de esas ciudades!

```sql
INSERT INTO personas (nombre, apellido, ciudad)
VALUES ('Toni', 'Tralice', 1);

INSERT INTO personas (nombre, apellido, ciudad)
VALUES ('Guille', 'Aszyn', 3);

INSERT INTO personas (nombre, apellido, ciudad)
VALUES ('Santi', 'Scanlan', 2);
```

:smile:
Ahora tenemos tablas con datos, pero cómo los consultamos?

#### SELECT, WHERE, ORDER BY

Para recuperar datos usamos el statement `SELECT` de esta forma:

```
SELECT column_name,column_name
FROM table_name;
```

Para recuperar todas las personas:

```sql
SELECT * FROM personas;
```

y todas las ciudades:

```sql
SELECT * FROM ciudades;
```

![resultado](./img/tablas.png)

> El asterisco quiere decir 'todas las columnas'.

Genial, esto sería equivalente al `db.prueba.find()` de mongo!
Las filas en SQL no tiene un orden dado, ni siquiere por el orden en el que fueron creadas (muchas veces coincide pero no es necesariamente así), asi que si queremos tener los resultados ordenados vamos a usar la cláusla `ORDER BY`, esta va al final del query y le especificamos en qué columna se tiene que fijar para ordenar:

```sql
SELECT * FROM ciudades
ORDER BY nombre;
```

El motor se da cuenta el tipo de datos de la columna y los ordena en base a eso. también podemos especificar que ordene por más de un campo, y si queremos que sea en orden ascendente o descendiente:

```sql
SELECT * FROM ciudades
ORDER BY nombre, id DESC;
```

Ahora veamos como buscar o filtrar filas: para eso vamos a usar la claúsula `WHERE`:

```sql
SELECT column_name,column_name
FROM table_name
WHERE column_name operator value;
```

Por ejemplo, busquemos todas las personas que se llaman 'Toni':

```sql
SELECT * FROM personas
WHERE nombre = 'Toni';
```

Casi que podemos leerlo en lenguaje natural: 'Seleccioná todas las columnas de la tabla personas donde el nombre sea Toni'. :smile:

Podemos agregar más de una condicion:

```sql
SELECT * FROM personas
WHERE nombre = 'Toni'
AND apellido = 'Tralice';
```

Ahora, si vemos el output de consultar la tabla 'personas', vemos que tenemos el _código_ de ciudad, pero no el nombre. Y probablemente en nuestra aplicación querramos mostrar el nombre y no el código, no?
Bien, entonces para hacerlo podríamos consultar ambas tablas, y luego buscar el código de cada fila de _personas_ en la tabla _ciudades_. De esa forma tendriamos el nombre asociado... por suerte SQL ya viene preparado para eso! con el statement `JOIN`.

#### JOINS

La cláusula `JOIN` nos sirve para combinar filas de una tabla con otras de otra tabla, basándonos en un campo que tengan en común. Es el caso de ciudad y personas, vamos a unir las filas de cada tabla basados en el ID de la ciudad.

Para definir un JOIN tenemos que decis qué tablas queremos unir y en base a qué campos, para lo primero ponemos el nombre de la tabla a unir después del `JOIN` y  lo segundo lo hacemos con el parámetro `ON`:

```sql
SELECT * FROM personas
JOIN ciudades 
	ON ciudades.id = personas.ciudad;
```

Básicamente estamos diciendo: 'Seleccioná todas las columnas de la tabla personas y uní todas las filas con la tabla ciudades donde el id de ciudades sea igual al campo ciudad de personas.'.

El resultado:

![joindeTablas](./img/jointablas.png)

Podemos reescribir la consulta de esta forma:

```sql
SELECT p.nombre, p.apellido, c.nombre FROM personas p
JOIN ciudades  c
	ON c.id = p.ciudad;
```

Ahora sólo pedimos el nombre, apellido de las personas y el nombre de la ciudad. Como `nombre` está en las dos tablas, tenemos que especificar de qué tabla es la columna. Para no escribir todo el nombre completo, podemos definir un ALIAS en la consulta, en esta caso a __personas__ le dimos el alias `p` y a __ciudades__ el alias `c`.

![TablaconJoin2](./img/jointabla2.png)

Según el tipo de union que queremos hacer vamos a usar alguno de estos tipos de `JOINS`:

![JOINS](./img/SQL_Joins.png)

> Los joins pueden ser operaciones muy costosas, de hecho, las bases de datos no relacionales suelen ser tan performantes porque esquivan los JOINS, logran ser más rápidas, pero ocupando más espacio.

## ORM

Un problema con las bases de datos relacionales ( puede ser un gran problema en proyectos complejos ) es que las cosas que guardamos en ella no mapean uno a uno a los objetos que tenemos en nuestra aplicación. De hecho, es probable que en nuestra App tengamos la clase _persona_, pero dificilmente tengamos la clase _ciudad_ y que ambas estén relacionadas. Simplemente tendríamos una propiedad _ciudad_ dentro de _persona_.
Por lo tanto vamos a necesitar alguna capa de abstracción que nos oculte la complejidad de las tablas y sus relaciones y nosotros sólo veamos objetos desde la app. Para eso existen los __ORM__ (Object relation mapping), que son librerías o frameworks que hacen este trabajo por nosotros. Sería lo mismo que `mongoose`, pero un poco al revés!

### SEQUELIZE

Obviamente existen un montón de ORMs (de estos de verdad hay miles porque se vienen usando hace mucho). Nosotros vamos a utilizar `sequelize`, en particular. Este es un ORM para nodejs que soporta varios motores de bases de datos:

* PostgreSQL
* MySQL
* MariaDB
* SQLite
* MSSQL (Microsoft)

Por supuesto que ustedes deben probar y jugar con varios de ellos hasta que encuentren alguno que se acomode a su filosofía de programación, no hay _uno_ que sea el mejor de todos.

> Hay otras librerías que no llegan a ser ORMs pero nos ayudan a hacer queries a la base de datos, si les gusta tener el control al 100% de su base de datos le recomiendo probar con algunos de estos, por ejemplo: [MassiveJS](https://github.com/robconery/massive-js)

#### Instalación

Como `sequelize` soporta varias bases de datos, vamos a necesitar primero instalar el módulo de `sequelize` per ser, y luego el módulo del conector a la base de datos que vayamos a usar. `sequelize` hace uso de estos últimos para conectarse a la base de datos.

```
$ npm install --save sequelize

# y uno de los siguientes
$ npm install --save pg pg-hstore
$ npm install --save mysql // Para MySQL y MariaDB
$ npm install --save sqlite3
$ npm install --save tedious // MSSQL
```

Igual que con Mongoose, primero vamos a importar el módulo y vamos a crear un objeto `Sequelize` pasandole como parámetro la string que indica a qué base de datos conectarse, con qué usuario y qué password:

```javascript
var Sequelize = require("sequelize"); //requerimos el modulo
var sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');
```

#### Modelos

Sequelize es muy parecido a Mongoose, primero vamos a tener que definir un modelo (las constrains y tipos de datos puedem difereir, pero el concepto es el mismo), los modelos se definen de la forma: `sequelize.define('name', {attributes}, {options}).`, veamos un ejemplo:

```javascript
var User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name' //el nombre en la base de datos va a ser first_name
  },
  lastName: {
    type: Sequelize.STRING
  }
});

User.sync({force: true}).then(function () { //tenemos que usar este método porque 
  // Tabla creadas 							// antes de guardar datos en las tablas
  return User.create({						// estas tienen que estar definidas
    firstName: 'Guille',
    lastName: 'Aszyn'
  });
});
```

A diferencia de Mongoose, con sequelize vamos a tener que preocuparnos un poco por las tablas que haya en nuestra base de datos, ya que sin no hay tablas creadas, no vamosa poder guardar datos ( en mongodb nos creaba las colecciones solo, y no importaba la estructura para guardar documentos). Por eso usamos el método `sync()` que justamente sincroniza el modelo que tenemos en nuestra app con la BD (crea la tabla en la db si no existe), como vemos puede recibir un _callback_, en el cual usamos el método `create()` para crear un nuevo user y guardarlo en la tabla. Podemos ver más métodos y cómo funcionan en la [Documentación](http://sequelize.readthedocs.io/en/latest/api/model/).

> Fijense que en Sequelize para pasar un callback lo hacemos en la función `.then()`, eso es una promesa, por ahora usenlo como una callback normal, más adelante las veremos en detalle.

### CRUD ( Create, Read, Update, Delete)

Para insertar datos en la base de datos, vamos a usar la función [create()](http://sequelize.readthedocs.io/en/latest/api/model/#createvalues-options-promiseinstance), que báscicamente lo que hace es crear una nueva instacia del modelo y lo guarda en la base de datos:

```javascript
User.create({
  firstName: 'Juan',
  lastName: 'Prueba'
}).then(function(user) {
  console.log(user);
})
```

La función `create()` en realidad, encapsula dos comportamiento, como dijimos arriba: instanciar el modelo  y guardar en la bd. De hecho, podríamos hacer ambas cosas por separado, usando la función `build()` y `save()`:

```javascript
var user = User.build({
  firstName: 'Juan',
  lastName: 'Prueba'
})

user.save().then(function(user) {
  console.log(user);
})
```

Para buscar registros usamos la función [find](http://sequelize.readthedocs.io/en/latest/api/model/#findalloptions-promisearrayinstance), que viene en distintos sabores: [`findAll()`](http://sequelize.readthedocs.io/en/latest/docs/models-usage/#findall-search-for-multiple-elements-in-the-database): Sirve para buscar múltiples registros, `findOne()`: sirve para buscar un sólo registro y `findByID()`: es igual a _findOne()_ pero podemos buscar sólo por el ID del registro.

```javscript
User.findAll({ where: ["id > ?", 25] }).then(function(users) {
  console.log(users)   //busca TODOS los usuarios
});

User.findOne({
  where: {firsname: 'Toni'},
  attributes: ['id', ['firstname', 'lastname']]
}).then(function(user) {
  console.log(user)
});

User.findbyId(2).then(function(user) {
  console.log(user)   //El user con ID 2
});
```
> Las búsquedas pueden ser más complejas que en Mongo, por la naturaleza de las relaciones, por lo tanto es importante que leamos bien la [documentación](http://sequelize.readthedocs.io/en/latest/docs/models-usage/#data-retrieval-finders).

Para modificar un registro, o varios, tenemos que pasarle los nuevos atributos que queremos modificar, y además una condición de búsqueda, en este caso voy a cambiarle el nombre a todos los registros que tengan `id` =1 (sólo puede haber uno :smile: ):

```javascript
User.update({
  firstname: 'Martin' ,
}, {
  where: {
    id: '1'
  }
});
```

Para borrar un registro, vamos a usar el método `destroy()`, que tambien recibe un parámetro de búsqueda, en el ejemplo vamos a borrar todos los registros que tengan id 1, 2 ,3 o 4:

```javascript
User.destroy(
	{ where: { id: [1,2,3,4] }
	});
```