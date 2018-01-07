var express = require('express');
var router = express.Router();
var productos = require('../models/Producto');

router.get('/:ID?/:ID2?',function(req,res,next){
    
if(req.params.ID){
    if(req.params.ID2 == 1){ 
        productos.getproductosByid(req.params.ID,function(err,rows){
                
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
            productos.getProductoSearch(req.params.ID,function(err,rows){
                
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

productos.getAllproductos(function(err,rows){
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

productos.addproductos(req.body,function(err,count){
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

productos.deleteproductos(req.params.ID,function(err,count){

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

productos.updateproductos(req.params.ID,req.body,function(err,rows){

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