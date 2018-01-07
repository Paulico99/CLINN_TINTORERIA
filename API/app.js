var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var routes = require('./routes/index');
var Tasks = require('./routes/Tasks');
var Clientes = require('./routes/Clientes');
var Proveedores = require('./routes/Proveedores');
var Empleados = require('./routes/Empleados');
var Productos = require('./routes/Productos');
var Puestos = require('./routes/Puestos');
var Servicios = require('./routes/Servicios');
var Ventas = require('./routes/Ventas');
var detalle_ventas = require('./routes/detalle_ventas');
var Compras = require('./routes/Compras');
var Prendas =require('./routes/Prendas');
var Compras2 = require('./routes/Compras2')
var Facturas = require('./routes/Facturas')

//var index = require('./routes/index');
var users = require('./routes/users');

/*
var mysql = require('mysql');
var connection = require('express-myconnection');
*/


var app = express();

/*Crear conexion con mysql
app.use(connection(mysql,  {
  host: "localhost",
  user: "root",
  password: "paulico99",
  database: "bd_tintoreria"
},'request'));
*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/Tasks', Tasks);
app.use('/Clientes', Clientes);
app.use('/Proveedores', Proveedores);
app.use('/Empleados', Empleados);
app.use('/Productos', Productos);
app.use('/Puestos', Puestos);
app.use('/Servicios', Servicios);
app.use('/Ventas', Ventas);
app.use('/Compras', Compras);
app.use('/detalle_ventas', detalle_ventas);
app.use('/Prendas',Prendas);
app.use('/Compras2',Compras2);
app.use('/Facturas', Facturas);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
