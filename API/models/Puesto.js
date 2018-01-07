var db=require('../dbconnection'); //reference of dbconnection.js

var Puesto={

getAllPuestos:function(callback){

return db.query("Select * from puestos",callback);

},
getPuestoByid:function(ID,callback){

return db.query("select * from puestos where ID=?",[ID],callback);
},
addPuesto:function(Puesto,callback){
return db.query("Insert into puestos values(?,?,?,?)",[Puesto.ID,Puesto.nombre,Puesto.Salario,Puesto.Estatus],callback);
},
deletePuesto:function(ID,callback){
 return db.query("delete from puestos where ID=?",[ID],callback);
},
updatePuesto:function(ID,Puesto,callback){
 return db.query("update puestos set Salario=?,Estatus=? where ID=?",[Puesto.Salario,Puesto.Estatus,ID],callback);
}

};
module.exports= Puesto;