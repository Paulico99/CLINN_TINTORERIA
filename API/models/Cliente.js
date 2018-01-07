var db=require('../dbconnection'); //reference of dbconnection.js

var Cliente={

getAllClientes:function(callback){

return db.query("Select * from cliente",callback);

},
getClienteByid:function(id,callback){
//id = "%" + id + "%";
return db.query("select * from cliente where id=?",[id],callback);
},
getClienteSearch:function(id,callback){
     id = "%" + id + "%";
    return db.query("select * from cliente where  nombre like ?",[id,id],callback);
},
addCliente:function(Cliente,callback){
return db.query("Insert into cliente values(?,?,?,?,?,?,?,?,?,?)",[Cliente.id,Cliente.nombre,Cliente.apellidos,Cliente.direccion,
    Cliente.telefono,Cliente.email,Cliente.password,Cliente.contrasena,Cliente.tipo_persona,Cliente.estatus],callback);
},
deleteCliente:function(id,callback){
 return db.query("delete from cliente where id=?",[id],callback);
},
updateCliente:function(id,Cliente,callback){
 return db.query("update Cliente set telefono=?,email=? ,direccion=? ,password=?, contrasena=?,estatus=? where id=?",[Cliente.telefono,Cliente.email,
    Cliente.direccion,Cliente.password,Cliente.contrasena,Cliente.estatus,id],callback);
}

};
module.exports= Cliente;