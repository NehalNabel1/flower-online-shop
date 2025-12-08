import express from 'express'
import type { Request , Response , NextFunction}  from 'express'
import session from 'express-session'
import connectMongoDBSession from 'connect-mongodb-session'
import flash from 'connect-flash'
import dotenv from 'dotenv'
import {email, z} from 'zod'
import { request } from 'http'


import {homeRouter} from './routes/home.routes.js'
import {productRouter} from './routes/products.routes.js'
import {authRouter} from './routes/auth.routes.js'
import {cartRouter} from './routes/cart.routes.js'
import {orderRouter} from './routes/order.routes.js'
import {adminRouter} from './routes/admin.routes.js'
import {setIsAdmin} from './middleware/setIsAdmin.js'
import {setIsUser} from './middleware/setIsUser.js'

import path from 'path'
import mongoose from 'mongoose'

const app = express();
const __dirname = path.resolve();
dotenv.config({ path: path.join(__dirname, '.env') });

const DB_URL = process.env.DB_URL;
if(! DB_URL){
    throw new Error('DB_URL is not defined in .env');
}

 mongoose.connect(DB_URL)
 .then(()=> console.log('connected to db'))
 .catch(err => console.log('Error connected to db:', err));

const SessionStore = connectMongoDBSession(session);
const STORE = new SessionStore({
    uri : DB_URL ,
    collection : 'sessions'
})

if(!process.env.SESSION_SECRET){
    throw new Error('SESSION_SECRET is not defined in .env');
}
app.use(session({
     secret : process.env.SESSION_SECRET ,
     saveUninitialized :false,
     resave :false ,
     store: STORE
}))
app.use(flash());
//Set port number
const port = process.env.PORT || 3000;
app.use(express.urlencoded({extended :true}));
app.use(express.json());
// Set EJS as the view engine
//app.set('views' , './views');
app.set('views' , path.join(__dirname , 'views'));
app.set('view engine', 'ejs');
// Serve static files from the "public" directory
app.use(express.static('assets'));
app.use(express.static('images'));

// Apply the middleware globally
app.use(setIsUser);
app.use(setIsAdmin);

//routers
app.use('/',homeRouter);
app.use('/',authRouter);
app.use('/product',productRouter);
app.use('/cart',cartRouter);
app.use('/order',orderRouter);
app.use('/admin',adminRouter);

app.get('/error',(request : Request , response : Response , next : NextFunction) =>{
    response.status(403);
    response.render('error',{pageTitle : 'Not Allowed'})

})

app.get('/not-admin',(request : Request , response : Response , next : NextFunction) =>{
    response.status(500);
    response.render('not-admin',{pageTitle : 'error'})

})

app.use((error : Error, request : Request , response : Response , next : NextFunction) =>{
    response.redirect('/error')
})

app.use((request : Request , response : Response , next : NextFunction)=>{
    response.status(404);
    response.render('not-found' ,{pageTitle : 'Page not found'} );
})



app.listen(port, ()=>{
    console.log("listening");
})

