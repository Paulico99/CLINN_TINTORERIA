var db=require('../dbconnection'); //reference of dbconnection.js

var Presupuesto={

getAllPresupuesto:function(callback){

return db.query("Select presupuesto.idpresupuesto,productos.descripcion,proveedor.nombre,presupuesto.fecha,presupuesto.base,presupuesto.t_iva,presupuesto.importe_iva,presupuesto.total_importe from ((presupuesto inner join productos on presupuesto.id_producto = productos.ID)inner join proveedor on presupuesto.id_proveedor = proveedor.Id);",callback);

},
getPresupuestoByid:function(idpresupuesto,callback){
//id = "%" + id + "%";
return db.query("select * from presupuesto where idpresupuesto=?",[idpresupuesto],callback);
},
getPresupuestoSearch:function(idpresupuesto,callback){
     idpresupuesto = "%" + idpresupuesto + "%";
    return db.query("select presupuesto.idpresupuesto,productos.descripcion,proveedor.nombre,presupuesto.fecha,presupuesto.base,presupuesto.t_iva,presupuesto.importe_iva,presupuesto.total_importe from ((presupuesto inner join productos on presupuesto.id_producto = productos.ID)inner join proveedor on presupuesto.id_proveedor = proveedor.Id) where  idpresupuesto like ?",[idpresupuesto,idpresupuesto],callback);

},
addPresupuesto:function(Presupuesto,callback){
return db.query("Insert into presupuesto values(?,?,?,?,?,?,?,?)",[Presupuesto.idpresupuesto,Presupuesto.id_proveedor,Presupuesto.fecha,Presupuesto.id_producto,Presupuesto.base,Presupuesto.t_iva,
    Presupuesto.importe_iva,Presupuesto.total_importe,],callback);
},
deletePresupuesto:function(idpresupuesto,callback){
 return db.query("delete from presupuesto where idpresupuesto=?",[idpresupuesto],callback);
},
updatePresupuesto:function(idpresupuesto,Presupuesto,callback){
 return db.query("update presupuesto set id_proveedor=?,id_producto=? ,fecha=? ,base=?, t_iva=?,importe_iva=?, total_importe=? where idpresupuesto=?",[Presupuesto.id_proveedor,Presupuesto.id_producto,
    Presupuesto.fecha,Presupuesto.base,Presupuesto.t_iva,Presupuesto.importe_iva,Presupuesto.total_importe,idpresupuesto],callback);
}

};
module.exports= Presupuesto;