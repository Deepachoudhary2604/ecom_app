let express=require('express');
const path = require('path');
const app=express();
let mongoose=require('mongoose');
const seedDB = require('./seed');
const ejsMate=require('ejs-mate');
const session=require('express-session');
const flash=require('connect-flash');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
require('dotenv').config();

// MongoDB URI (used by mongoose and session store)
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecom';

// Startup diagnostics (non-sensitive)
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 8080;
const hasMongoUri = !!process.env.MONGODB_URI;
const hasSessionSecret = !!process.env.SESSION_SECRET;
const isAtlas = hasMongoUri && process.env.MONGODB_URI.includes('mongodb.net');

function masked(value) {
  if (!value) return '';
  if (value.length <= 8) return '****';
  return `${value.slice(0,4)}...${value.slice(-4)}`;
}

console.log('--- Startup diagnostics ---');
console.log('NODE_ENV:', NODE_ENV);
console.log('PORT:', PORT);
console.log('MONGODB_URI present:', hasMongoUri ? 'yes' : 'no');
console.log('Using Atlas:', isAtlas ? 'yes' : 'no');
console.log('SESSION_SECRET present:', hasSessionSecret ? 'yes' : 'no');
console.log('---------------------------');

app.use(express.json());

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

//to set path to views folder
app.engine('ejs',ejsMate)
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(session({
    secret: process.env.SESSION_SECRET || 'cat',
    resave:false,
    saveUninitialized:true,
    store: MongoStore.create({ mongoUrl: mongoUri }),
    cookie:{secure:false}
}))

// Passport configuration
passport.use(new LocalStrategy({
    usernameField: 'username'
}, async (username, password, done) => {
    try {
        const user = await User.findOne({ $or: [{ username }, { email: username }] });
        if (!user) {
            return done(null, false, { message: 'User not found!' });
        }
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return done(null, false, { message: 'Invalid password!' });
        }
        return done(null, user);
    } catch (e) {
        return done(e);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (e) {
        done(e);
    }
});

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//to set path to public folder
app.use(express.static(path.join(__dirname,'public')));

app.use(express.urlencoded({extended:true}));

//to connect to db
mongoose.connect(mongoUri)

.then(()=>{
    console.log('db connected', isAtlas ? '(Atlas)' : '(local)');
})
.catch((err)=>{
    console.error('Mongo connection error:', err);
})

//to seed data in db
// seedDB();

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error   = req.flash('error');
    res.locals.currentUser = req.user;
    next();
});

// Home route - redirect to products
app.get('/', (req, res) => {
    res.redirect('/products');
});

// simple health endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ ok: true, uptime: process.uptime() });
});

const productRoutes = require('./route/product'); 
app.use(productRoutes);

const reviewRoutes=require('./route/review');
app.use(reviewRoutes);

const authRoutes = require('./route/auth');
app.use(authRoutes);

const cartRoutes = require('./route/cart');
app.use(cartRoutes);

const wishlistRoutes = require('./route/wishlist');
app.use(wishlistRoutes);

// Process-level error handlers (capture startup/runtime errors)
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
process.on('uncaughtException', err => {
    console.error('Uncaught Exception thrown:', err);
});

// Export app for serverless platforms (Vercel) and standalone run
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`server at ${PORT}`);
    });
}

module.exports = app;