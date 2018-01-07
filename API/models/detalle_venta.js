var db=require('../dbconnection'); //reference of dbconnection.js

var detalle_ventas={

getAlldetalleventas:function(callback){

    return db.query("Select detalle_venta.ID,servicios.Nombre,servicioo.nombre,detalle_venta.Precio,detalle_venta.cantidad,detalle_venta.total from (((detalle_venta inner join servicios on detalle_venta.t_prenda = servicios.ID)inner join ventas on detalle_venta.id_venta = ventas.ID)inner join servicioo on detalle_venta.id_servicio = servicioo.idservicio);",callback);
    
},
getdetalleventasByid:function(ID,callback){

return db.query("select * from detalle_venta where ID=?",[ID],callback);
},
adddetalleventas:function(detalle_venta,callback){
return db.query("Insert into detalle_venta values(?,?,?,?,?,?,?)",[detalle_venta.ID,detalle_venta.id_servicio,detalle_venta.t_prenda,detalle_venta.Precio,detalle_venta.cantidad,detalle_venta.id_venta,detalle_venta.total],callback);
},
deletedetalleventas:function(ID,callback){
 return db.query("delete from detalle_venta where ID=?",[ID],callback);
},
updatedetalleventas:function(ID,detalle_venta,callback){
 return db.query("update detalle_venta set id_servicio=?,t_prenda=?,cantidad=?,Precio=?  where ID=?",[detalle_venta.id_servicio,detalle_venta.t_prenda,detalle_venta.cantidad,detalle_venta.Precio,ID],callback);
}

};
module.exports= detalle_ventas;