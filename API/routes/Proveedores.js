var express = require('express');
var router = express.Router();
var proveedor = require('../models/proveedor');

router.get('/:Id?/:Id2?',function(req,res,next){
    

if(req.params.Id){
    if(req.params.Id2 == 1){ 
        proveedor.getproveedorById(req.params.Id,function(err,rows){
                
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
            proveedor.getProveedorSearch(req.params.Id,function(err,rows){
                
        if(err)
        {
        res.json(err);
        }
        else{
        res.json(rows);
        }
        });
        }
}
else{

proveedor.getAllproveedores(function(err,rows){

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

proveedor.addproveedor(req.body,function(err,count){
 if(err)
 {
 res.json(err);
 }
 else{
 res.json(req.body);//or return count for 1 &amp;amp;amp; 0
 }
 });
});
router.delete('/:Id',function(req,res,next){

proveedor.deleteproveedor(req.params.Id,function(err,count){

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
router.put('/:Id',function(req,res,next){

proveedor.updateproveedor(req.params.Id,req.body,function(err,rows){

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