var express = require('express');
var router = express.Router();
var Presupuesto = require('../models/Presupuesto');

router.get('/:idpresupuesto?/:idpresupuesto2?',function(req,res,next){
    
    if(req.params.idpresupuesto){
        if(req.params.idpresupuesto2 == 1){ 
            Presupuesto.getPresupuestoByid(req.params.idpresupuesto,function(err,rows){
                    
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
                Presupuesto.getPresupuestoSearch(req.params.idpresupuesto,function(err,rows){
                    
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

Presupuesto.getAllPresupuesto(function(err,rows){

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

Presupuesto.addPresupuesto(req.body,function(err,count){
 if(err)
 {
 res.json(err);
 }
 else{
 res.json(req.body);//or return count for 1 &amp;amp;amp; 0
 }
 });
});
router.delete('/:idpresupuesto',function(req,res,next){

Presupuesto.deletePresupuesto(req.params.idpresupuesto,function(err,count){

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
router.put('/:idpresupuesto',function(req,res,next){

Presupuesto.updatePresupuesto(req.params.idpresupuesto,req.body,function(err,rows){

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