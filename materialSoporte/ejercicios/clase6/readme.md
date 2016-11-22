# Beatles Page MongoDB

## Pasar todo a Mongodb

Vamos a pasar todo lo que sea datos afuera de NodeJS y lo vamos a guarda en Mongo.

1. Diseña todos los Schemas que vas a necesitar. Guardalos en un archivo que se llame `models.js`. Empezá por el arreglo de los beatles, luego el de contar visitas y preguntas. Pensá bien como van a ser sus `Schemas` antes de empezar a codear.
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

2. Agregá una nueva ruta DELETE en la que puedas remover un Beatle de tu coleccion por su nombre. ej: `DELETE /api/George%20Harrison` -> Remueve a George de los Beatles.
3. Agregá un MiddleWare que guarda un documento nuevo en una coleccion llamada `log`. Cada documento deberá tener información sobre el request que se hizo a tu server. Fijate [acá](http://expressjs.com/en/api.html#req) toda la info que ya tenés en `req`.