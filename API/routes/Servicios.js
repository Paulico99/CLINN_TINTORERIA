var express = require('express');
var router = express.Router();
var servicios = require('../models/servicio');


router.get('/:ID?/:ID2?',function(req,res,next){
    
if(req.params.ID){
    if(req.params.ID2 == 1){ 
        servicios.getserviciosByid(req.params.ID,function(err,rows){
                
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
            servicios.getServiciosSearch(req.params.ID,function(err,rows){
                
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

servicios.getAllservicios(function(err,rows){

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

servicios.addservicios(req.body,function(err,count){
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

servicios.deleteservicios(req.params.ID,function(err,count){

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

servicios.updateservicios(req.params.ID,req.body,function(err,rows){

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