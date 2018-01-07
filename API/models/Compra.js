var db=require('../dbconnection'); //reference of dbconnection.js

var Compras={

getAllCompras:function(callback){

return db.query("Select compras.idcompras,productos.descripcion,proveedor.nombre,compras.cantidad,compras.precio,compras.fecha,compras.iva,compras.importe,compras.id_compras2 from ((compras inner join productos on compras.id_producto = productos.ID)inner join proveedor on compras.id_proveedor = proveedor.Id);",callback);

},
getComprasByidcompras:function(idcompras,callback){

return db.query("select * from compras where idcompras=?",[idcompras],callback);
},
addCompras:function(Compras,callback){
return db.query("Insert into compras values(?,?,?,?,?,?,?,?,?)",[Compras.idcompras,Compras.id_producto,Compras.id_proveedor,
    Compras.cantidad,Compras.Precio,Compras.fecha,Compras.iva,Compras.importe,Compras.id_compras2],callback);
},
deleteCompras:function(idcompras,callback){
 return db.query("delete from compras where idcompras=?",[idcompras],callback);
},
updateCompras:function(idcompras,Compras,callback){
 return db.query("update compras set id_producto=?,id_proveedor=? ,cantidad=? ,iva=? where idcompras=?",[Compras.id_producto,Compras.id_proveedor,
    Compras.cantidad,Compras.fecha,Compras.iva,idcompras],callback);
}

};
module.exports= Compras;