var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser')
var app = express();

app.use(express.static('www'));
app.use(bodyParser.json())

app.get("/api/finances", function(req, res){
  var connection = mysql.createConnection({host     : 'localhost',user:'root',password:'',database:'finances'});
  connection.connect();
  connection.query('select *, date_format(data, "%d/%m/%y") as data from contas', function(err, rows, fields) {
    if (err) throw err;

    res.jsonp(rows);
  });
  connection.end();
});



app.post("/api/finance", function(req, res){
  var sql = "";
  if(!req.body.id){
    sql = "insert into contas (descricao, valor, tipo, data) values (?, ?, ?, STR_TO_DATE(?, '%d/%m/%Y'))";
  } else {
    sql = "update contas set descricao=?, valor=?, tipo=?, data=STR_TO_DATE(?, '%d/%m/%Y') where id=?";
  }
  var connection = mysql.createConnection({host     : 'localhost',user:'root',password:'',database:'finances'});
  connection.connect();
  connection.query(sql, [req.body.descricao, req.body.valor, req.body.tipo, req.body.data, req.body.id], function(err, rows, fields) {
    if (err) throw err;

    res.jsonp(rows);
  });
  connection.end();
});


app.post("/api/finance_del", function(req, res){
  var sql = "delete from contas where id=?";
  var connection = mysql.createConnection({host:'localhost',user:'root',password:'',database:'finances'});
  connection.connect();
  connection.query(sql, [req.body.id], function(err, rows, fields) {
    if (err) throw err;

    res.jsonp(rows);
  });
  connection.end();
});


app.listen(8088, function () {
  console.log('Rodando...');
});
