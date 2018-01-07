var db=require('../dbconnection'); //reference of dbconnection.js

var proveedor={

getAllproveedores:function(callback){

return db.query("Select * from proveedor",callback);

},
getproveedorById:function(Id,callback){

return db.query("select * from proveedor where Id=?",[Id],callback);
},

getProveedorSearch:function(Id,callback){
    Id = "%" + Id + "%";
   return db.query("select * from proveedor where  nombre like ?",[Id,Id],callback);
},

addproveedor:function(proveedor,callback){
return db.query("Insert into proveedor values(?,?,?,?,?,?,?,?,?)",[proveedor.Id,proveedor.nombre,proveedor.RFC,proveedor.Direccion,
    proveedor.Telefono,proveedor.correo,proveedor.Localidad,proveedor.Estado,proveedor.Estatus],callback);
},
deleteproveedor:function(Id,callback){
 return db.query("delete from proveedor where Id=?",[Id],callback);
},
updateproveedor:function(Id,proveedor,callback){
 return db.query("update proveedor set Telefono=?,correo=?,Estatus=? where Id=?",[proveedor.Telefono,proveedor.correo,
    proveedor.Estatus,Id],callback);
}

};
module.exports= proveedor;