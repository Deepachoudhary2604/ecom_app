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

.
//to connect to db
mongoose.connect(mongoUri)
.then(()=>{
    console.log('db connected');
})
.catch((err)=>{
    console.log(err);
})

//to seed data in db
// seedDB();

app.use(express.urlencoded({extended:true}));

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

// Export app for serverless platforms (Vercel) and standalone run
const PORT = process.env.PORT || 8080;
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`server at ${PORT}`);
    });
}

module.exports = app;