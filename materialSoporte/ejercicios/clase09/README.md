## Testing

Usando `mocha` y `chai` completá el código de todas las funciones de tal forma que todos los tests pasen:

```javascript
var chai = require('chai');

function multiplicaPorDos(array) {
    // Retorna todos los elementos del arreglo multiplicados por dos
}

function EmpiezaConS(array){
    // Retorna un arreglo solamente con palabras que empiezan con S
}

function sumaMayorQue(array, num) {
    // Retorna true si la suma de los numeros de array es mayor que num
}

describe('Ejercicio 1', function() {
  describe('#multiplicaPorDos()', function() {
    it('Multiplica [1,2] por dos', function() {
        chai.assert.deepEqual(multiplicaPorDos([1,2]), [2,4]);
    });
    it('Multiplica [3,3,3] por dos', function() {
        chai.assert.deepEqual(multiplicaPorDos([3,3,3]), [6,6,6]);
    });
  });

  describe('#EmpiezaConS()', function() {
    it('Debería retornar ["Santi","Sol","Sal"]', function() {
      chai.assert.deepEqual(
        EmpiezaConS(['Santi','Maria','Sol','Sal','Guille']),
        ['Santi','Sol','Sal']);
    });
    it('Debería retornar ["Solano"]', function() {
      chai.assert.deepEqual(
        EmpiezaConS(['Toni','Maria','Solano','Bob','Guille']),
        ['Solano']);
    });
  });

  describe('#sumaMayorQue()', function() {
    it('Debería retornar True', function() {
        chai.assert.isOk(sumaMayorQue([1,2], 1));
    });
    it('Debería retornar False', function() {
        chai.assert.isNotOk(sumaMayorQue([1,2], 10));
    });
    it('Debería retornar False', function() {
        chai.assert.isNotOk(sumaMayorQue([1,2, 'Toni'], 0));
    });
  });
});
```

## Testeando APIs

Modificá el código de abajo para que funcione con tu API de beatles:

```javascript

var mongoose = require("mongoose");
var Beatles = require('../models/Beatles'); // Requerir el modelo de los Beatles

var chai = require('chai') , chaiHttp = require('chai-http'); // para hacer requests HTTP

var server = require('../app');  // Agregar module.exports al entry point.
var should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);
 
  /*
  * Test the /GET route
  */
describe('/GET products', function()  {
  it('should GET all the beatles', function(done)  {
    chai.request(server)
        .get('/beatles/')  //Cambiar por tu endpoint de los beatles
        .end( function(err, res) {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0); // cuantos beatles tiene que haber al principio?
          done();
        });
    });

    it('It should add a new Beatle', function(done) {
        var newBeatle = {
          name: "David Bowie",
          birthdate: "08/01/1947",
          profilePic:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/David-Bowie_Chicago_2002-08-08_photoby_Adam-Bielawski-cropped.jpg/220px-David-Bowie_Chicago_2002-08-08_photoby_Adam-Bielawski-cropped.jpg",
          wiki: 'https://en.wikipedia.org/wiki/David_Bowie'
        };
        chai.request(server)
          .post('/newBeatle') // Reemplazá por tu endpoint de nuevo
          .set('content-type', 'application/x-www-form-urlencoded')
          .send(newBeatle)
          .end(function (err, res) {
            res.should.have.status(200);
            res.body.length.should.be.eql(1); // Cambiar por el número de beatles
            done();
          });
      });

      it('It should delete a new Beatle', function(done) {
        var toBeDeleted = {
          name: "David Bowie"
        }
        chai.request(server)
          .delete('/delete') // Reemplazá por tu endpoint de delete
          .set('content-type', 'application/x-www-form-urlencoded')
          .send(toBeDeleted)
          .end(function (err, res) {
            res.should.have.status(200);
            res.body.length.should.be.eql(0); // Cambiar por el número de beatles
            done();
          });
      });
});
```
