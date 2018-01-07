var express = require('express');
var router = express.Router();
var ventas = require('../models/Venta');

router.get('/:ID?/:ID2?',function(req,res,next){
    
if(req.params.ID){
    if(req.params.ID2 == 1){ 
        ventas.getventasByid(req.params.ID,function(err,rows){
                
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
            ventas.getVentasSearch(req.params.ID,function(err,rows){
                
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

ventas.getAllventas(function(err,rows){
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

ventas.addventas(req.body,function(err,count){
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

ventas.deleteventas(req.params.ID,function(err,count){

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

ventas.updateventas(req.params.ID,req.body,function(err,rows){

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