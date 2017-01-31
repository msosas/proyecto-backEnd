var mongoose = require("mongoose");
var Product = require('../models/product');

//Require the dev-dependencies
var chai = require('chai') , chaiHttp = require('chai-http');

var server = require('../app');
var should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);
 
// Pruebas de validacion de Mongoose
describe('Modelo Productos', function() {
    it('should be invalid if price is empty', function(done) {
        var m = new Product({name : 'Producto Nuevo'});
 
        m.validate(function(err) {
            expect(err.errors.price).to.exist;
            done();
        });
    });
});

//
describe('Productos', function() {

  before(function(done) { // antes de los test borramos todos
      Product.remove({}, function(err) { 
         done();         
      });     
  });
  /*
  * Test the /GET route
  */
  describe('/GET products', function()  {
      it('should GET all the products', function(done)  {
        chai.request(server)
            .get('/products/todos')
            .end( function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
        });
  });


   /*
  * Test the /POST route
  */
  
  describe('/POST /Login', function () {
    var Cookies;
      it('it should Login', function(done) {
        chai.request(server)
          .post('/login')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({"username": "toni", "password": "123"})
          .end(function (err, res) {
            res.should.have.status(200);
            // Save the cookie to use it later to retrieve the session
            Cookies = res.headers['set-cookie'].pop().split(';')[0];
            done();
          });
      });

      it('It should create a new Product', function(done) {
        var product = {
            name: "The Lord of the Rings",
            description: "J.R.R. Tolkien",
            stock: 123,
            price: 300
        };
        chai.request(server)
          .post('/products')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({product})
          .set('Cookie', Cookies)
          .end(function (err, res) {
            res.should.have.status(200);
            done();
          });
      });

      it('should GET all the products, and be one Product Only', function(done)  {
        chai.request(server)
            .get('/products/todos')
            .end( function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
              done();
            });
        });

  });


});