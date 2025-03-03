const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
//Write the authenication mechanism here

 if(req.session.authorization){
    let token = req.session.authorization['accessToken'];

    // verify the token
    jwt.verify(token, 'access' , (err,user)=>{
        if(!err){
            req.user = user;
            next();
        }
        return res.status(403).json({message:'User is not authenticated'});
    });

} else {
    return res.status(403).json({message: 'User not logged in'});
}
});

public_users.post("/register", (req,res) => {
const username = req.body.username;
const password = req.body.password;
if (username && password) {
if (!isValid(username)) { 
users.push({"username":username,"password":password});
return res.status(200).json({message: "Customer successfully registered. Now you can login"});
} else {
return res.status(404).json({message: "Customer with same username already exists!"}); 
}
} 
return res.status(404).json({message: "Unable to register customer."});
});

 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
