var express = require('express');
var router = express.Router();
var servicioo = require('../models/Prenda');


router.get('/:idservicio?/:idservicio2?',function(req,res,next){
    
if(req.params.idservicio){
    if(req.params.idservicio2 == 1){ 
        servicioo.getserviciooByid(req.params.idservicio,function(err,rows){
                
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
            servicioo.getserviciooSearch(req.params.idservicio,function(err,rows){
                
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

servicioo.getAllservicioo(function(err,rows){

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

servicioo.addservicioo(req.body,function(err,count){
 if(err)
 {
 res.json(err);
 }
 else{
 res.json(req.body);//or return count for 1 &amp;amp;amp; 0
 }
 });
});
router.delete('/:idservicio',function(req,res,next){

servicioo.deleteservicioo(req.params.idservicio,function(err,count){

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
router.put('/:idservicio',function(req,res,next){

servicioo.updateservicioo(req.params.idservicio,req.body,function(err,rows){

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