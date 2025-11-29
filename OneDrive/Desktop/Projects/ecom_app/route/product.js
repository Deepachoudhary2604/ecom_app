const express=require('express');
const router=express.Router();
const Product=require('../models/Product');
const {validateProduct,validateReview, isLoggedIn, isAdmin}=require('../middleware');


//to show all products on the page
router.get('/products',async(req,res)=>{
    try{
        let products=await Product.find({});
        res.render('products/index',{products});
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }

});


//to show form for add new product
router.get('/products/new', isAdmin,(req,res)=>{
    try{
        res.render('products/new');
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }

});


//to add the new product
router.post('/products', isAdmin, validateProduct,async(req,res)=>{
    try{
        let{name,img,price,desc}=req.body;
        await Product.create({name,img,price,desc});
        req.flash('success','Product added successfully!');
        res.redirect('/products');
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
})

//to show particular product
router.get('/products/:id',async (req,res)=>{
    try{
        let {id}=req.params;
        let foundProduct=await Product.findById(id).populate('reviews');
        res.render('products/show',{foundProduct});
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
})

// to show edit form
router.get('/products/:id/edit', isAdmin, async (req, res) => {
    try{
        let { id } = req.params;
        let foundProduct = await Product.findById(id);
        res.render('products/edit', { foundProduct });
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }

});


//to edit a product
router.patch('/products/:id', isAdmin, async(req,res)=>{
    try{
        let {id}=req.params;
        let {name,img,price,desc}=req.body;
        await Product.findByIdAndUpdate(id,{name,img,price,desc});
        req.flash('success','Product edited successfully!');
        res.redirect(`/products/${id}`);
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }

})

//to delete a specific product
router.delete('/products/:id', isAdmin, async (req, res) => {
    try{
        let {id} = req.params;
        const product=await Product.findById(id);
        // for(let id of product.reviews){
        //     await Review.findByIdAndDelete(id);
        // }
        await Product.findByIdAndDelete(id);
        req.flash('success','Product deleted successfully!');
        res.redirect('/products');
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }

});

module.exports=router;