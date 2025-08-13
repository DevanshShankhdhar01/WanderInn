if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
    console.log(process.env.SECRET);
}

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const ejs = require('ejs');
const Listing = require('./models/listing.js');
const Review= require('./models/reviews.js');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const session= require('express-session');
const MongoDBStore = require('connect-mongo');
const flash=require('connect-flash');
const passport= require('passport');
const LocalStrategy= require('passport-local');
const User=require('./models/user.js');

const dbURL = process.env.ATLAS_DB_URL || 'mongodb://127.0.0.1:27017/wanderinn';

const store=MongoDBStore.create({
    mongoUrl: dbURL,
    crypto:{
        secret: process.env.SECRET,       
    },
    touchAfter: 24 * 60 * 60 // time in seconds
});

store.on("error", function(e){
    console.log("Session Store Error:", e);
});
const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 ,// 1 day
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24) // 1 day
    }
    
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const joi=require("joi");
const {reviewSchema,listingSchema}=require("./schema.js");
//const reviewSchema=require("./schema.js");

const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");


const ejsMate = require('ejs-mate');
app.engine('ejs', ejsMate);

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");

const cookieParser = require('cookie-parser');
const { userInfo } = require('os');


main()
    .then(() => {
    console.log('Connected to MongoDB');
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbURL,{ tls: true });
}


app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.curUser = req.user;
    console.log(res.locals.success);
    next();
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/users",userRouter);


// Error Handling Routes

app.all("*splat",(req,res,next)=>{
    next(new ExpressError(404,"Page not Found!!!"));
});

app.use((err,req,res,next)=>{
    const {statusCode=500,message="some error"}=err;
    res.status(statusCode).render("error.ejs",{err});
    //res.status(statusCode).send(message);
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});