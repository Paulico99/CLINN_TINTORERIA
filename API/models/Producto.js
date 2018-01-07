var db=require('../dbconnection'); //reference of dbconnection.js

var productos={

getAllproductos:function(callback){

return db.query("Select productos.ID,productos.descripcion,productos.Precio,proveedor.nombre,productos.Estatus from productos inner join proveedor on productos.id_proveedor = proveedor.Id;",callback);

},

getproductosByid:function(ID,callback){

return db.query("select * from productos where ID=?",[ID],callback);
},
getProductoSearch:function(ID,callback){
    ID = "%" + ID + "%";
   return db.query("select productos.ID,productos.descripcion,productos.Precio,proveedor.nombre,productos.Estatus from productos inner join proveedor on productos.id_proveedor = proveedor.Id where  productos.descripcion like ?",[ID],callback);
},

addproductos:function(productos,callback){
return db.query("Insert into productos values(?,?,?,?,?)",[productos.ID,productos.descripcion,productos.Precio,productos.id_proveedor,
    productos.Estatus],callback);
},
deleteproductos:function(ID,callback){
 return db.query("delete from productos where ID=?",[ID],callback);
},
updateproductos:function(ID,productos,callback){
 return db.query("update productos set Precio=?,Estatus=?,id_proveedor=?  where ID=?",[productos.Precio,productos.Estatus,productos.id_proveedor,ID],callback);
}

};
module.exports= productos;