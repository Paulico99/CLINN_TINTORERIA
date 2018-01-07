var express = require('express');
var router = express.Router();
var detalle_ventas = require('../models/detalle_venta');

router.get('/:ID?',function(req,res,next){

if(req.params.ID){

detalle_ventas.getdetalleventasByid(req.params.ID,function(err,rows){

if(err)
 {
 res.json(err);
 }
 else{
 res.json(rows);
 }
 });
}
else{

detalle_ventas.getAlldetalleventas(function(err,rows){
console.log("hola");
if(err)
 {
 res.json(err);
 }
 else
 {
 res.json(rows);
 }

});

}

});

router.post('/',function(req,res,next){

detalle_ventas.adddetalleventas(req.body,function(err,count){
 if(err)
 {
 res.json(err);
 }
 else{
 res.json(req.body);//or return count for 1 &amp;amp;amp; 0
 }
 });
});
router.delete('/:ID',function(req,res,next){

detalle_ventas.deletedetalleventas(req.params.ID,function(err,count){

if(err)
 {
 res.json(err);
 }
 else
 {
 res.json(count);
 }

});
});
router.put('/:ID',function(req,res,next){

detalle_ventas.updatedetalle_ventas(req.params.ID,req.body,function(err,rows){

if(err)
 {
 res.json(err);
 }
 else
 {
 res.json(rows);
 }
 });
});


module.exports=router;