var db=require('../dbconnection'); //reference of dbconnection.js

var ventas={

getAllventas:function(callback){

return db.query("Select ventas.ID,cliente.email,ventas.Total,ventas.Abono,ventas.estatus,ventas.entrega,ventas.estatus_servicio from ventas inner join cliente on ventas.id_cliente = cliente.id;",callback);

},
getAlldetalleventas:function(callback){

    return db.query("Select detalle_venta.ID,servicios.Nombre,detalle_venta.t_prenda,detalle_venta.Precio,detalle_venta.cantidad,ventas.estatus_servicio from ((detalle_venta inner join servicios on detalle_venta.id_servicio = servicios.ID)inner join ventas on detalle_venta.id_venta = ventas.ID);",callback);
    
},
getventasByid:function(ID,callback){

return db.query("select * from ventas where ID=?",[ID],callback);
},
getVentasSearch:function(ID,callback){
    ID = "%" + ID + "%";
   return db.query("select ventas.ID,cliente.email,ventas.Total,ventas.Abono,ventas.estatus,ventas.entrega,ventas.estatus_servicio from ventas inner join cliente on ventas.id_cliente = cliente.id where  cliente.email like ? or cliente.ID like ?",[ID,ID],callback);
},
addventas:function(ventas,callback){
return db.query("Insert into ventas values(?,?,?,?,?,?,?)",[ventas.ID,ventas.id_cliente,ventas.Total,ventas.Abono,ventas.estatus,ventas.entrega,ventas.estatus_servicio],callback);
},
deleteventas:function(ID,callback){
 return db.query("delete from ventas where ID=?",[ID],callback);
},
updateventas:function(ID,ventas,callback){
 return db.query("update ventas set Abono=?, estatus=? , estatus_servicio=? where ID=?",[,ventas.Abono,ventas.estatus,ventas.estatus_servicio,ID],callback);
}

};
module.exports= ventas;