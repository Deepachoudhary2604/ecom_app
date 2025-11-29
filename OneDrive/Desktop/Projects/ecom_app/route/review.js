const express=require('express');
const router=express.Router();
const Product=require('../models/Product');
const Review=require('../models/Review');
const {validateProduct,validateReview}=require('../middleware');

router.post('/products/:id/review',validateReview,async (req,res)=>{
    try{
        let {id}=req.params;
        let{rating,comment}=req.body;
        const product=await Product.findById(id);
        const review=new Review({rating,comment});
        product.reviews.push(review);
        await review.save();
        await product.save();
        req.flash('success','Review Added successfully');
        res.redirect(`/products/${id}`);
    }
    catch{
        res.status(500).render('error', { err: e.message });
    }
})

router.delete('/products/:id/reviews/:reviewId', async (req, res) => {
    try {
        const { id, reviewId } = req.params;

        // Remove the review document
        await Review.findByIdAndDelete(reviewId);

        // Remove the reference from the product
        await Product.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

        req.flash('success', 'Review deleted successfully');
        res.redirect(`/products/${id}`);
    } catch (e) {
        console.log(e);
        req.flash('error', 'Something went wrong');
        res.redirect(`/products/${id}`);
    }
});


module.exports=router;