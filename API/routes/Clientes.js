var express = require('express');
var router = express.Router();
var Cliente = require('../models/Cliente');

router.get('/:id?/:id2?',function(req,res,next){

if(req.params.id){
    if(req.params.id2 == 1){ 
        Cliente.getClienteByid(req.params.id,function(err,rows){
                
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
            Cliente.getClienteSearch(req.params.id,function(err,rows){
                
        if(err)
        {
        res.json(err);
        }
        else{
        res.json(rows);
        }
        });
        }
    }else{

Cliente.getAllClientes(function(err,rows){

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

Cliente.addCliente(req.body,function(err,count){
 if(err)
 {
 res.json(err);
 }
 else{
 res.json(req.body);//or return count for 1 &amp;amp;amp; 0
 }
 });
});
router.delete('/:id',function(req,res,next){

Cliente.deleteCliente(req.params.id,function(err,count){

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
router.put('/:id',function(req,res,next){

Cliente.updateCliente(req.params.id,req.body,function(err,rows){

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