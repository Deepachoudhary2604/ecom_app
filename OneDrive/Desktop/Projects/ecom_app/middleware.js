const { productSchema, reviewSchema } = require('./schema');

const validateProduct = (req, res, next) => {
    const { name, img, price, desc } = req.body;
    const { error } = productSchema.validate({ name, img, price, desc });
    if (error) {
        // Render error page and pass `err`
        return res.status(400).render('error', { err: error.details.map(el => el.message).join(', ') });
    }
    next();
};

const validateReview = (req, res, next) => {
    const { rating, comment } = req.body;
    const { error } = reviewSchema.validate({ rating, comment });
    if (error) {
        // Render error page and pass `err`
        return res.status(400).render('error', { err: error.details.map(el => el.message).join(', ') });
    }
    next();
};

// Authentication Middleware
const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be logged in first!');
        return res.redirect('/login');
    }
    next();
};

// Authorization Middleware - Check if user is admin
const isAdmin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be logged in first!');
        return res.redirect('/login');
    }
    if (req.user.role !== 'admin') {
        req.flash('error', 'You do not have permission to perform this action!');
        return res.redirect('/products');
    }
    next();
};

module.exports = { validateProduct, validateReview, isLoggedIn, isAdmin };
