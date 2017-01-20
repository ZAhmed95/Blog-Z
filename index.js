var express = require('express');
var pg = require('pg');
var bodyParser = require('body-parser');

var app = express();
app.set('port', '3000');
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

//connection string for connecting to postgres database
var connectionString = 'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/blogz';

app.listen(app.get('port'), function(){
  console.log('Node app is running on port', app.get('port'));
});

app.get('/', function(req,res){
  res.redirect('/home');
});

app.get('/home', function(req,res){
  pg.connect(connectionString, function(err,client,done){
    if (err){
      return console.log('Error connecting to database');
    }
    client.query('select * from projects;', function(err,result){
      if (err){
        return console.log('Error querying database');
      }
      res.render('portfolio', result);
      done();
      pg.end();
    }); //end client.query
  }); //end pg.connect
}); //end app.get

app.get('/blog', function(req,res){
  res.render('blog');
});
