var express = require('express');
var router = express.Router();
var compras2 = require('../models/Compra2');

router.get('/:idcompras2?',function(req,res,next){

if(req.params.idcompras2){

compras2.getcompras2Byidcompras2(req.params.idcompras2,function(err,rows){

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

compras2.getAllcompras2(function(err,rows){

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

compras2.addcompras2(req.body,function(err,count){
 if(err)
 {
 res.json(err);
 }
 else{
 res.json(req.body);//or return count for 1 &amp;amp;amp; 0
 }
 });
});
router.delete('/:idcompras2',function(req,res,next){

compras2.deletecompras2(req.params.idcompras2,function(err,count){

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
router.put('/:idcompras2',function(req,res,next){

compras2.updatecompras2(req.params.idcompras2,req.body,function(err,rows){

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