var express = require('express');
var router = express.Router();
var Compras = require('../models/Compra');

router.get('/:idcompras?',function(req,res,next){

if(req.params.idcompras){

Compras.getComprasByidcompras(req.params.idcompras,function(err,rows){

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

Compras.getAllCompras(function(err,rows){

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

Compras.addCompras(req.body,function(err,count){
 if(err)
 {
 res.json(err);
 }
 else{
 res.json(req.body);//or return count for 1 &amp;amp;amp; 0
 }
 });
});
router.delete('/:idcompras',function(req,res,next){

Compras.deleteCompras(req.params.idcompras,function(err,count){

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
router.put('/:idcompras',function(req,res,next){

Compras.updateCompras(req.params.idcompras,req.body,function(err,rows){

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