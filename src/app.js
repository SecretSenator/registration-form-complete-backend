const express= require('express');
const path=require('path');
const hbs=require('hbs');
const Register=require('./models/register');
const mongoose=require('mongoose');

//connecting to databsase
mongoose.connect('mongodb://localhost:27017/formRegistration',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{console.log('successfully connected to DB')})
  .catch((err)=>{console.log('error:\n',err)});

const app=express();
const port=process.env.port || 3000;
const static_path=path.join(__dirname,'../public');
const template_path=path.join(__dirname,'../template/views');
const partials_path=path.join(__dirname, '../template/partials');

app.use(express.static(static_path));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set("view engine",'hbs');
app.set('views',template_path);


//registering partials path
hbs.registerPartials(partials_path);


app.get('/',(req,res)=>{
    //res.send('Hello');
    res.render("index")
})

app.get('/login',(req,res)=>{
    res.render('login')
})

app.get('/register',(req,res)=>{
    res.render('register')
})

app.post('/register',async(req,res)=>{
    try{
        console.log(req.body);
        const password=req.body.password;
        const cpassword=req.body.password2;
        if(password===cpassword)
        {
            const registerUser=new Register({
                name: req.body.username,
                email:req.body.email,
                password:password,
                confirmpassword: cpassword
            })
            
        const registered=await registerUser.save();
        res.status(201).render('index');
        console.log(registered)
        }
        else
        {
            res.send('password not matching')
            
        }        
    }
    catch(error){
        res.status(400).send(error);
        console.log('error:\n',error);
    }
})

//logging in
app.post('/login',async(req,res)=>{
    try{
        const email=req.body.email;
        const password=req.body.password;
        console.log(`${email} , ${password}`);
        const userEmail=await Register.findOne({email:email});
        if(userEmail.password===password){
            res.status(201).render('index');
        }
        else{
            res.send('password not matching');
        }
    }
    catch(error){
        res.status(400).send('invalid login credentials');
    }
})


app.listen(port,()=>{
    console.log(`server running on port: ${port}`)
})

