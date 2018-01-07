var db=require('../dbconnection'); //reference of dbconnection.js

var servicios={

getAllservicios:function(callback){

return db.query("Select * from servicios",callback);

},
getserviciosByid:function(ID,callback){

return db.query("select * from servicios where ID=?",[ID],callback);
},
getServiciosSearch:function(ID,callback){
    ID = "%" + ID + "%";
   return db.query("select * from servicios where  Nombre like ?",[ID,ID],callback);
},
addservicios:function(servicios,callback){
return db.query("Insert into servicios values(?,?,?,?)",[servicios.ID,servicios.Nombre,servicios.Estatus,servicios.Precio],callback);
},
deleteservicios:function(ID,callback){
 return db.query("delete from servicios where ID=?",[ID],callback);
},
updateservicios:function(ID,servicios,callback){
 return db.query("update servicios set Estatus=?,Precio=? where ID=?",[servicios.Estatus,servicios.Precio,ID],callback);
}

};
module.exports= servicios;