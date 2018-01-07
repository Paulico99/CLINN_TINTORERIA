var db=require('../dbconnection'); //reference of dbconnection.js

var compras2={

getAllcompras2:function(callback){

return db.query("Select * from compras2",callback);

},
getcompras2Byidcompras2:function(idcompras2,callback){

return db.query("select * from compras2 where idcompras2=?",[idcompras2],callback);
},
addcompras2:function(compras2,callback){
return db.query("Insert into compras2 values(?,?,?,?,?,?)",[compras2.idcompras2,compras2.status,compras2.fecha,
    compras2.iva,compras2.subtotal,compras2.importe],callback);
},
deletecompras2:function(idcompras2,callback){
 return db.query("delete from compras2 where idcompras2=?",[idcompras2],callback);
},
updatecompras2:function(idcompras2,compras2,callback){
 return db.query("update compras2 set status=?,fecha=? ,iva=? ,subtotal=? , importe=? where idcompras2=?",[compras2.status,compras2.fecha,
    compras2.iva,compras2.fecha,compras2.iva,idcompras2],callback);
}

};
module.exports= compras2;