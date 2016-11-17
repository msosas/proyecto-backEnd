# Templating Engines

1. Reemplazá todas las vistas del ejercicio de los Beatles para que use EJS como templating engine:

* Profile
* Form

2. Creá una nueva ruta '/todos' y creá un template donde muestre el profile de todos los beatles juntos.

> Para el ejercicio dos vas a tener que usar un lazo de EJS.

3. Pensá la forma de hacer qu elos profiles se distribuyan de dos en dos. Es decir, un row contiene dos profiles.

> Para esto vas a necesitar usar condicionales. Pensá bien en qué momento vas a tener que abrir y cerrar el div del row.

4. Agregá un link a la página de wikipedia de cada Beatle en su perfil. Acá tenes los links:

```javascript
var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"http://beatlephotoblog.com/photos/2013/05/132.jpg32.jpg",
  wiki: 'https://en.wikipedia.org/wiki/Lennon'
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg",
  wiki: 'https://en.wikipedia.org/wiki/Paul_McCartney'
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"http://az616578.vo.msecnd.net/files/2016/03/09/635931448636931925-692833716_george-harrison-living-in-the-material-world-george-harrison-photo-credit-credit-robert-whitaker-c-apple-corps-ltd-courtesy-of-hbo.jpg",
  wiki: 'https://en.wikipedia.org/wiki/George_Harrison'
}
]
```

5. Dentro del container, agregá un <h1> al final. Qué pasa si sacamos un beatle (digamos que Ringo) ? Donde queda ese h1? Cambiá un condicional para que la página siga quedando bien *.

> *: Según como hayas hecho el ejericio el punto cinco puede no tener sentido :D.