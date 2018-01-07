var db=require('../dbconnection'); //reference of dbconnection.js

var servicioo={

getAllservicioo:function(callback){

return db.query("Select * from servicioo",callback);

},
getserviciooByid:function(idservicio,callback){

return db.query("select * from servicioo where idservicio=?",[idservicio],callback);
},
getserviciooSearch:function(idservicio,callback){
    idservicio = "%" + idservicio + "%";
   return db.query("select * from servicioo where  nombre like ?",[idservicio,idservicio],callback);
},
addservicioo:function(servicioo,callback){
return db.query("Insert into servicioo values(?,?,?,?)",[servicioo.idservicio,servicioo.nombre,servicioo.descuento,servicioo.estatus],callback);
},
deleteservicioo:function(idservicio,callback){
 return db.query("delete from servicioo where idservicio=?",[idservicio],callback);
},
updateservicioo:function(idservicio,servicioo,callback){
 return db.query("update servicioo set estatus=?,descuento=? where idservicio=?",[servicioo.estatus,servicioo.descuento,idservicio],callback);
}

};
module.exports= servicioo;