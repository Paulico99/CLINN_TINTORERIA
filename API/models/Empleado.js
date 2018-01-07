var db=require('../dbconnection'); //reference of dbconnection.js

var empleado={

getAllempleados:function(callback){

return db.query("Select empleado.id,empleado.Nombre,empleado.RFC,puestos.nombre,empleado.Direccion,empleado.NSS,empleado.Telefono,empleado.Estatus,empleado.email,empleado.password,empleado.contrasena from empleado inner join puestos on empleado.IDPuesto = puestos.ID;",callback);

},
getempleadoById:function(id,callback){

return db.query("select * from empleado where id=?",[id],callback);
},

getEmpleadoSearch:function(id,callback){
    id = "%" + id + "%";
   return db.query("select empleado.id,empleado.Nombre,empleado.RFC,puestos.nombre,empleado.Direccion,empleado.NSS,empleado.Telefono,empleado.Estatus,empleado.email,empleado.password,empleado.contrasena from empleado inner join puestos on empleado.IDPuesto = puestos.ID where  empleado.Nombre like ?",[id],callback);
},
addempleado:function(empleado,callback){
return db.query("Insert into empleado values(?,?,?,?,?,?,?,?,?,?,?)",[empleado.id,empleado.Nombre,empleado.RFC,empleado.IDPuesto
    ,empleado.Direccion,empleado.NSS,empleado.Telefono,empleado.Estatus,empleado.email,empleado.password,empleado.contrasena],callback);
},
deleteempleado:function(id,callback){
 return db.query("delete from empleado where id=?",[id],callback);
},
updateempleado:function(id,empleado,callback){
 return db.query("update empleado set Telefono=?,IDPuesto=?,Estatus=? where id=?",[empleado.Telefono,empleado.IDPuesto,
    empleado.Estatus,id],callback);
}

};
module.exports= empleado;