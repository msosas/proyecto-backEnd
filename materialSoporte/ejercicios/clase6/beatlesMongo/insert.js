var beatlesSchema = require('./models.js').beatlesSchema;
var mongoose = require('mongoose'); // Importamos el módulo Mongoose.
mongoose.connect("mongodb://localhost/beatles");

var beatlesLista =[{
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

var Beatles = mongoose.model('beatles', beatlesSchema);

Beatles.collection.insert(beatlesLista, function(err, docs){
  if(err) return console.log('todo mal');
  console.log(docs);
  mongoose.connection.close(); //cerramos la conexion
})
