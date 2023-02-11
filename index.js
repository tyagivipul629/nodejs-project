const app=require('express')();
const express=require('express');
const router=express.Router();
const session=require('express-session');
const MongoDBStore=require('connect-mongodb-session')(session);
const cors=require('cors');

var store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/vipul',
    collection: 'session_data'
});

store.on('connection',(data)=>{
    console.log("connected");
});
console.log(process.env.PORT);
store.on('error',(data)=>{
    console.log("error");
});

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(session({
    secret : "secret_password",
	name: "session",
	saveUninitialized : true,
	resave: false,
	cookie: {
		httpOnly: true,
		maxAge: 1*60*1000,
		secure: false
	},
    store: store
}));

app.use('/',router);

const isLoggedIn=(req,res,next)=>{
    if(req.session.loggedIn)
        next();
    else res.send("not logged In");
}

router.get('/home',(req,res)=>{
    if(req.session.loggedIn)
        res.json({'status':'success','user':req.session.username});
    else
        res.json({'status':'failure'});
})

router.get('/login',(req,res)=>{
    req.session.loggedIn=true;
    req.session.username='vipultyagi629';
    res.json({'status':'success','user':'vipultyagi629'});
})

router.get('/dashboard',isLoggedIn,(req,res)=>{
    res.json({"name":req.session.username});
})

router.get('/logout',(req,res)=>{
    if(req.session)
        req.session.destroy(err=>{
            if(err)
                res.json({'status':'fail'});
            else
                res.json({'status':'success'});
        })
})



app.listen(4000);