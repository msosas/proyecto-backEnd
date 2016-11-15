# Beatles Page

## Routing

1. Con node crea un index en "/" donde le demos la bienvenida al usuario.

2. Utiliza este arreglo con los integrantes de los Beatles:

```javascript
var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"http://beatlephotoblog.com/photos/2013/05/132.jpg32.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"http://az616578.vo.msecnd.net/files/2016/03/09/635931448636931925-692833716_george-harrison-living-in-the-material-world-george-harrison-photo-credit-credit-robert-whitaker-c-apple-corps-ltd-courtesy-of-hbo.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]
```

3. Crea la ruta "/api" que muestre el arreglo completo

4. Ahora en la ruta "/api/John%20Lennon" deberiamos ver solo el objeto de John

5. Haz lo mismo con los otros beatles. ¿Podemos tener todo en una sóla ruta?.

> Pista: Pasando parámetros en las rutas.

6. Si el usuario no ingresa un Beatle valido (ej: /api/Banana%20pueyrredon) tiene que darle un error diciendo que la página no se encontró.

7. Ahora crea un nuevo template en el cual ingresaremos un profile page de cada beatle, el titulo de la pagina y un h1 tiene que dice el nombre, un parrafo con la fecha de nacimiento y una imagen con la profilePic.

8. Crea una ruta en la cual si ponemos el nombre del Beatle nos muestre su profil page ej. "profile/Paul%20McCartney".  NO PISES TU RUTA DE API NI DE ERROR

## MiddleWare

1. Usá el MiddleWare [`express.static`](https://expressjs.com/en/starter/static-files.html) para servir las imagénes de los Beatles en tu propio server.

2. Creá un MiddleWare que mandé un mensaje por consola cuando alguien ingresa a la ruta de tu Beatle favorito.

3. Creá un MiddleWare que cuente cuantas veces los usuarios entra a cada beatle y mostra el número por consola. Punto extra: Guardá ese dato en un archivo de texto mirando esta [guía](http://stackoverflow.com/questions/2496710/writing-files-in-node-js). Qué sucede con el contador si resetamos el server? Como hacemos para no perder el contador?

## Enviando Datos

1. Creá un formulario donde la gente pueda mandar su pregunta a los Beatles. Guardá los datos en un arreglo ( mejor en un archivo de texto ) y contesta diciendo que en algún momento algún beatle va a contestar.

2. Crea una ruta en donde puedas mandar datos tipo JSON y agregar un nuevo Beatle al grupo.

3. Terminaste? Fijate tu código esta muy desordenado? Te repetiste? Intenta refactorear tu codigo para que quede ordenado, intenta poner las tareas en funciones