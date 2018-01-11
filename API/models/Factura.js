var db=require('../dbconnection'); //reference of dbconnection.js

var Factura={

getAllFactura:function(callback){

return db.query("Select facturas.ID,proveedor.nombre,productos.descripcion,facturas.fecha,facturas.iva,facturas.subtotal,facturas.total from ((facturas inner join productos on facturas.id_producto = productos.ID)inner join proveedor on facturas.id_proveedor = proveedor.Id);",callback);

},
getFacturaByid:function(ID,callback){

return db.query("select * from facturas where ID=?",[ID],callback);
},
getFacturasSearch:function(ID,callback){
    ID = "%" + ID + "%";
//return db.query("select * from facturas where  ID like ?",[ID],callback);
return db.query("Select facturas.ID,proveedor.nombre,productos.descripcion,facturas.fecha,facturas.costo,facturas.iva,facturas.subtotal,facturas.total from ((facturas inner join productos on facturas.id_producto = productos.ID)inner join proveedor on facturas.id_proveedor = proveedor.Id) where  facturas.ID like ? or productos.descripcion like ?;",[ID,ID],callback);
},
addFactura:function(facturas,callback){
return db.query("Insert into facturas values(?,?,?,?,?,?,?,?)",[facturas.ID,facturas.id_proveedor,facturas.id_producto,
    facturas.fecha,facturas.costo,facturas.iva,facturas.subtotal,facturas.total],callback);
},
deleteFactura:function(ID,callback){
 return db.query("delete from facturas where ID=?",[ID],callback);
},
updateFactura:function(ID,facturas,callback){
 return db.query("update facturas set id_producto=?,costo=?,fecha=?,subtotal=?,total=?,iva=? where ID=?",[facturas.id_producto,facturas.costo,facturas.fecha,facturas.subtotal,
    facturas.total,facturas.iva,ID],callback);
}

};
module.exports= Factura;